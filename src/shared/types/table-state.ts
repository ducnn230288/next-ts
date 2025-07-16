import type {
  ColumnFiltersState,
  ColumnPinningState,
  ExpandedState,
  GlobalFilterTableState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';

export type TTableState = GlobalFilterTableState & {
  readonly columnFilters: ColumnFiltersState;
  readonly sorting: SortingState;
  readonly columnVisibility: VisibilityState;
  readonly rowSelection: RowSelectionState;
  readonly expanded: ExpandedState;
  readonly pagination: PaginationState;
  readonly columnPinning: ColumnPinningState;
  readonly isDragResize?: boolean;
  readonly isRerender?: boolean;
};
