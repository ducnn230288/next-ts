type Props = {
  readonly checked: boolean;
  readonly name?: string;
  readonly className?: string;
  readonly type?: 'checkbox' | 'radio';
  readonly value?: string | number;
  readonly label?: string;
  readonly disabled?: boolean;
  readonly indeterminate?: boolean;
  readonly handleChange: (checked?: boolean) => void;
};
export default Props;
