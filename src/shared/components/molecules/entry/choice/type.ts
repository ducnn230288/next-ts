import type { TOption } from '@/shared/types';

type Props = {
  readonly options?: TOption[];
  readonly value: (string | number)[];
  readonly disabled?: boolean;
  readonly handleChange: (checked: (string | number)[]) => void;
  readonly name?: string;
  readonly direction?: 'row' | 'column';
  readonly className?: string;
  readonly type?: 'checkbox' | 'radio';
};
export default Props;
