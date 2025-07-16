import type { TFieldForm, TFlatten } from '@/shared/types';

type Prop<T = Record<string, string | undefined>> = {
  readonly fields: TFieldForm<T>[];
  readonly values?: T;
  readonly isExport?: boolean;
};
/**
 * Converts form values based on the provided columns and values.
 */
const convertValueForm = <T>({ fields, values }: Prop<T>) => {
  fields
    .filter(
      (field, index) =>
        field.type &&
        (!field?.condition ||
          (values &&
            !!field?.condition({ value: (values as TFlatten<T>)[field.name], index, values }))),
    )
    .forEach(field => {
      if (field?.convert && values) {
        (values as TFlatten<T>)[field.name] = field.convert({
          value: (values as TFlatten<T>)[field.name],
          values,
        });
      }
    });
  return values;
};
export default convertValueForm;
