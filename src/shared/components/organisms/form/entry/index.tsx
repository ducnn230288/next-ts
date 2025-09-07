import type { DeepKeys, DeepValue } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';

import { EFormType, EIcon, ESize } from '@/shared/enums';
import type { TFile } from '@/shared/types';
import type { Dayjs } from 'dayjs';
import Icon from '../../../atoms/icon';
import Spin from '../../../atoms/spin';
import EntryChoice from '../../../molecules/entry/choice';
import EntryDate from '../../../molecules/entry/date';
import EntryMask from '../../../molecules/entry/mask';
import EntryPassword from '../../../molecules/entry/password';
import EntrySelect from '../../../molecules/entry/select';
import EntryTextarea from '../../../molecules/entry/textarea';
import EntryUpload from '../../../molecules/entry/upload';
import type Props from './type';

/**
 * Represents the configuration options for the form component.
 */

const Component = <T,>({ formApi, fieldForm, field, state, translate }: Props<T>) => {
  const t = useTranslations('Components');

  const fieldState = state;
  const isError = !!(
    (fieldState.meta.isTouched && fieldState.meta.errors?.length) ||
    fieldState.meta.isValidating
  );
  const convertTranslate = (text: string) => {
    const [key, params] = JSON.parse(text);
    return t(key, {
      ...params,
      title: translate(fieldForm.title)?.toLowerCase(),
    }) as string;
  };

  const hidden = () => (
    <input value={fieldState.value as string} type={'hidden'} name={field.name} tabIndex={-1} />
  );

  const mask = () => (
    <EntryMask<T>
      name={field.name}
      value={fieldState.value as string}
      disabled={fieldForm.disabled?.({ value: fieldState.value })}
      placeholder={t(fieldForm.placeholder ?? 'Enter', {
        title: translate(fieldForm.title)?.toLowerCase(),
      })}
      maxLength={fieldForm.maxLength}
      formApi={formApi}
      mask={fieldForm.text?.mask}
      iconBefore={fieldForm.text?.iconBefore}
      iconAfter={fieldForm.text?.iconAfter}
      handleBlur={value => {
        fieldForm.onBlur?.({ value, formApi, name: field.name });
        field.handleBlur();
        field.handleChange?.(value as DeepValue<T, DeepKeys<T>>);
      }}
      handleChange={value => {
        fieldForm.onChange?.({ value });
        field.handleChange(value as DeepValue<T, DeepKeys<T>>);
      }}
    />
  );
  const password = () => (
    <EntryPassword
      name={field.name}
      value={fieldState.value as string}
      disabled={fieldForm.disabled?.({ value: fieldState.value })}
      placeholder={t(fieldForm.placeholder ?? 'Enter', {
        title: translate(fieldForm.title)?.toLowerCase(),
      })}
      handleBlur={value => {
        fieldForm.onBlur?.({ value, formApi, name: field.name });
        field.handleBlur();
        field.handleChange?.(value as DeepValue<T, DeepKeys<T>>);
      }}
      handleChange={value => {
        fieldForm.onChange?.({ value });
        field.handleChange(value as DeepValue<T, DeepKeys<T>>);
      }}
    />
  );

  const textarea = () => (
    <EntryTextarea
      name={field.name}
      disabled={fieldForm.disabled?.({ value: fieldState.value })}
      placeholder={t(fieldForm.placeholder ?? 'Enter', {
        title: translate(fieldForm.title)?.toLowerCase(),
      })}
      maxLength={fieldForm.maxLength ?? 1000}
      value={fieldState.value as string}
      handleBlur={value => {
        fieldForm.onBlur?.({ value, formApi, name: field.name });
        field.handleBlur();
        field.handleChange?.(value as DeepValue<T, DeepKeys<T>>);
      }}
      handleChange={value => {
        fieldForm.onChange?.({ value });
        field.handleChange(value as DeepValue<T, DeepKeys<T>>);
      }}
    />
  );

  const choice = () => (
    <EntryChoice
      name={field.name}
      value={fieldState.value as (string | number)[]}
      disabled={fieldForm.disabled?.({ value: fieldState.value })}
      type={fieldForm.type === EFormType.Checkbox ? 'checkbox' : 'radio'}
      options={fieldForm.options}
      handleChange={value => {
        fieldForm.onChange?.({ value });
        field.handleChange(value as DeepValue<T, DeepKeys<T>>);
      }}
    />
  );

  const select = () => (
    <EntrySelect
      title={translate(fieldForm.title)}
      name={field.name}
      value={fieldState.value as never}
      disabled={fieldForm.disabled?.({ value: fieldState.value })}
      placeholder={t(fieldForm.placeholder ?? 'Choose', {
        title: translate(fieldForm.title)?.toLowerCase(),
      })}
      api={fieldForm.api}
      options={fieldForm.options}
      isMultiple={fieldForm.isMultiple}
      translate={translate}
      handleChange={value => {
        fieldForm.onChange?.({ value });
        field.handleChange((value ?? null) as DeepValue<T, DeepKeys<T>>);
      }}
    />
  );

  const date = () => (
    <EntryDate
      title={translate(fieldForm.title)}
      name={field.name}
      value={fieldState.value as Dayjs}
      disabled={fieldForm.disabled?.({ value: fieldState.value })}
      placeholder={t(fieldForm.placeholder ?? 'Choose', {
        title: translate(fieldForm.title)?.toLowerCase(),
      })}
      isMultiple={fieldForm.isMultiple}
      handleChange={value => {
        fieldForm.onChange?.({ value });
        field.handleChange(value as DeepValue<T, DeepKeys<T>>);
      }}
    />
  );

  const upload = () => (
    <EntryUpload
      value={fieldState.value as (string | TFile)[]}
      isMultiple={fieldForm.isMultiple}
      handleChange={value => {
        fieldForm.onChange?.({ value });
        field.handleChange(value as DeepValue<T, DeepKeys<T>>);
      }}
      isShowFile={fieldForm.upload?.isShowFile}
      accept={fieldForm.upload?.accept}
    />
  );

  const listInput = {
    [EFormType.Hidden]: hidden,
    [EFormType.Text]: mask,
    [EFormType.Number]: mask,
    [EFormType.Password]: password,
    [EFormType.Textarea]: textarea,
    [EFormType.Radio]: choice,
    [EFormType.Checkbox]: choice,
    [EFormType.Select]: select,
    [EFormType.Date]: date,
    [EFormType.Upload]: upload,
  };

  return (
    <>
      {(fieldForm.type ? listInput[fieldForm.type] : mask)()}

      <div className="feedback">
        {fieldState.meta.isTouched && fieldState.meta.errors?.length > 0
          ? convertTranslate(fieldState.meta.errors?.join(','))
          : fieldState.meta.isValidating && (
              <>
                {t('Validating')} <Spin size={ESize.Small} />
              </>
            )}
        {isError ? '' : '|'}
      </div>
      {isError && <Icon name={EIcon.Error} className="svg-error" />}
    </>
  );
};

export default Component;
