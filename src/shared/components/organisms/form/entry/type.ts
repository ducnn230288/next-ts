import type { TField, TFieldState } from '@/shared/types';
import type FieldType from '../field/type';
/**
 * Represents the properties for the button component.
 */
type Props<T> = Pick<FieldType<T>, 'formApi' | 'fieldForm' | 'Field'> & {
  readonly field: TField<T>;
  readonly state: TFieldState<T>;
  readonly translate: (key: string, options?: Record<string, string>) => string;
};
export default Props;
