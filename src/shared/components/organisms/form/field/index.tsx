import type { AnyFieldApi, DeepKeys, DeepValue } from '@tanstack/react-form';

import { serviceFetch } from '@/core/service';
import { C_API } from '@/shared/constant';
import { EFormRuleType, EFormType } from '@/shared/enum';
import type { TField, TFieldFormValidation } from '@/shared/types';
import { getValueByPath } from '@/shared/util';
import classNames from 'classnames';
import Entry from '../entry';
import utils from '../util';
import type Props from './type';

/**
 * Generates a form based on the provided configuration.
 */
const Component = <T,>({
  formApi,
  fieldForm,
  isLabel = true,
  translate,
  Field,
  name,
  values,
}: Props<T>) => {
  const rules: TFieldFormValidation<T>[] = [];
  const t = (key: string, params?: Record<string, unknown>) => JSON.stringify([key, params ?? {}]);
  const type =
    fieldForm?.dynamicType?.({
      values: getValueByPath({
        obj: values ?? {},
        path: name,
        backStep: 1,
      }) as T,
    }) ?? fieldForm.type;

  if (fieldForm.rules) {
    fieldForm.rules
      .filter(rule => !!rule)
      .forEach(rule => utils.generateValid({ rule, rules, fieldForm, t }));
  }

  if (fieldForm.isDefaultValid !== false)
    switch (type) {
      case EFormType.Number:
        rules.push(({ value }) => {
          if (
            !value ||
            (/^-?(?:0|[1-9]\d*)(?:\.\d{1,2})?$/.test(value) && parseInt(value) < 1000000000)
          )
            return '';
          return t('PleaseEnterOnlyNumber');
        });
        break;
      case EFormType.Password:
        rules.push(({ value }) => {
          if (
            !value ||
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%)(_^&*+-])[A-Za-z\d#?!@$%)(_^&*+-]{8,20}$/.test(
              value,
            )
          ) {
            return '';
          } else return t('PasswordNeedsToHaveAtLeast8Characters');
        });
        break;
      default:
    }

  const fnValidate = ({ value }: { value?: DeepValue<T, DeepKeys<T>> }) => {
    let message = '';
    rules.forEach(rule => {
      if (!message) message = rule({ value: value as string, formApi });
    });
    return message;
  };

  const ruleApi = fieldForm.rules?.find(rule => rule.type === EFormRuleType.Api);
  const fnBlurAsync =
    ruleApi?.api?.key && ruleApi?.api?.url
      ? async ({ value }: { value: DeepValue<T, DeepKeys<T>> }) => {
          const res = await serviceFetch.get<{ exists: boolean }>({
            url: `${C_API[ruleApi.api!.key]}/${ruleApi.api!.url}`,
            params: {
              type: ruleApi.api?.name,
              value: value as string,
              id: ruleApi.api?.id,
            },
          });
          if (res?.data?.exists === true) {
            return t('IsAlreadyTaken', {
              label: ruleApi.api!.label,
              value: value as string,
            });
          }
          return '';
        }
      : undefined;
  const validators = {
    onChange: fnValidate,
    onBlurAsync: fnBlurAsync,
    onChangeAsyncDebounceMs: 800,
  };

  const isRequired = fieldForm.rules?.some(rule => rule.type === EFormRuleType.Required);
  const classError = (field: AnyFieldApi) =>
    classNames({
      error: field.state.meta.errors?.length || field.state.meta.isValidating,
    });

  const renderField = ({ field }: { field: AnyFieldApi }) => (
    <Entry<T>
      fieldForm={fieldForm}
      formApi={formApi}
      Field={Field}
      field={field}
      state={field.state}
      translate={translate}
      values={values}
    />
  );

  return (
    <Field name={name as DeepKeys<T>} validators={validators}>
      {
        ((field: TField<T>) => (
          <>
            {isLabel && type !== EFormType.Customize && (
              <label
                title={translate(fieldForm.title)}
                className="text-base-800"
                htmlFor={fieldForm.name}>
                {translate(fieldForm.title)}
                {isRequired && <span className="text-error-500"> *</span>}
              </label>
            )}
            <div className={classError(field)}>{renderField({ field })}</div>
          </>
        )) as never
      }
    </Field>
  );
};
export default Component;
