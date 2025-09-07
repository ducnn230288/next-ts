import classNames from 'classnames';

import { Icon } from '@/shared/components/atoms';
import { EIcon } from '@/shared/enum';
import FormField from '../field';
import utils from '../util';
import './style.scss';
import type Props from './type';

/**
 * Component description.
 */
const Component = <T,>({
  name,
  fields = [],
  formApi,
  Field,
  translate,
  isLabel,
  isAdd = true,
  className,
  values,
}: Props<T>) => {
  return (
    <div className="addable">
      <Field name={name} mode="array">
        {field =>
          (field.state?.value as T[])?.map((_, i) => (
            <div className={classNames('flex', className)} key={name + i}>
              <div className={'grid'}>
                {fields
                  .filter(fieldForm => utils.condition({ fieldForm }))
                  .map((fieldForm, index: number) => (
                    <div
                      className={classNames('col-span-12', 'sm:col-span-' + (fieldForm?.col ?? 12))}
                      key={'addable' + index}>
                      <FormField<T>
                        formApi={formApi}
                        fieldForm={fieldForm}
                        Field={Field}
                        isLabel={isLabel}
                        translate={translate}
                        name={`${name}[${i}].${fieldForm.name.toString()}`}
                        values={values}
                      />
                    </div>
                  ))}
              </div>
              {isAdd && (
                <div className={'group-button'}>
                  <button
                    type="button"
                    onClick={() => {
                      field.pushValue({} as never);
                    }}>
                    <Icon name={EIcon.Plus} />
                  </button>
                  {i > 0 && (
                    <button
                      className="delete"
                      type="button"
                      onClick={() => {
                        field.removeValue(i);
                      }}>
                      <Icon name={EIcon.Minus} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        }
      </Field>
    </div>
  );
};
export default Component;
