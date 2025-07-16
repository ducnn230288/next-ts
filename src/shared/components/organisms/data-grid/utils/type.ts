import type { Table } from '@tanstack/react-table';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import type { Dispatch, RefObject, SetStateAction } from 'react';

import type { TTableState } from '@/shared/types';

type Props<TData> = {
  readonly table: Table<TData>;
  readonly columnVirtualizer: Virtualizer<HTMLDivElement, Element>;
  readonly refVirtualPaddingLeft: RefObject<number>;
  readonly virtualRows: VirtualItem[];
  readonly stateTable: TTableState;
  readonly translate: (key: string, options?: Record<string, string>) => string;
  readonly setStateTable: Dispatch<SetStateAction<TTableState>>;
};
export default Props;
