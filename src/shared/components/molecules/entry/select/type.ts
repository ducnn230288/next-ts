import type { TOption } from '@/shared/types';

type Props = {
  readonly name?: string;
  readonly options?: TOption[];
  readonly value: Props['isMultiple'] extends true ? (string | number)[] : string | number;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly isMultiple?: boolean;
  readonly handleChange?: (
    value: Props['isMultiple'] extends true ? (string | number)[] : string | number,
  ) => void;
  readonly translate: (key: string, options?: Record<string, string>) => string;
};
export default Props;
