import type { Header } from '@tanstack/react-table';
import type { VirtualItem } from '@tanstack/react-virtual';

import type DataGridProps from '../../../type';
import type CommonProps from '../../../utils/type';

/**
 * Represents the properties for the button component.
 */
type Props<TData> = Pick<DataGridProps<TData>, 'header'> &
  Pick<CommonProps<TData>, 'table' | 'columnVirtualizer' | 'setStateTable'> & {
    readonly vcHeader: Header<TData, unknown>;
    readonly vc: VirtualItem;
    readonly className?: string;
    readonly handleClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    readonly children: React.JSX.Element;
  };
export default Props;
