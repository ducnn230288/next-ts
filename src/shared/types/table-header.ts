import type { ColumnPinningState } from '@tanstack/react-table';

export type TTableHeader = {
  readonly width?: number;
  readonly maxWidth?: number;
  readonly pinning?: ColumnPinningState;
  readonly isNotResizing?: boolean;
  readonly isNotRightClick?: boolean;
};
