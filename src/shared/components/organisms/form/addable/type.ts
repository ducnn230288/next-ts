import type { DeepKeys } from '@tanstack/react-form';

import type { TFieldForm, TForm, TFormField } from '@/shared/types';

type Props<T> = {
  readonly name: DeepKeys<T>;
  readonly fields?: TFieldForm<T>[];
  readonly formApi: TForm<T>;
  readonly Field: TFormField<T>;
  readonly translate: (key: string, options?: Record<string, string>) => string;
  readonly isLabel?: boolean;
  readonly isAdd?: boolean;
  readonly className?: string;
  readonly values?: T;
};
export default Props;
