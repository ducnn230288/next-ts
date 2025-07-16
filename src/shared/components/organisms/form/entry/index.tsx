import type { DeepKeys, DeepValue } from '@tanstack/react-form';
import { useTranslations } from 'next-intl';

import { EFormType, EIcon, ESize } from '@/shared/enums';
import { EntryMask, EntryPassword } from '../../../atoms/entry';
import Icon from '../../../atoms/icon';
import Spin from '../../../atoms/spin';
import type Props from './type';

/**
 * Represents the configuration options for the form component.
 */

const Component = <T,>({ formApi, fieldForm, meta, title, value, field, translate }: Props<T>) => {
  const { name, handleBlur, handleChange } = field;

  const hidden = ({ value }: { value?: DeepValue<T, DeepKeys<T>> }) => (
    <input value={value as string} type={'hidden'} name={name} tabIndex={-1} />
  );

  const t = useTranslations('Components');
  const mask = ({ value }: { value?: DeepValue<T, DeepKeys<T>> }) => (
    <EntryMask<T>
      name={name}
      formApi={formApi}
      value={value as string}
      mask={fieldForm.text?.mask}
      iconBefore={fieldForm.text?.iconBefore}
      iconAfter={fieldForm.text?.iconAfter}
      placeholder={t(fieldForm.placeholder ?? 'Enter', { title: translate(title)?.toLowerCase() })}
      maxLength={fieldForm.maxLength}
      handleBlur={e => {
        fieldForm.onBlur?.({ value: e.target.value, formApi, name });
        handleBlur();
      }}
      handleChange={e => {
        fieldForm.onChange?.({ value: e.target.value });
        handleChange(e.target.value as DeepValue<T, DeepKeys<T>>);
      }}
      disabled={fieldForm.disabled?.({ value })}
    />
  );
  const password = ({ value }: { value?: DeepValue<T, DeepKeys<T>> }) => (
    <EntryPassword
      value={value as string}
      placeholder={t(fieldForm.placeholder ?? 'Enter', { title: translate(title)?.toLowerCase() })}
      disabled={fieldForm.disabled?.({ value })}
      handleBlur={e => {
        fieldForm.onBlur?.({ value: e.target.value, formApi, name });
        handleBlur();
      }}
      handleChange={e => {
        fieldForm.onChange?.({ value: e.target.value });
        handleChange(e.target.value as DeepValue<T, DeepKeys<T>>);
      }}
    />
  );

  const listInput: Record<
    string,
    (props: { value?: DeepValue<T, DeepKeys<T>> }) => React.JSX.Element
  > = {
    [EFormType.Hidden]: hidden,
    [EFormType.Text]: mask,
    [EFormType.Number]: mask,
    [EFormType.Password]: password,
  };
  const isError = (meta.isTouched && meta.errors?.length) || meta.isValidating;

  const convertTranslate = (text: string) => {
    const [key, params] = JSON.parse(text);
    return t(key, {
      ...params,
      title: translate(title)?.toLowerCase(),
    }) as string;
  };
  const renderMessage = (
    <div className="feedback">
      {meta.isTouched && meta?.errors?.length > 0
        ? convertTranslate(meta.errors?.join(','))
        : meta.isValidating && (
            <>
              {t('Validating')} <Spin size={ESize.Small} />
            </>
          )}
      {isError ? '' : '|'}
    </div>
  );

  return (
    <div>
      {(fieldForm.type ? listInput[fieldForm.type] : mask)({ value })}
      {renderMessage}
      {isError && <Icon name={EIcon.Error} className="svg-error" />}
    </div>
  );
};

export default Component;
