import type { Placement } from '@floating-ui/dom';
import type { Ref } from 'react';

type Props = {
  readonly content: React.ReactNode;
  readonly placement?: Placement;
  readonly className?: string;
  readonly classContainer?: string;
  readonly isArrow?: boolean;
  readonly isClick?: boolean; // If true, tooltip will toggle on click instead of hover
  readonly isWidthFull?: boolean; // If true, tooltip will have a white background
  readonly handleOpen?: (open: boolean) => void; // Optional callback to handle open state externally
  readonly children: React.ReactNode;
  readonly isOpen?: boolean; // Optional prop to control the open state of the tooltip
  readonly isRightClick?: boolean; // Optional right click handler
  readonly isDisabled?: boolean; // Optional prop to disable the tooltip
  readonly handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  readonly ref?: Ref<{ setOpen: (isOpen: boolean) => void }>;
};
export default Props;
