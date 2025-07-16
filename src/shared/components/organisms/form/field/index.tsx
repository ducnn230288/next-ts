import type { AnyFieldApi, DeepKeys, DeepValue } from '@tanstack/react-form';

import { serviceFetch } from '@/core/services';
import { C_API } from '@/shared/constants';
import { EFormRuleType, EFormType } from '@/shared/enums';
import type { TField, TFieldFormValidation } from '@/shared/types';
import classNames from 'classnames';
import Entry from '../entry';
import utils from '../utils';
import type Props from './type';

/**
 * Generates a form based on the provided configuration.
 */
const Component = <T,>({ formApi, fieldForm, isLabel = true, translate, Field }: Props<T>) => {
  const rules: TFieldFormValidation<T>[] = [];
  const t = (key: string, params?: Record<string, unknown>) => JSON.stringify([key, params ?? {}]);

  if (fieldForm.rules) {
    fieldForm.rules
      .filter(rule => !!rule)
      .forEach(rule => utils.generateValid({ rule, rules, fieldForm, t }));
  }

  if (!fieldForm.notDefaultValid)
    switch (fieldForm.type) {
      case EFormType.Number:
        rules.push(({ value }) => {
          if (!value || (/^-?[1-9]*\d+(\.\d{1,2})?$/.test(value) && parseInt(value) < 1000000000))
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

  const ruleApi = fieldForm.rules?.find(rule => rule.type === EFormRuleType.Api);
  const validators = {
    onChange: ({ value }: { value?: DeepValue<T, DeepKeys<T>> }) => {
      let message = '';
      rules.forEach(rule => {
        if (!message) message = rule({ value: value as string, formApi });
      });
      return message;
    },
    onChangeAsyncDebounceMs: 800,
    onBlurAsync:
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
        : undefined,
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
    />
  );

  return (
    <Field name={fieldForm.name as DeepKeys<T>} validators={validators}>
      {
        ((field: TField<T>) => (
          <>
            {isLabel && (
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
