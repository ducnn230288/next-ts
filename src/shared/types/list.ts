/**
 * Represents an item in a table filter list.
 */
export type TList = {
  readonly value: string | number;
  readonly label: React.ReactNode;
  readonly disabled?: boolean;
  readonly children?: TList[];
  readonly onClick?: () => void;
};
