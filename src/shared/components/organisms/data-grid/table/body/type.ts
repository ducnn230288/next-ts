import type { Virtualizer } from '@tanstack/react-virtual';

import type DataGridProps from '../../type';
import type CommonProps from '../../utils/type';

type Props<TData> = Pick<
  CommonProps<TData>,
  'table' | 'columnVirtualizer' | 'refVirtualPaddingLeft' | 'virtualRows'
> &
  Pick<DataGridProps<TData>, 'body'> & {
    readonly rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  };
export default Props;
