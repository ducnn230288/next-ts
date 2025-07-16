import type { CellContext } from '@tanstack/react-table';

import { formatDateTime } from '@/shared/utils';
import Tooltip from '../../../../../atoms/tooltip';

const DateCell = <TData,>({ row, column }: CellContext<TData, unknown>) => {
  const dateString = row.original[column.id as keyof TData] as string;
  return (
    <Tooltip content={formatDateTime({ dateString, isTime: true })}>
      {formatDateTime({ dateString })}
    </Tooltip>
  );
};

export default DateCell;
