import { useReactTable, type TableOptions } from '@tanstack/react-table';
import { defaultRangeExtractor, useVirtualizer, type Range } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { EIcon } from '@/shared/enums';
import type { TTableState } from '@/shared/types';
import { generateRangeNumber } from '@/shared/utils';
import Icon from '../../../atoms/icon';
import Pagination from '../../../molecules/pagination';
import type Props from '../type';
import utils from '../utils';
import TableBody from './body';
import TableHeader from './header';

const Component = <TData,>({
  columns,
  data = [],
  handleChange,
  filterGlobal,
  header,
  body,
  pagination,
  keyId,
  className,
  defaultColumn,
  handleScroll,
  translate,

  pageSize,
  maxSize,
  isFilter,

  ref,
  firstItem,
}: Props<TData> & {
  readonly pageSize?: number;
  readonly maxSize: number;
  readonly isFilter: boolean;
}) => {
  const t = useTranslations('Components');

  const [stateTable, setStateTable] = useState<TTableState>({
    globalFilter: '',
    columnFilters: [],
    sorting: [],
    columnVisibility: {},
    rowSelection:
      body?.ids?.reduce((acc: { [key: string]: boolean }, id: string) => {
        acc[id] = true;
        return acc;
      }, {}) ?? {},
    expanded: {},
    pagination: {
      pageIndex: 0,
      pageSize: pageSize ?? 0,
    },
    columnPinning: header?.pinning ?? {},
  });

  const optionTable: TableOptions<TData> = {
    ...utils.generateOption<TData>({
      columns,
      data,
      filterGlobal,
      header,
      body,
      keyId,
      isPagination: !!pagination,
      maxSize,
      isFilter,
      stateTable,
      setStateTable,
    }),
    defaultColumn,
  };
  const table = useReactTable<TData>(optionTable);
  useImperativeHandle(ref, () => table);

  const refTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fnZoom = (event: string) => {
    if (refTimeout.current) clearTimeout(refTimeout.current);
    refTimeout.current = setTimeout(() => {
      setStateTable(old => {
        if (event !== 'mouseup' || old.isDragResize) {
          return { ...old, isRerender: !old.isRerender };
        }
        return old;
      });
    }, 100);
  };
  useEffect(() => {
    fnZoom('init');
    window.addEventListener('resize', () => fnZoom('zoom'));
    window.addEventListener('mouseup', () => fnZoom('mouseup'));
    return () => {
      window.removeEventListener('resize', () => fnZoom('zoom'));
      window.removeEventListener('mouseup', () => fnZoom('mouseup'));
    };
  }, []);

  useEffect(() => {
    handleChange?.(table);
    if (refTimeout.current) clearTimeout(refTimeout.current);
    refTimeout.current = setTimeout(() => {
      setStateTable(old => ({ ...old, isRerender: !old.isRerender }));
    }, 100);
  }, [stateTable.columnFilters, stateTable.globalFilter]);

  useEffect(() => {
    if (body?.checkbox?.handleChange) {
      body?.checkbox?.handleChange(Object.keys(stateTable.rowSelection));
    }
  }, [stateTable.rowSelection]);

  const refHeaderGroups = useRef(table.getHeaderGroups());
  useEffect(() => {
    table.setOptions({ ...table.options, columns, data });
    refHeaderGroups.current = table.getHeaderGroups();
  }, [columns, data]);

  const refContainer = useRef<HTMLDivElement | null>(null);
  const optionRow = {
    count: table.getRowModel().rows?.length ?? 0,
    getScrollElement: () => refContainer?.current,
    estimateSize: () => body?.height ?? 25,
    overscan: 5,
  };
  const rowVirtualizer = useVirtualizer(optionRow);
  const virtualRows = rowVirtualizer.getVirtualItems();

  const optionColumn = {
    horizontal: true,
    count: table.getVisibleLeafColumns().length,
    getScrollElement: () => refContainer?.current,
    estimateSize: (index: number) => table.getVisibleLeafColumns()[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    overscan: 5,
    rangeExtractor: (range: Range) => {
      const { columnPinning } = stateTable;
      return [
        ...generateRangeNumber({
          start: columnPinning?.left?.length ? 0 : undefined,
          end: columnPinning?.left?.length ? columnPinning.left.length - 1 : undefined,
        }),
        ...defaultRangeExtractor(range),
        ...generateRangeNumber({
          start: table.getVisibleLeafColumns().length - (columnPinning?.right ?? []).length,
          end: columnPinning?.right?.length ? table.getVisibleLeafColumns().length - 1 : undefined,
        }),
      ]
        .filter((value, index, array) => array.indexOf(value) === index)
        .sort((a, b) => a - b);
    },
  };
  const columnVirtualizer = useVirtualizer(optionColumn);

  const refFirstResizing = useRef<boolean>(false);
  const columnSizes = () => {
    if (stateTable.isDragResize && !refFirstResizing.current) {
      refFirstResizing.current = true;
      table.setOptions({
        ...table.options,
        columns: columns.map(c => {
          c.size ??=
            refContainer.current?.querySelector(`th#${c.id}`)?.getBoundingClientRect().width ?? 0;
          return c;
        }),
        data: data ?? [],
      });
    }
    const headers = table.getFlatHeaders();
    const colSizes: { [key: string]: number | string } = {
      width: !stateTable.isDragResize ? '100%' : table.getTotalSize() + 'px',
    };

    const arrayWidthColumn = columns.map(column => column.size ?? 0);
    const totalWidthColumns = arrayWidthColumn.reduce((prve, next) => prve + next, 0);
    const width = refContainer.current?.getBoundingClientRect().width ?? 0;
    const percentCell =
      (((width - totalWidthColumns) / width) * 100) / arrayWidthColumn.filter(c => !c).length + '%';

    for (const header of headers) {
      let headerSize: string = '';
      let colSize: string = '';
      if (!stateTable.isDragResize) {
        const size = columns.find(c => c.id === header.id)?.size;
        headerSize = size ? size + 'px' : percentCell;
        colSize = size ? size + 'px' : percentCell;
      } else {
        headerSize = header.getSize() + 'px';
        colSize = header.column.getSize() + 'px';
      }

      colSizes[`--header-${header.id.replaceAll(' ', '-')}-size`] = headerSize;
      colSizes[`--col-${header.column.id.replaceAll(' ', '-')}-size`] = colSize;
    }

    return colSizes;
  };

  const refVirtualPaddingLeft = useRef(0);
  refVirtualPaddingLeft.current = utils.getPaddingLeft({
    old: refVirtualPaddingLeft.current,
    virtualColumns: columnVirtualizer.getVirtualItems(),
    pinLeft: stateTable.columnPinning?.left,
  });

  const fnChangePagination = ({ perPage, page }: { perPage: number; page: number }) => {
    table.setPagination({ pageIndex: page - 1, pageSize: perPage });
    pagination?.handleChange?.({ perPage, page });
  };

  return (
    <>
      <div
        ref={refContainer}
        className={classNames('overflow-auto', className)}
        onScroll={event => handleScroll?.({ event, table, columnVirtualizer, rowVirtualizer })}>
        {firstItem}
        <table className={'c-virtual-scroll'} style={columnSizes()}>
          {useMemo(
            () =>
              data?.length ? (
                <>
                  <TableHeader
                    table={table}
                    columnVirtualizer={columnVirtualizer}
                    refVirtualPaddingLeft={refVirtualPaddingLeft}
                    virtualRows={virtualRows}
                    stateTable={stateTable}
                    translate={translate}
                    header={header}
                    isAsynchronous={body?.checkbox?.isAsynchronous}
                    refHeaderGroups={refHeaderGroups}
                    setStateTable={setStateTable}
                  />
                  <TableBody
                    table={table}
                    columnVirtualizer={columnVirtualizer}
                    refVirtualPaddingLeft={refVirtualPaddingLeft}
                    virtualRows={virtualRows}
                    body={body}
                    rowVirtualizer={rowVirtualizer}
                  />
                </>
              ) : (
                <caption className="empty">
                  {<Icon className="size-8" name={EIcon.Confirm} />}
                  <p>{t('NoSearchResultsFound')}</p>
                </caption>
              ),
            [
              table.getRowModel().rows,
              rowVirtualizer.scrollOffset,
              columnVirtualizer.scrollOffset,
              stateTable,
              columns,
            ],
          )}
        </table>
      </div>
      {!!pagination && (
        <Pagination
          total={pagination?.total ?? table.getRowCount()}
          page={pagination?.page ?? table.getState().pagination.pageIndex + 1}
          perPage={pagination?.perPage ?? table.getState().pagination.pageSize}
          description={pagination?.description}
          handleChange={fnChangePagination}
        />
      )}
    </>
  );
};
export default Component;
