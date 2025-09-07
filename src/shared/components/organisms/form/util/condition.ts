import { EFormType } from '@/shared/enum';
import type { TFieldForm } from '@/shared/types';

/**
 * Evaluates whether a form item should be displayed based on its type and condition.
 */
const condition = <T>({ fieldForm }: { readonly fieldForm: TFieldForm<T> }) => {
  return (
    (fieldForm?.type || fieldForm?.dynamicType) &&
    fieldForm?.type !== EFormType.Hidden &&
    (fieldForm?.isShow === undefined || fieldForm?.isShow === true)
  );
};

export default condition;
