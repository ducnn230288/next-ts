type Props = {
  readonly className?: string;
  readonly name?: string;
  readonly value?: string;
  readonly disabled?: boolean;
  readonly isAutoHeight?: boolean;
  readonly placeholder: string;
  readonly maxLength?: number;
  readonly rows?: number;
  readonly handleBlur?: (value: string) => void;
  readonly handleChange?: (value: string) => void;
  readonly handlePressEnter?: (value: string) => void;
};
export default Props;
