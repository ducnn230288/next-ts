import { EFormType } from '@/shared/enums';
import type { TFieldForm } from '@/shared/types';

/**
 * Evaluates whether a form item should be displayed based on its type and condition.
 */
const condition = <T>({
  fieldForm,
  index,
  values,
}: {
  readonly fieldForm: TFieldForm<T>;
  readonly index: number;
  readonly values?: T;
}) =>
  fieldForm?.type &&
  fieldForm?.type !== EFormType.Hidden &&
  (!fieldForm?.condition || !!fieldForm?.condition({ index, values }));

export default condition;
