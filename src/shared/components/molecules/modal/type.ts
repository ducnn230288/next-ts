import type React from 'react';

/**
 * Represents the properties for the button component.
 */
type Props = {
  readonly isOpen?: boolean;
  readonly isClose?: boolean;
  readonly isFooter?: boolean;
  readonly className?: string;
  readonly handleCancel?: () => void;
  readonly handleOkay?: () => void;
  readonly children?: React.ReactNode;
  readonly title?: string;
  readonly textOkay?: string;
  readonly textCancel?: string;
  readonly footerCustom?: React.JSX.Element;
};
export default Props;
