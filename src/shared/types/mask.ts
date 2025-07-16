import type { Dayjs } from 'dayjs';

export type TMask = {
  readonly mask: unknown;
  readonly normalizeZeros?: boolean;
  readonly radix?: string;
  readonly min?: unknown;
  readonly max?: unknown;
  readonly thousandsSeparator?: string;
  readonly lazy?: boolean;

  readonly pattern?: string;
  readonly blocks?: Record<
    string,
    {
      mask: unknown;
      from: number;
      to: number;
    }
  >;
  readonly format?: (date: Dayjs) => string;
  readonly parse?: (str: string) => Dayjs | null;
};
