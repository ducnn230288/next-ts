import type { DeepKeys, DeepValue } from '@tanstack/react-form';

import type { EFormType } from '@/shared/enums';
import type { TFieldFormRule } from './field-form-rule';
import type { TFlatten } from './flatten';
import type { TForm } from './form';

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
  readonly render?: (props: { values?: T; index: string | number }) => React.JSX.Element;
  readonly notDefaultValid?: boolean;
  readonly convert?: (data: { value?: unknown; values: T }) => never;
  readonly maxLength?: number;

  readonly text?: {
    readonly mask?: string;
    readonly addonBefore?: (formApi?: TForm<T>) => React.JSX.Element;
    readonly addonAfter?: (formApi?: TForm<T>) => React.JSX.Element;
  };
};
