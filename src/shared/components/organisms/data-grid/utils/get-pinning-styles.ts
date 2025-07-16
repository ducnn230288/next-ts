import type { Column } from '@tanstack/react-table';
import type { CSSProperties } from 'react';

const getPinningStyles = <TData>(column: Column<TData>): CSSProperties => {
  if (!column) return {};
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');
  const styleRight = isFirstRightPinnedColumn ? '4px 0 4px -4px gray inset' : undefined;
  return {
    boxShadow: isLastLeftPinnedColumn ? '-4px 0 4px -4px gray inset' : styleRight,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    borderLeft: isPinned === 'left' ? '1px solid #e0e0e0' : undefined,
    position: isPinned ? 'sticky' : 'relative',
    zIndex: isPinned ? '1' : '0',
  };
};

export default getPinningStyles;
