import type { Dayjs } from 'dayjs';

type Props = {
  readonly value: Dayjs[];
  readonly isMultiple?: boolean;
  readonly handleChange: (date: Dayjs[]) => void;
};

export default Props;
