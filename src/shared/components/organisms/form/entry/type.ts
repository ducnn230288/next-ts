import type { DeepKeys, DeepValue } from '@tanstack/react-form';

import type { TField, TFieldMeta } from '@/shared/types';
import type FieldType from '../field/type';
/**
 * Represents the properties for the button component.
 */
type Props<T> = Pick<FieldType<T>, 'formApi' | 'fieldForm' | 'Field'> & {
  readonly meta: TFieldMeta<T>;
  readonly title: string;
  readonly value?: DeepValue<T, DeepKeys<T>>;
  readonly field: TField<T>;
};
export default Props;
