import type { ESize } from '@/shared/enums';
import type { ReactNode } from 'react';

type Props = {
  readonly isLoading?: boolean;
  readonly children?: ReactNode;
  readonly size?: ESize;
};
export default Props;
