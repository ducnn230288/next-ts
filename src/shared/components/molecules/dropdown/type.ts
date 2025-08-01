import type { TList } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props = {
  readonly items: TList[];
  readonly children: React.ReactNode;
  readonly translate: (key: string, options?: Record<string, string>) => string;
};
export default Props;
