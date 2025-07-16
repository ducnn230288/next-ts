import type React from 'react';

/**
 * Represents the properties for the button component.
 */
type Props = {
  isOpen?: boolean;
  isHiddenClose?: boolean;
  onClose?: () => void;
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};
export default Props;
