import type { ChangeEvent, KeyboardEvent, Ref } from 'react';

import type { EIcon } from '@/shared/enums';
import type { TForm } from '@/shared/types';

type Props<T> = {
  readonly name: string;
  readonly className?: string;
  readonly mask?: unknown;
  readonly value?: string;
  readonly iconBefore?: EIcon;
  readonly iconAfter?: EIcon;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly height?: number;
  readonly width?: number;
  readonly type?: string;
  readonly maxLength?: number;
  readonly handleBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly handleFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly handlePressEnter?: (e: KeyboardEvent<HTMLInputElement>) => void;
  readonly ref?: Ref<{ input: HTMLInputElement | null }>;
  readonly formApi?: TForm<T>;
};
export default Props;
