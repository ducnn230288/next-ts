'use client';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

import type { TForm } from '@/shared/types';
import Modal from '../../molecules/modal';
import Form from '../form';
import type Props from './type';

/**
 * Represents the configuration for a modal form.
 */

const FormModal = (<T,>({
  title,
  fields,
  textSubmit,
  textCancel,
  className,
  isOpen,
  isLoading,
  values,
  translate,
  handleCancel,
  handleSubmit,
  footerCustom,
}: Props<T>) => {
  const t = useTranslations('Messages');

  const refForm = useRef<TForm<T> | undefined>(undefined);
  const fnOkay = () => {
    refForm.current?.handleSubmit();
  };
  return (
    <Modal
      isOpen={isOpen}
      className={className}
      title={title}
      textCancel={textCancel ?? t('Cancel')}
      textOkay={textSubmit ?? t('Save')}
      handleCancel={handleCancel}
      handleOkay={fnOkay}
      footerCustom={footerCustom}>
      <Form<T>
        ref={refForm}
        values={values}
        fields={fields}
        isLoading={isLoading}
        translate={translate}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
}) as <T>(props: Props<T>) => React.JSX.Element;
export default FormModal;
