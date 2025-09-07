type Props = {
  readonly name?: string;
  readonly value?: string[];
  readonly disabled?: boolean;
  readonly placeholder?: string;
  readonly handleChange?: (value: string[]) => void;
};
export default Props;
