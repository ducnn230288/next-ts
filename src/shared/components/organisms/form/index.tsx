'use client';
import { useForm } from '@tanstack/react-form';
import classNames from 'classnames';
import { useEffect, useImperativeHandle, useState, type FormEventHandler } from 'react';

import { EFormType } from '@/shared/enum';
import type { TFieldForm } from '@/shared/types';
import Spin from '../../atoms/spin';
import FormField from './field';
import type Props from './type';
import utils from './util';

/**
 * A custom form component.
 */
const Component = <T,>({
  className,
  fields,
  values,
  isLoading,
  isEnterSubmit,
  isLabel = true,
  isInline,
  translate,
  handleSubmit,
  footer,
  ref,
}: Props<T>) => {
  const [stateForm, setStateForm] = useState({ values });
  useEffect(() => {
    if (JSON.stringify(stateForm.values) !== JSON.stringify(values) && !isLoading) {
      setStateForm(old => ({ ...old, values: { ...(values ?? {}) } as T }));
      form.reset(utils.convertValueForm({ fields, values }));
    }
  }, [values]);

  const form = useForm({
    defaultValues: utils.convertValueForm<T>({ fields, values: { ...(values ?? {}) } as T }),
    onSubmit: ({ value, formApi }) =>
      handleSubmit?.({
        value: utils.convertValueForm<T>({ fields, values: { ...value }, isExport: true }),
        formApi,
      }),
  });
  useImperativeHandle(ref, () => form);

  const fnSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  const classField = (fieldForm: TFieldForm<T>) =>
    classNames([
      'item col-span-12 type-' + (fieldForm?.type ?? EFormType.Text),
      'sm:col-span-' + (fieldForm?.col ?? 12),
    ]);
  return (
    <>
      <Spin isLoading={!!isLoading}>
        <form className={classNames('form', { inline: isInline }, className)} onSubmit={fnSubmit}>
          {isEnterSubmit && <input type="submit" hidden />}
          {fields
            .filter(fieldForm => utils.condition<T>({ fieldForm }))
            .map((fieldForm, index) => (
              <div
                data-item="true"
                className={classField(fieldForm)}
                key={index + (fieldForm.name as string)}>
                <FormField<T>
                  fieldForm={fieldForm}
                  formApi={form}
                  isLabel={isLabel}
                  Field={form.Field}
                  translate={translate}
                  name={fieldForm.name}
                  values={stateForm.values}
                />
              </div>
            ))}
        </form>
      </Spin>
      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => footer?.({ canSubmit, isSubmitting, formApi: form })}
      </form.Subscribe>
    </>
  );
};

export default Component;
