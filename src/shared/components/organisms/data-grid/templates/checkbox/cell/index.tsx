import type { CellContext } from '@tanstack/react-table';

import Choice from '../../../../../atoms/choice';

const CheckboxCell = <TData,>({ row }: CellContext<TData, unknown>) => (
  <Choice
    className="row-selection"
    checked={row.getIsSelected()}
    disabled={!row.getCanSelect()}
    indeterminate={row.getIsSomeSelected()}
    handleChange={row.getToggleSelectedHandler()}
  />
);

export default CheckboxCell;
