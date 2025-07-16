import type { Ref } from 'react';

import type { C_MASK } from '@/shared/constants';
import type { EIcon } from '@/shared/enums';
import type { TForm } from '@/shared/types';

type Props<T> = {
  readonly name?: string;
  readonly className?: string;
  readonly mask?: keyof typeof C_MASK;
  readonly value?: string;
  readonly iconBefore?: EIcon;
  readonly iconAfter?: EIcon;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly height?: number;
  readonly width?: number;
  readonly type?: string;
  readonly maxLength?: number;
  readonly autoComplete?: 'on' | 'off';
  readonly handleBlur?: (value: string) => void;
  readonly handleFocus?: (value: string) => void;
  readonly handleChange?: (value: string) => void;
  readonly handlePressEnter?: (value: string) => void;
  readonly formApi?: TForm<T>;
  readonly ref?: Ref<{ refInput: HTMLInputElement | null }>;
};
export default Props;
