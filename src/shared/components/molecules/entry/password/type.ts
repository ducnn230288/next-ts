type Props = {
  readonly name: string;
  readonly value?: string;
  readonly placeholder: string;
  readonly disabled?: boolean;
  readonly handleChange?: (value: string) => void;
  readonly handleBlur?: (value: string) => void;
};
export default Props;
