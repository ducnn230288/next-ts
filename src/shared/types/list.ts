import type { EIcon } from '../enums';

/**
 * Represents an item in a table filter list.
 */
export type TList = {
  readonly value: string | number;
  readonly label: string;
  readonly icon?: EIcon;
  readonly disabled?: boolean;
  readonly children?: TList[];
  readonly onClick?: () => void;
};
