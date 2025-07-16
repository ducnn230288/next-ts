import type { Column, FilterFns } from '@tanstack/react-table';
import type { RefObject } from 'react';

/**
 * Represents the properties for the button component.
 */
type Props<TData> = {
  readonly column: Column<TData>;
  readonly refFilterTypeCurrent: RefObject<Record<string, keyof FilterFns>>;
};
export default Props;
