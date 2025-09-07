import type { CellContext, Row } from '@tanstack/react-table';
import classNames from 'classnames';

import { EIcon } from '@/shared/enums';
import Icon from '../../../../../atoms/icon';
import type Props from '../../../type';

const ExpandedCell = <TData,>({
  row,
  getValue,
  handleExpand,
}: CellContext<TData, unknown> & Pick<Props<TData>, 'handleExpand'>) => {
  const fnExpand = (row: Row<TData>) => {
    row.toggleExpanded();
    handleExpand?.(row.original);
  };
  return (
    <>
      {row.getCanExpand() && (
        <button type="button" onClick={() => fnExpand(row)}>
          <Icon
            name={EIcon.Arrow}
            className={classNames('size-3', { 'rotate-90': row.getIsExpanded() })}
          />
        </button>
      )}
      <span>{getValue() as never}</span>
    </>
  );
};

export default ExpandedCell;
