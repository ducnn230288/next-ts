import type { C_API } from '../constant';

/**
 * Represents the configuration options for retrieving data from a table.
 */
export type TApi = {
  readonly keyApi?: keyof typeof C_API;
  readonly format?: { value: string; label: string };
  readonly params?: (props: {
    full_text: string;
    value?: unknown | null;
  }) => Record<string, unknown>;
  readonly staleTime?: number;
};
