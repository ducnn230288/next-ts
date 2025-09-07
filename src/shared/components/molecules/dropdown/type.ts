import type { EPlacement } from '@/shared/enums/placement';
import type { TOption } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props = {
  readonly title?: string;
  readonly options: TOption[];
  readonly children: React.ReactNode;
  readonly translate: (key: string, options?: Record<string, string>) => string;
  readonly className?: string;
  readonly classContainer?: string;
  readonly handleOpen?: (open: boolean) => void; // Optional callback to handle open state externally
  readonly handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  readonly isRightClick?: boolean; // Optional right click handler
  readonly isWidthFull?: boolean; // Optional full width flag
  readonly placement?: EPlacement;
};
export default Props;
