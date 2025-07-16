import { translate } from '@/app/provider';
import { showDialog } from '@/shared/components/molecules/dialog';
import { EDialog } from '@/shared/enums';

export const serviceMessage = {
  success: ({
    title = translate('Success'),
    okText = translate('Okay'),
    ...props
  }: {
    title?: string;
    content: string;
    okText?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }) => {
    showDialog({
      type: EDialog.Success,
      title,
      okText,
      ...props,
    });
  },
  error: ({
    title = translate('Error'),
    okText = translate('Okay'),
    ...props
  }: {
    title?: string;
    content: string;
    okText?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }) => {
    showDialog({
      type: EDialog.Error,
      title,
      okText,
      ...props,
    });
  },
  warning: ({
    title = translate('Warning'),
    okText = translate('Okay'),
    cancelText = translate('Cancel'),
    ...props
  }: {
    title?: string;
    content: string;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }) => {
    showDialog({
      type: EDialog.Warning,
      title,
      okText,
      cancelText,
      ...props,
    });
  },
  confirm: ({
    title = translate('Confirmation'),
    okText = translate('Okay'),
    cancelText = translate('Cancel'),
    ...props
  }: {
    title?: string;
    content: string;
    okText?: string;
    cancelText?: string;
    onOk?: () => void;
    onCancel?: () => void;
  }) => {
    showDialog({
      type: EDialog.Confirm,
      title,
      okText,
      cancelText,
      ...props,
    });
  },
};
