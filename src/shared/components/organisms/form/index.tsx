import { useForm } from '@tanstack/react-form';
import classNames from 'classnames';
import { useEffect, useImperativeHandle, useRef, type FormEventHandler } from 'react';

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
  isLoading = false,
  onSubmit,
  footer,
  isEnterSubmit,
  isInline,
  ref,
}: Props<T>) => {
  const form = useForm({
    defaultValues: utils.convertValueForm<T>({ fields, values }),
    onSubmit: ({ value, formApi }) =>
      onSubmit?.({
        value: utils.convertValueForm<T>({ fields, values: { ...value }, isExport: true }),
        formApi,
      }),
  });
  useImperativeHandle(ref, () => form);

  const refOldValue = useRef(values);
  useEffect(() => {
    if (JSON.stringify(refOldValue.current) !== JSON.stringify(values) && !isLoading) {
      form.reset(utils.convertValueForm({ fields, values }));
    }
    refOldValue.current = values;
  }, [values]);

  const fnSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };

  return (
    <>
      <form className={classNames('c-form', { inline: isInline }, className)} onSubmit={fnSubmit}>
        <Spin isLoading={isLoading}>
          {isEnterSubmit && <input type="submit" hidden />}
          {fields
            .filter((fieldForm, index) => utils.fnCondition<T>({ fieldForm, index, values }))
            .map((fieldForm, index) => (
              <FormField<T>
                name={fieldForm.name as never}
                key={index + (fieldForm.name as string)}
                fieldForm={fieldForm}
                index={index}
                formApi={form}
                values={values}
                Field={form.Field}
              />
            ))}
        </Spin>
      </form>
      <form.Subscribe selector={state => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => footer?.({ canSubmit, isSubmitting, formApi: form })}
      </form.Subscribe>
    </>
  );
};

export default Component;
