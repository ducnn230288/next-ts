import type { Placement } from '@floating-ui/dom';

type Props = {
  readonly children: React.ReactNode;
  readonly content: React.ReactNode;
  readonly placement?: Placement;
  readonly className?: string;
  readonly isArrow?: boolean;
  readonly isClick?: boolean; // If true, tooltip will toggle on click instead of hover
};
export default Props;
