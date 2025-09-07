import type { TOption } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props = {
  readonly options: TOption[];
  readonly translate: (key: string, options?: Record<string, string>) => string;
  readonly isTree?: boolean;
  readonly isCol?: boolean;
};
export default Props;
