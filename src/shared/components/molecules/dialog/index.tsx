import classNames from 'classnames';
import { useEffect, useState } from 'react';

import { EDialog, EIcon } from '@/shared/enums';
import Button from '../../atoms/button';
import Modal from '../../atoms/modal';
import SvgIcon from '../../atoms/svg-icon';
import type Props from './type';

// eslint-disable-next-line
export let showDialog: (props: Props) => void;

const Component = () => {
  const [stateDialog, setStateDialog] = useState<Props & { isOpen: boolean }>({
    isOpen: false,
    title: '',
  });
  const closeDialog = () => setStateDialog(old => ({ ...old, isOpen: false }));

  useEffect(() => {
    showDialog = (props: Props) =>
      setStateDialog(old => ({
        ...old,
        content: undefined,
        type: undefined,
        ...props,
        isOpen: true,
      }));
  }, []);

  const renderIcon = () => {
    switch (stateDialog.type) {
      case EDialog.Error:
        return EIcon.Error;
      case EDialog.Warning:
        return EIcon.Warning;
      case EDialog.Confirm:
        return EIcon.Confirm;
      default:
        return EIcon.Success;
    }
  };

  const renderColor = () => {
    switch (stateDialog.type) {
      case EDialog.Error:
        return 'text-error-500';
      case EDialog.Warning:
        return 'text-warning-500';
      case EDialog.Confirm:
        return 'text-info-500';
      default:
        return 'text-success-500';
    }
  };

  const renderFooter = () => {
    switch (stateDialog.type) {
      case EDialog.Warning:
      case EDialog.Confirm:
        return (
          <div className="flex-center">
            <Button
              className="w-full"
              text={stateDialog.cancelText}
              isOutline
              onClick={() => {
                closeDialog();
                stateDialog.onCancel?.();
              }}
            />
            <Button
              className="w-full"
              text={stateDialog.okText}
              onClick={() => {
                closeDialog();
                stateDialog.onOk?.();
              }}
            />
          </div>
        );
      default:
        return (
          <Button
            className="w-full"
            text={stateDialog.okText}
            onClick={() => {
              closeDialog();
              stateDialog.onOk?.();
            }}
          />
        );
    }
  };

  return (
    <Modal isOpen={stateDialog.isOpen} onClose={closeDialog}>
      <h3 className="text-center font-bold text-xl">
        <SvgIcon
          name={renderIcon()}
          className={classNames('size-10 mx-auto mb-2', renderColor())}
        />{' '}
        {stateDialog.title}
      </h3>
      <div className="pt-3 pb-5 text-center">{stateDialog.content}</div>
      {renderFooter()}
    </Modal>
  );
};

export default Component;
