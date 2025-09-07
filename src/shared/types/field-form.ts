import type { DeepKeys } from '@tanstack/react-form';

import type { EFormType, EIcon } from '@/shared/enum';
import type { C_MASK } from '../constant/mask';
import type { TApi } from './api';
import type { TFieldFormRule } from './field-form-rule';
import type { TFlatten } from './flatten';
import type { TForm } from './form';
import type { TOption } from './option';

/**
 * Represents a form.
 */
export type TFieldForm<T> = {
  readonly name: keyof TFlatten<T>;
  readonly title: string;
  readonly type?: EFormType;
  readonly col?: number;
  readonly isShow?: boolean;
  readonly rules?: TFieldFormRule<T>[];
  readonly isDisabled?: boolean;
  readonly placeholder?: string;
  readonly onChange?: (props: { value: unknown }) => void;
  readonly onBlur?: (props: { value: string; formApi: TForm<T>; name: DeepKeys<T> }) => void;
  readonly isDefaultValid?: boolean;
  readonly maxLength?: number;

  readonly text?: {
    readonly mask?: keyof typeof C_MASK;
    readonly iconBefore?: EIcon;
    readonly iconAfter?: EIcon;
  };
  readonly upload?: {
    readonly isShowFile?: boolean;
    readonly accept?: string;
  };
  readonly options?: TOption[];
  readonly isMultiple?: boolean;
  readonly api?: TApi;
  readonly fields?: TFieldForm<T>[];
  readonly addable?: {
    readonly isLabel?: boolean;
    readonly isAdd?: boolean;
    readonly className?: string;
  };
  readonly select?: {
    readonly isTranslate?: boolean;
  };
  readonly customize?: (props: { values?: T }) => React.JSX.Element;
  readonly dynamicType?: (props: { values?: T }) => EFormType;
};
