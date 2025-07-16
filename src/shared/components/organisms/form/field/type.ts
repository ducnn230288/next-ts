import type { TFieldForm, TForm, TFormField } from '@/shared/types';

/**
 * Represents the properties for the button component.
 */
type Props<T> = {
  readonly formApi: TForm<T>;
  readonly fieldForm: TFieldForm<T>;
  readonly Field: TFormField<T>;
  readonly name: keyof T;
  readonly index: string | number;
  readonly values?: T;
  readonly isLabel?: boolean;
};

export default Props;
