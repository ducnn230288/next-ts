import type { DeepKeys, DeepValue } from '@tanstack/react-form';

import type { EFormType, EIcon } from '@/shared/enums';
import type { C_MASK } from '../constants/mask';
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
  readonly type: EFormType | null;
  readonly col?: number;
  readonly condition?: (props: {
    readonly value?: unknown;
    readonly index: number;
    readonly values?: T;
  }) => boolean;
  readonly rules?: TFieldFormRule<T>[];
  readonly disabled?: (props: { value?: DeepValue<T, DeepKeys<T>> }) => boolean;
  readonly placeholder?: string;
  readonly onChange?: (props: { value: unknown }) => void;
  readonly onBlur?: (props: { value: string; formApi: TForm<T>; name: DeepKeys<T> }) => void;
  readonly notDefaultValid?: boolean;
  readonly convert?: (data: { value?: unknown; values: T }) => never;
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
  readonly api?: TApi<T>;
};
