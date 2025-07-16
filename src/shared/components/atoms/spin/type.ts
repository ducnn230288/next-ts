import type { ReactNode, Ref } from 'react';

import type { ESize } from '@/shared/enums';

type Props = {
  readonly isLoading?: boolean;
  readonly size?: ESize;
  readonly className?: string;
  readonly children?: ReactNode;
  readonly ref?: Ref<{ element: HTMLDivElement | null }>;
};
export default Props;
