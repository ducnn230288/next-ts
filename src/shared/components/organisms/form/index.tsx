'use client';
import { useForm } from '@tanstack/react-form';
import classNames from 'classnames';
import { useEffect, useImperativeHandle, useRef, type FormEventHandler } from 'react';

import { EFormType } from '@/shared/enums';
import type { TFieldForm } from '@/shared/types';
import Spin from '../../atoms/spin';
import FormField from './field';
import type Props from './type';
import utils from './utils';

/**
 * A custom form component.
 */
const Component = <T,>({
  className,
  fields,
  values,
  isLoading,
  isEnterSubmit,
  isInline,
  translate,
  handleSubmit,
  footer,
  ref,
}: Props<T>) => {
  const refOldValue = useRef(values);
  useEffect(() => {
    if (JSON.stringify(refOldValue.current) !== JSON.stringify(values) && !isLoading) {
      form.reset(utils.convertValueForm({ fields, values }));
    }
    refOldValue.current = values;
  }, [values]);

  const form = useForm({
    defaultValues: utils.convertValueForm<T>({ fields, values }),
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
            .filter((fieldForm, index) => utils.fnCondition<T>({ fieldForm, index, values }))
            .map((fieldForm, index) => (
              <div
                data-item="true"
                className={classField(fieldForm)}
                key={index + (fieldForm.name as string)}>
                <FormField<T>
                  fieldForm={fieldForm}
                  formApi={form}
                  Field={form.Field}
                  translate={translate}
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
