import type { ColumnDef, FilterFn, Table } from '@tanstack/react-table';
import type { Virtualizer } from '@tanstack/react-virtual';
import type { UIEvent } from 'react';

import type { TTableAction, TTableBody, TTableHeader, TTablePagination } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props<TData> = {
  readonly isLoading?: boolean;
  readonly handleExpand?: (row: TData) => void;

  readonly columns: ColumnDef<TData>[];
  readonly data?: TData[];
  readonly handleChange?: (table: Table<TData>) => void;
  readonly handleSort?: (sort: string[]) => void;
  readonly filterGlobal?: FilterFn<TData>;
  readonly header?: TTableHeader;
  readonly body?: TTableBody;
  readonly pagination?: TTablePagination;

  readonly keyId: keyof TData;
  readonly className?: string;
  readonly defaultColumn?: Partial<ColumnDef<TData>>;
  readonly handleScroll?: (props: {
    readonly table: Table<TData>;
    readonly columnVirtualizer: Virtualizer<HTMLDivElement, Element>;
    readonly rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
    readonly event: UIEvent<HTMLDivElement>;
  }) => void;
  readonly translate: (key: string, options?: Record<string, string>) => string;
  readonly firstItem?: React.JSX.Element;
  readonly action?: TTableAction<TData>;
};
export default Props;
