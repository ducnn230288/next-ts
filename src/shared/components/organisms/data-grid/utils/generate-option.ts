import {
  type ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type TableOptions,
  type TableState,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';

import type { TTableState } from '@/shared/types';
import type DataGridProps from '../type';
import type Props from './type';

const generateOption = <TData>({
  header,
  body,
  data,
  maxSize,
  columns,
  isPagination,
  isFilter,
  filterGlobal,
  keyId,
  stateTable,
  setStateTable,
}: Pick<DataGridProps<TData>, 'columns' | 'data' | 'filterGlobal' | 'header' | 'body' | 'keyId'> &
  Pick<Props<TData>, 'stateTable' | 'setStateTable'> & {
    readonly isPagination?: boolean;
    readonly maxSize: number;
    readonly isFilter: boolean;
  }) => {
  const option: TableOptions<TData> = {
    filterFns: {
      global: (row, columnId, value, addMeta) =>
        !filterGlobal || filterGlobal(row, columnId, value, addMeta),
      blank: (row, columnId) =>
        (typeof row.original[columnId] === 'number' && row.original[columnId] === null) ||
        (typeof row.original[columnId] === 'string' && row.original[columnId]?.trim().length === 0),
      notBlank: (row, columnId) =>
        (typeof row.original[columnId] === 'number' && row.original[columnId] !== null) ||
        (typeof row.original[columnId] === 'string' && row.original[columnId]?.trim().length > 0),
      includeText: (row, columnId, value) =>
        !value || row.original[columnId]?.toString()?.trim()?.includes(value?.trim()),
      notIncludeText: (row, columnId, value) =>
        !value || !row.original[columnId]?.toString()?.trim()?.includes(value?.trim()),
      startText: (row, columnId, value) =>
        !value || row.original[columnId]?.toString()?.trim()?.startsWith(value?.trim()),
      endText: (row, columnId, value) =>
        !value || row.original[columnId]?.toString()?.trim()?.endsWith(value?.trim()),
      sameText: (row, columnId, value) =>
        !value || row.original[columnId]?.toString()?.trim() === value?.trim(),
      sameDate: (row, columnId, value) =>
        !value ||
        !row.original[columnId] ||
        dayjs(value).isSame(dayjs(row.original[columnId]), 'day'),
      beforeDate: (row, columnId, value) =>
        !value ||
        !row.original[columnId] ||
        dayjs(row.original[columnId]).isBefore(dayjs(value), 'day'),
      afterDate: (row, columnId, value) =>
        !value ||
        !row.original[columnId] ||
        dayjs(row.original[columnId]).isAfter(dayjs(value), 'day'),
      greaterNumber: (row, columnId, value) =>
        value === undefined || row.original[columnId] > parseFloat(value),
      greaterEqualNumber: (row, columnId, value) =>
        value === undefined || row.original[columnId] >= parseFloat(value),
      lessNumber: (row, columnId, value) =>
        value === undefined || row.original[columnId] < parseFloat(value),
      lessEqualNumber: (row, columnId, value) =>
        value === undefined || row.original[columnId] <= parseFloat(value),
      equalNumber: (row, columnId, value) =>
        value === undefined || row.original[columnId] === parseFloat(value),
      notEqualNumber: (row, columnId, value) =>
        value === undefined || row.original[columnId] !== parseFloat(value),
      middleNumber: (row, columnId, value) =>
        !value ||
        value.length !== 2 ||
        (row.original[columnId] >= parseFloat(value[0]) &&
          row.original[columnId] <= parseFloat(value[1])),
      notMiddleNumber: (row, columnId, value) =>
        !value ||
        value.length !== 2 ||
        row.original[columnId] < parseFloat(value[0]) ||
        row.original[columnId] > parseFloat(value[1]),
    },
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: stateTable as Partial<TableState> | undefined,
    initialState: {
      columnPinning: header?.pinning,
    },
    onColumnVisibilityChange: updaterOrValue =>
      setStateTable(old => ({
        ...old,
        columnVisibility:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable.columnVisibility)
            : updaterOrValue,
      })),
    globalFilterFn: 'global',
    enableColumnFilters: isFilter,
    getRowId: row => row[keyId] as string,
    onColumnPinningChange: updaterOrValue =>
      setStateTable(old => ({
        ...old,
        columnPinning:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable.columnPinning)
            : updaterOrValue,
      })),
  };

  if (isFilter && option.state) {
    option.onColumnFiltersChange = updaterOrValue =>
      setStateTable(old => ({
        ...old,
        columnFilters:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable.columnFilters)
            : updaterOrValue,
      }));
    option.onGlobalFilterChange = updaterOrValue =>
      setStateTable(old => ({
        ...old,
        globalFilter:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable.globalFilter)
            : updaterOrValue,
      }));
    option.getFilteredRowModel = getFilteredRowModel(); //client-side filtering
    option.getFacetedRowModel = getFacetedRowModel(); // client-side faceting
    option.getFacetedUniqueValues = getFacetedUniqueValues(); // generate unique values for select filter/autocomplete
    option.getFacetedMinMaxValues = getFacetedMinMaxValues(); // generate min/max values for range filter
  }

  if (!header?.isNotResizing) {
    option.columnResizeMode = 'onChange';
    option.defaultColumn = {
      minSize: header?.width,
      maxSize,
    };
  }

  if (isPagination && option.state) {
    option.onPaginationChange = updaterOrValue =>
      setStateTable(old => ({
        ...old,
        pagination:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable.pagination)
            : updaterOrValue,
      }));
    option.getPaginationRowModel = getPaginationRowModel();
  }

  if (body?.checkbox && option.state) {
    option.onRowSelectionChange = updaterOrValue =>
      setStateTable(old => ({
        ...old,
        rowSelection:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable.rowSelection)
            : updaterOrValue,
      }));
    option.enableRowSelection = true;
    //option.enableRowSelection = row => row.original.age > 18, // or enable row selection conditionally per row
  }

  if (body?.isExpanded && option.state) {
    option.getSubRows = row => row['children' as keyof typeof row] as TData[];
    option.onExpandedChange = updaterOrValue =>
      setStateTable(old => ({
        ...old,
        expanded:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable.expanded)
            : updaterOrValue,
      }));
    option.getExpandedRowModel = getExpandedRowModel();
    if (isFilter) option.filterFromLeafRows = true;
    if (isPagination) option.paginateExpandedRows = false;
  }

  return isSort<TData>({ option, columns, stateTable, setStateTable });
};
const isSort = <TData>({
  option,
  columns,
  stateTable,
  setStateTable,
}: {
  option: TableOptions<TData>;
  columns: ColumnDef<TData>[];
  stateTable?: TTableState;
  setStateTable: Dispatch<SetStateAction<TTableState>>;
}) => {
  const isSorter =
    columns.length && columns.some(obj => obj.meta && Object.keys(obj.meta).includes('sorter'));
  if (isSorter && option.state) {
    option.onSortingChange = updaterOrValue =>
      setStateTable(old => ({
        ...old,
        sorting:
          typeof updaterOrValue === 'function'
            ? updaterOrValue(stateTable!.sorting)
            : updaterOrValue,
      }));
    option.getSortedRowModel = getSortedRowModel();
  }
  return option;
};

export default generateOption;
