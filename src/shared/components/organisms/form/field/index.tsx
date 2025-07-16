import type { AnyFieldApi, DeepKeys, DeepValue } from '@tanstack/react-form';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

import { fetchApi } from '@/core/services';
import { C_API } from '@/shared/constants';
import { EFormRuleType, EFormType } from '@/shared/enums';
import type { TField, TFieldFormValidation, TFieldMeta } from '@/shared/types';
import Entry from '../entry';
import utils from '../utils';
import type Props from './type';

/**
 * Generates a form based on the provided configuration.
 */
const Component = <T,>({
  formApi,
  fieldForm,
  Field,
  index,
  values,
  isLabel = true,
  name,
}: Props<T>) => {
  const rules: TFieldFormValidation<T>[] = [];
  const t = useTranslations('Components');

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
            const res = await fetchApi.get<{ exists: boolean }>({
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
          }
        : undefined,
  };

  const classField = (meta: TFieldMeta<T>) =>
    classNames(
      'item col-span-12 type-' + (fieldForm?.type ?? EFormType.Text),
      'sm:col-span-' + (fieldForm?.col ?? 12),
      { error: meta.errors?.length || meta.isValidating },
    );

  const renderLabel = isLabel && (
    <label title={fieldForm.title} className="text-base-800" htmlFor={fieldForm.name}>
      {fieldForm.title}
      {fieldForm.rules?.some(rule => rule.type === EFormRuleType.Required) && (
        <span className="text-error-500"> *</span>
      )}
    </label>
  );

  const renderField = ({ field }: { field: AnyFieldApi }) =>
    !fieldForm?.render ? (
      <>
        {renderLabel}
        {fieldForm && (
          <Entry<T>
            field={field}
            fieldForm={fieldForm}
            formApi={formApi}
            meta={field.state.meta}
            title={fieldForm.title}
            value={field?.state?.value}
            Field={Field}
          />
        )}
      </>
    ) : (
      fieldForm?.render({ values, index })
    );

  return (
    <Field name={name as DeepKeys<T>} validators={validators}>
      {
        ((field: TField<T>) => (
          <div data-item className={classField(field.state.meta)}>
            {renderField({ field })}
          </div>
        )) as never
      }
    </Field>
  );
};
export default Component;
