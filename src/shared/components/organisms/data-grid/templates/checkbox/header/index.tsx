import type { HeaderContext } from '@tanstack/react-table';

import Choice from '../../../../../atoms/choice';

const CheckboxHeader = <TData,>({ table }: HeaderContext<TData, unknown>) => (
  <Choice
    className="row-selection"
    checked={table.getIsAllRowsSelected()}
    indeterminate={table.getIsSomeRowsSelected()}
    handleChange={e => table.toggleAllRowsSelected(e)}
  />
);

export default CheckboxHeader;
