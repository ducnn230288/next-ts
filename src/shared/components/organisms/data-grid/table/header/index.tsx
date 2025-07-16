import { type FilterFns, flexRender, type Header, type HeaderGroup } from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { type MouseEvent, type TouchEvent, useEffect, useRef } from 'react';

import { EIcon } from '@/shared/enums';
import Icon from '../../../../atoms/icon';
import getPinningStyles from '../../utils/get-pinning-styles';
import HeaderFilter from './filter';
import HeaderOption from './option';
import type Props from './type';

const Component = <TData,>({
  table,
  columnVirtualizer,
  refVirtualPaddingLeft,
  // virtualRows,
  stateTable,
  // translate,
  header,
  isAsynchronous,
  setStateTable,
  refHeaderGroups,
}: Props<TData>) => {
  const fnShowArrow = ({
    vc,
    index,
    right = false,
  }: {
    vc: VirtualItem;
    index: number;
    right?: boolean;
  }) => {
    let indexVisibility = 0;
    const visibility = refHeaderGroups.current.map(headerGroup =>
      headerGroup.headers
        .map((header, index) => {
          if (stateTable.columnVisibility[header.id] === false) {
            indexVisibility += 1;
            return {
              id: header.id,
              index: index - (indexVisibility - 1),
            };
          }
          return null;
        })
        .filter(item => item),
    );
    const arrowLeft = visibility[index].find(item => item?.index === vc.index);
    const arrowRight = visibility[index].find(item => item?.index === vc.index + 1);

    if ((!!arrowLeft && !right) || (!!arrowRight && right)) {
      return !right ? arrowLeft : arrowRight;
    }
    return null;
  };
  const fnToggleVisibility = (id: string, visible = true) => {
    table.setColumnVisibility({
      ...stateTable.columnVisibility,
      [id]: visible,
    });
  };

  const fnDragResize = (
    e: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>,
    header: Header<TData, unknown>,
  ) => {
    if (stateTable.isDragResize) {
      header?.getResizeHandler()(e);
    } else {
      setTimeout(() => {
        table
          .getFlatHeaders()
          .find(h => h.id === header.id)
          ?.getResizeHandler()(e);
      });
    }
    setStateTable(old => ({ ...old, isDragResize: true }));
  };

  const fnGetHeader = ({ vc, headerGroup }: { vc: VirtualItem; headerGroup: HeaderGroup<TData> }) =>
    headerGroup.headers[vc.index];

  const fnStyleRow = ({
    vc,
    headerGroup,
  }: {
    vc: VirtualItem;
    headerGroup: HeaderGroup<TData>;
  }) => {
    const row = fnGetHeader({ vc, headerGroup });
    const style = getPinningStyles(row.column) || {};

    return {
      ...(typeof style === 'object' && style !== null ? style : {}),
      width: 'var(--header-' + (row.id.replace(/ /g, '-') ?? '') + '-size)',
    };
  };

  const refResize = useRef<{
    isResizing: boolean;
    header: Header<TData, unknown>;
    vc: VirtualItem;
  }>(undefined);
  const refTimeOut = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (refResize.current?.isResizing) {
      clearTimeout(refTimeOut.current);
      refTimeOut.current = setTimeout(() => {
        if (refResize.current) {
          columnVirtualizer.resizeItem(
            refResize.current.vc.index,
            refResize.current.header.column.getSize(),
          );
        }
      }, 200);
    }
  }, [refResize]);
  const fnGetLabel = ({
    vc,
    headerGroup,
  }: {
    vc: VirtualItem;
    headerGroup: HeaderGroup<TData>;
  }) => {
    const { header, id } = headerGroup.headers[vc.index].column.columnDef;
    return typeof header === 'string' ? header : id;
  };
  const t = useTranslations('Components');
  const refFilterTypeCurrent = useRef<Record<string, keyof FilterFns>>({});
  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup, index) => (
        <tr
          key={headerGroup.id}
          className={classNames({ 'round-checkbox': !isAsynchronous })}
          data-index={index}>
          {refVirtualPaddingLeft.current ? (
            <th style={{ width: refVirtualPaddingLeft.current + 'px' }} scope="col" />
          ) : null}
          {columnVirtualizer.getVirtualItems().map(vc => {
            if (fnGetHeader({ vc, headerGroup })) {
              refResize.current = {
                isResizing: fnGetHeader({ vc, headerGroup }).column.getIsResizing(),
                header: fnGetHeader({ vc, headerGroup }),
                vc,
              };
            }

            return (
              <th
                id={fnGetHeader({ vc, headerGroup })?.id}
                key={fnGetHeader({ vc, headerGroup })?.id}
                style={fnStyleRow({ vc, headerGroup })}
                className={classNames({
                  'has-sorter': fnGetHeader({ vc, headerGroup })?.column?.getCanSort(),
                  'has-filter': fnGetHeader({ vc, headerGroup })?.column?.getCanFilter(),
                })}
                aria-label={fnGetLabel({ vc, headerGroup })}
                data-index={index + '-' + vc.index}>
                {fnShowArrow({ vc, index }) && (
                  <button
                    className={'hide left-0'}
                    title={t('HideColumn')}
                    onClick={() => fnToggleVisibility(fnShowArrow({ vc, index })!.id)}>
                    <Icon className={'size-2 rotate-180'} name={EIcon.Arrow} />
                  </button>
                )}

                <HeaderOption<TData>
                  header={header}
                  table={table}
                  columnVirtualizer={columnVirtualizer}
                  vcHeader={fnGetHeader({ vc, headerGroup })}
                  vc={vc}
                  className={classNames('title', {
                    'cursor-default':
                      !fnGetHeader({ vc, headerGroup }).column.columnDef.meta?.sorter ||
                      !fnGetHeader({ vc, headerGroup }).column.getCanSort(),
                    hidden: !!fnGetHeader({ vc, headerGroup }).column.columnDef.meta?.isHeaderHide,
                    '!text-center': fnGetHeader({ vc, headerGroup }).id === 'rowSelection',
                  })}
                  handleClick={
                    fnGetHeader({ vc, headerGroup }).column.columnDef.meta?.sorter
                      ? fnGetHeader({ vc, headerGroup }).column.getToggleSortingHandler()
                      : undefined
                  }
                  setStateTable={setStateTable}>
                  <>
                    {!fnGetHeader({ vc, headerGroup })?.isPlaceholder &&
                      flexRender(
                        fnGetHeader({ vc, headerGroup })?.column?.columnDef.header,
                        fnGetHeader({ vc, headerGroup })?.getContext(),
                      )}
                    {fnGetHeader({ vc, headerGroup })?.column?.getIsSorted() && (
                      <Icon
                        name={EIcon.Sort}
                        className={classNames('sort', {
                          'rotate-180':
                            fnGetHeader({ vc, headerGroup })?.column?.getIsSorted() === 'asc',
                        })}
                      />
                    )}
                  </>
                </HeaderOption>

                <HeaderFilter<TData>
                  column={fnGetHeader({ vc, headerGroup })?.column}
                  refFilterTypeCurrent={refFilterTypeCurrent}
                />

                {!fnGetHeader({ vc, headerGroup })?.column?.columnDef?.meta?.isHeaderHide &&
                  !header?.isNotResizing && (
                    <button
                      className={classNames('resizer', {
                        resizing: fnGetHeader({ vc, headerGroup })?.column?.getIsResizing(),
                      })}
                      onDoubleClick={() => fnGetHeader({ vc, headerGroup })?.column?.resetSize()}
                      onMouseDown={e => fnDragResize(e, fnGetHeader({ vc, headerGroup }))}
                      onTouchStart={e => fnDragResize(e, fnGetHeader({ vc, headerGroup }))}
                      type="button"
                    />
                  )}

                {fnShowArrow({ vc, index, right: true }) && (
                  <button
                    className={'hide right-0.5'}
                    title={t('HideColumn')}
                    onClick={() => fnToggleVisibility(fnShowArrow({ vc, index, right: true })!.id)}>
                    <Icon className={'size-2'} name={EIcon.Arrow} />
                  </button>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
};

export default Component;
