export type TTablePagination = {
  readonly total?: number;
  readonly page_size?: number;
  readonly page?: number;
  readonly handleChange?: (props: { page: number; page_size: number }) => void;
  readonly description?: (from: number, to: number, total: number) => string;
};
