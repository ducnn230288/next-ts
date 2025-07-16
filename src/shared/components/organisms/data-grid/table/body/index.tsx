import { flexRender, type Cell, type Row } from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { useRef } from 'react';

import getPinningStyles from '../../utils/get-pinning-styles';
import type Props from './type';

const Component = <TData,>({
  table,
  columnVirtualizer,
  refVirtualPaddingLeft,
  virtualRows,
  body,
  rowVirtualizer,
}: Props<TData>) => {
  const fnGetRow = (virtualRow: VirtualItem): Row<TData> =>
    table.getRowModel().rows[virtualRow.index];

  const fnGetCell = (row: Row<TData>, vc: VirtualItem): Cell<TData, unknown> =>
    row.getVisibleCells()[vc.index];

  const fnGetCellClass = (cell: Cell<TData, unknown>) => {
    const attributes = cell?.column?.columnDef?.meta?.onCell
      ? cell?.column?.columnDef?.meta?.onCell(cell.row.original)
      : {};

    return classNames(attributes?.className, {
      '!text-center': cell?.column?.id === 'rowSelection',
    });
  };

  const fnGetCellStyle = (cell: Cell<TData, unknown>) => {
    const attributes = cell?.column?.columnDef?.meta?.onCell
      ? cell?.column?.columnDef?.meta?.onCell(cell.row.original)
      : {};
    if (cell?.column?.columnDef?.meta?.align && attributes.style)
      attributes.style.textAlign = cell?.column?.columnDef?.meta?.align;
    return {
      ...getPinningStyles(cell?.column),
      width: `var(--col-${cell?.column?.id}-size)`,
      height: body?.height ?? 25,
      ...(attributes.style ?? { textAlign: cell?.column?.columnDef?.meta?.align }),
    };
  };

  const refSelectedRow = useRef<string | undefined>(undefined);
  const fnClickRow = (cell: Cell<TData, unknown>, row: Row<TData>) => {
    const mouseEvent = window.event as MouseEvent | undefined;
    let ids: string[] = [row.id];
    if (!body?.checkbox?.isAsynchronous) {
      let dataOld: Record<string, boolean>;
      table?.setRowSelection(old => {
        if (dataOld) return dataOld;
        if (!mouseEvent?.shiftKey && !mouseEvent?.ctrlKey) {
          refSelectedRow.current = row.id;
          dataOld = { [row.id]: !row.getIsSelected() };
        } else if (mouseEvent?.ctrlKey) {
          refSelectedRow.current = row.id;
          dataOld = { ...old, [row.id]: !row.getIsSelected() };
        } else if ((window.event as KeyboardEvent).shiftKey) {
          if (refSelectedRow.current) {
            const index = table
              .getRowModel()
              .rows.findIndex(row => row.id === refSelectedRow.current);
            const start = Math.min(index, row.index);
            const end = Math.max(index, row.index);
            const rows =
              start < end
                ? table.getRowModel().rows.slice(start, end + 1)
                : table.getRowModel().rows.slice(end, start - 1);
            dataOld = {};
            rows.forEach(row => {
              dataOld[row.id] = true;
            });
          } else {
            dataOld = { [row.id]: !row.getIsSelected() };
            refSelectedRow.current = row.id;
          }
        }
        return dataOld;
      });
    } else if (mouseEvent?.ctrlKey) {
      if (body?.ids?.includes(row.id)) {
        ids = body?.ids?.filter(item => item !== row.id);
      } else {
        ids = [...(body?.ids ?? []), row.id];
      }
      refSelectedRow.current = row.id;
    } else if (mouseEvent?.shiftKey) {
      const index = table.getRowModel().rows.findIndex(row => row.id === refSelectedRow.current);
      const start = Math.min(index, row.index);
      const end = Math.max(index, row.index);
      ids = (
        start < end
          ? table.getRowModel().rows.slice(start, end + 1)
          : table.getRowModel().rows.slice(end, start - 1)
      ).map(row => row.id);
    } else {
      refSelectedRow.current = row.id;
    }
    if (cell?.column?.id !== 'rowSelection' || !body?.checkbox?.isAsynchronous) {
      body?.handleClick?.({ ids, id: row.id });
    }
  };

  return (
    <tbody style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
      {virtualRows.map(virtualRow => (
        <tr
          key={fnGetRow(virtualRow).id}
          data-item
          className={classNames({
            children: fnGetRow(virtualRow).getParentRow(),
            'bg-warning-200': body?.ids?.includes(fnGetRow(virtualRow).id),
            'cursor-pointer': !!body?.handleClick || body?.handleDoubleClick,
            'round-checkbox': !body?.checkbox?.isAsynchronous,
          })}
          data-index={virtualRow.index}
          style={{ transform: `translateY(${virtualRow.start}px)` }}>
          {refVirtualPaddingLeft.current ? (
            <td style={{ width: refVirtualPaddingLeft.current + 'px' }} />
          ) : null}
          {columnVirtualizer.getVirtualItems().map((vc: VirtualItem) => (
            <td
              key={fnGetCell(fnGetRow(virtualRow), vc)?.id}
              data-index={vc.index}
              className={fnGetCellClass(fnGetCell(fnGetRow(virtualRow), vc))}
              style={fnGetCellStyle(fnGetCell(fnGetRow(virtualRow), vc))}
              onMouseDown={() =>
                fnClickRow(fnGetCell(fnGetRow(virtualRow), vc), fnGetRow(virtualRow))
              }
              onDoubleClick={() =>
                fnGetCell(fnGetRow(virtualRow), vc)?.column?.id !== 'rowSelection' &&
                body?.handleDoubleClick?.(fnGetRow(virtualRow).id)
              }>
              {!fnGetCell(fnGetRow(virtualRow), vc).getIsPlaceholder() && (
                <div>
                  {flexRender(
                    fnGetCell(fnGetRow(virtualRow), vc)?.column?.columnDef?.cell,
                    fnGetCell(fnGetRow(virtualRow), vc)?.getContext(),
                  )}
                </div>
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};
export default Component;
