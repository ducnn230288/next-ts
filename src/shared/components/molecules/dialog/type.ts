import type { EDialog } from '@/shared/enums';

/**
 * Represents an object of type TypeObject.
 */
type Props = {
  readonly title: string;
  readonly content?: string;
  readonly type?: EDialog;
  readonly onCancel?: () => void;
  readonly onOk?: () => void;
  readonly okText?: string;
  readonly cancelText?: string;
};

export default Props;
