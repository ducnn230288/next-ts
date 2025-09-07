import type { Dayjs } from 'dayjs';

type Props = {
  readonly title?: string;
  readonly name?: string;
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly isMultiple?: boolean;
  readonly value: Props['isMultiple'] extends true ? Dayjs[] : Dayjs;
  readonly handleChange: (date: Props['isMultiple'] extends true ? Dayjs[] : Dayjs) => void;
};

export default Props;
