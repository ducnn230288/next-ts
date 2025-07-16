import type { TFieldForm, TForm, TFormField } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props<T> = {
  readonly formApi: TForm<T>;
  readonly fieldForm: TFieldForm<T>;
  readonly Field: TFormField<T>;
  readonly isLabel?: boolean;
  readonly translate: (key: string, options?: Record<string, string>) => string;
};

export default Props;
