type Props = {
  readonly total?: number;
  readonly page?: number;
  readonly perPage?: number;
  readonly handleChange?: (props: { page: number; perPage: number }) => void;
  readonly description?: (from: number, to: number, total: number) => string;
};
export default Props;
