type Props<T> = {
  readonly className?: string;
  readonly data?: T[];
  readonly render?: (row: T, i: number) => React.JSX.Element;
  readonly firstItem?: React.JSX.Element;
  readonly heightCell?: number;
  readonly isDisabled?: boolean;
  readonly handleScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  readonly ref?: React.Ref<{ div: HTMLDivElement | null }>;
};
export default Props;
