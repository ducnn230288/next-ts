import type { TList } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props = {
  readonly title?: string; // Tooltip title
  readonly items: TList[];
  readonly children: React.ReactNode;
};
export default Props;
