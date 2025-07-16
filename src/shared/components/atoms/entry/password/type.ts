import type { ChangeEvent } from 'react';

type Props = {
  readonly value?: string;
  readonly placeholder: string;
  readonly disabled?: boolean;
  readonly handleChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
  readonly handleBlur?: (_e: ChangeEvent<HTMLInputElement>) => void;
};
export default Props;
