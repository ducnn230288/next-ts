import type { Column } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import type { TOption } from '@/shared/types';
import Dropdown from '../../../../../molecules/dropdown';
import type Props from './type';

const Component = <TData,>({
  header,
  table,
  columnVirtualizer,
  setStateTable,
  vcHeader,
  vc,
  className,
  handleClick,
  children,
}: Props<TData>) => {
  const t = useTranslations('Components');
  const handleResetSize = (column: Column<TData>) => {
    column?.resetSize();
    setTimeout(() => {
      columnVirtualizer.resizeItem(vc.index, column.getSize());
    }, 200);
  };
  const renderDropdownItem = (column: Column<TData>) => {
    const item: TOption[] = [];
    const isHasOnlyOneColumn = table.getVisibleLeafColumns().length === 1;

    if (!isHasOnlyOneColumn) {
      item.push({
        label: 'Hide',
        value: 'hide',
        onClick: () => {
          column.toggleVisibility(false);
          columnVirtualizer.scrollToOffset((columnVirtualizer.scrollOffset ?? 0) + 1);
          setStateTable(old => ({ ...old, isRerender: !old.isRerender }));
        },
      });

      if (!header?.pinning && column?.getIsPinned() !== 'left')
        item.push({
          label: 'PinLeft',
          value: 'pin-left',
          onClick: () => column.pin('left'),
        });
      if (!header?.pinning && column?.getIsPinned() !== 'right')
        item.push({
          label: 'PinRight',
          value: 'pin-right',
          onClick: () => {
            column.pin('right');
            columnVirtualizer.scrollToOffset((columnVirtualizer.scrollOffset ?? 0) + 1);
          },
        });
    }

    if (column?.getSize() !== column?.columnDef?.size && !!column?.columnDef?.size)
      item.push({
        label: 'ResetSize',
        value: 'reset-size',
        onClick: () => handleResetSize(column),
      });
    if (!header?.pinning && column?.getIsPinned())
      item.push({
        label: 'ResetPin',
        value: 'reset-pin',
        onClick: () => column.pin(false),
      });
    return item;
  };

  return (
    <Dropdown
      options={renderDropdownItem(vcHeader?.column)}
      translate={t}
      classContainer={className}
      isRightClick={true}
      isWidthFull={false}
      handleClick={handleClick}>
      {children}
    </Dropdown>
  );
};
export default Component;
