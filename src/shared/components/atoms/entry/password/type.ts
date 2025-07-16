import type { ChangeEvent } from 'react';

type Props = {
  readonly value?: string;
  readonly placeholder: string;
  readonly disabled?: boolean;
  readonly onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
  readonly onBlur?: (_e: ChangeEvent<HTMLInputElement>) => void;
};
export default Props;
