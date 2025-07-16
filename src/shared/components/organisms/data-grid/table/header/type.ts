import type { HeaderGroup } from '@tanstack/react-table';
import type { RefObject } from 'react';

import type DataGridProps from '../../type';
import type CommonProps from '../../utils/type';

type Props<TData> = CommonProps<TData> &
  Pick<DataGridProps<TData>, 'header'> & {
    readonly isAsynchronous?: boolean;
    readonly refHeaderGroups: RefObject<HeaderGroup<TData>[]>;
  };
export default Props;
