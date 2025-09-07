export type TTableAction<TData> = {
  readonly label: string;
  readonly name: (data: TData) => unknown;
  readonly onDetail?: (data: TData) => void;
  readonly onEdit?: (data: TData) => void;
  readonly onDelete?: (data: TData) => void;
  readonly renderMore?: (data: TData) => ({ label: string; value: string } | undefined)[];
};
