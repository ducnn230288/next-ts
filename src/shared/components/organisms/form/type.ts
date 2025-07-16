import type { Ref } from 'react';

import type { TFieldForm, TForm, TFormFooter } from '@/shared/types';

type Props<T> = {
  readonly values?: T;
  readonly className?: string;
  readonly fields: TFieldForm<T>[];
  readonly isLoading?: boolean;
  readonly isEnterSubmit?: boolean;
  readonly onSubmit?: (props: { value?: T; formApi: TForm<T> }) => void;
  readonly footer?: (props: TFormFooter<T>) => React.JSX.Element;
  readonly isInline?: boolean;
  readonly ref?: Ref<TForm<T> | undefined>;
};
export default Props;
