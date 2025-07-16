import type { TOption } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props = {
  readonly options: TOption[];
  readonly translate: (key: string, options?: Record<string, string>) => string;
};
export default Props;
