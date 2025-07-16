import type { MouseEventHandler } from 'react';

import type { EIcon, ESize } from '@/shared/enums';

/**
 * Represents the properties for the button component.
 */
type Props = {
  readonly text?: string;
  readonly size?: ESize.Large | ESize.Small | ESize.ExtraSmall;
  readonly icon?: EIcon;
  readonly title?: string;
  readonly className?: string;
  readonly disabled?: boolean;
  readonly isOutline?: boolean;
  readonly type?: 'button' | 'submit' | 'reset';
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly onPaste?: (_event: React.ClipboardEvent) => Promise<void>;
};
export default Props;
