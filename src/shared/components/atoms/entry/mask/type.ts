import type { TForm } from '@/shared/types';
import type { ChangeEvent, KeyboardEvent, Ref } from 'react';

type Props<T> = {
  readonly name: string;
  readonly className?: string;
  readonly mask?: string | typeof Number;
  readonly value?: string;
  readonly formApi?: TForm<T>;
  readonly addonBefore?: (formApi?: TForm<T>) => React.JSX.Element;
  readonly addonAfter?: (formApi?: TForm<T>) => React.JSX.Element;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly height?: number;
  readonly width?: number;
  readonly type?: string;
  readonly maxLength?: number;
  readonly onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly onPressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  readonly ref?: Ref<{ input: HTMLInputElement | null }>;
};
export default Props;
