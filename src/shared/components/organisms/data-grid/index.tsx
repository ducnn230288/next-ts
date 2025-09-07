'use client';
import type { AccessorKeyColumnDef, CellContext, ColumnDef, Table } from '@tanstack/react-table';
import { useLocale } from 'next-intl';
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import Spin from '../../atoms/spin';
import './style.scss';
import DataTable from './table';
import Template from './templates';
import type Props from './type';
import utils from './utils';

const DataGrid = <TData,>({
  isLoading,
  handleExpand,
  action,

  columns,
  data,
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

  ref,
  firstItem,
}: Props<TData>) => {
  const refOuterDiv = useRef<{ element: HTMLDivElement | null }>(null);
  const [stateDataGrid, setStateDataGrid] = useState<{ columns?: ColumnDef<TData>[] }>({});
  const fnUpdateColumns = () => {
    setTimeout(() => {
      if (refOuterDiv.current?.element) {
        const originalColumns = [...columns];
        if (body?.isExpanded && columns.length > 0) {
          originalColumns[0].cell = (prop: CellContext<TData, unknown>) => (
            <Template.ExpandedCell {...prop} handleExpand={handleExpand} />
          );
          originalColumns[0].meta ??= {};
        }
        if (body?.checkbox && !originalColumns.find(col => col.id === '_ROW_CHECKBOX_')) {
          originalColumns.unshift({
            id: '_ROW_CHECKBOX_',
            size: body?.checkbox?.width ?? 44,
            header: Template.CheckboxHeader,
            cell: Template.CheckboxCell,
            meta: { isHeaderHide: true },
          });
        }

        if (
          action?.label &&
          originalColumns.filter(item => item.id === '|||ACTION|||').length === 0
        ) {
          originalColumns.push({
            id: '|||ACTION|||',
            header: '',
            size: 32,
            meta: {
              isHeaderHide: true,
            },
            cell: (prop: CellContext<TData, unknown>) => (
              <Template.ActionCell {...prop} action={action} />
            ),
          });
        }

        const newColumns = originalColumns.map(column => fnFormatColumn({ column }));
        if (JSON.stringify(stateDataGrid.columns) !== JSON.stringify(newColumns))
          setStateDataGrid({ columns: newColumns });
      }
    }, 140);
  };

  const language = useLocale();
  useEffect(() => {
    fnUpdateColumns();
  }, [language, columns]);

  const fnFormatColumn = ({ column }: { column: ColumnDef<TData> }) => {
    if (column.meta?.isDateTime && !column.cell) {
      column.cell = Template.DateCell;
    }

    return {
      ...column,
      id: column.id ?? (column as AccessorKeyColumnDef<TData>).accessorKey?.toString(),
      size: stateDataGrid.columns?.find(col => col.id === column.id)?.size ?? column.size,
    };
  };

  const refTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);
  const fnOnChange = (table: Table<TData>) => {
    if (refTimeout.current) clearTimeout(refTimeout.current);
    refTimeout.current = setTimeout(() => {
      handleChange?.(table);
    }, 200);
  };

  const isFilter =
    !!filterGlobal || columns.some(obj => obj.meta && Object.keys(obj.meta).includes('filter'));
  const maxSize =
    header?.maxWidth ?? refOuterDiv.current?.element?.getBoundingClientRect().width ?? 1200;
  const pageSize =
    pagination?.perPage ??
    (refOuterDiv.current?.element &&
      utils.getSizePageByHeight({ height: body?.height, element: refOuterDiv.current.element })) ??
    0;

  const refTable = useRef<Table<TData>>(undefined);
  useImperativeHandle(ref, () => refTable.current);

  return useMemo(
    () => (
      <Spin isLoading={!!isLoading} className="data-grid" ref={refOuterDiv}>
        {!!stateDataGrid.columns && !!data && (
          <DataTable<TData>
            ref={refTable}
            data={data}
            columns={stateDataGrid.columns}
            isFilter={isFilter}
            maxSize={maxSize}
            pageSize={pageSize}
            body={body}
            header={header}
            filterGlobal={filterGlobal}
            pagination={pagination}
            keyId={keyId}
            firstItem={firstItem}
            className={className}
            defaultColumn={defaultColumn}
            translate={translate}
            handleScroll={handleScroll}
            handleChange={fnOnChange}
          />
        )}
      </Spin>
    ),
    [data, stateDataGrid],
  );
};
export default DataGrid;
