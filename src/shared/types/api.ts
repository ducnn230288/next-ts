import type { C_API } from '../constants';
import type { TOption } from './option';

/**
 * Represents the configuration options for retrieving data from a table.
 */
export type TApi = {
  readonly keyApi?: keyof typeof C_API;
  readonly format?: (item: Record<string, string>) => TOption;
  readonly params?: (props: {
    fullTextSearch: string;
    value?: unknown | null;
  }) => Record<string, unknown>;
  readonly staleTime?: number;
};
