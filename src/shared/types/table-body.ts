export type TTableBody = {
  readonly isExpanded?: boolean;
  readonly height?: number;
  readonly ids?: string[];
  readonly handleDoubleClick?: (id: string) => void;
  readonly handleClick?: (props: { ids: string[]; id: string }) => void;
  readonly checkbox?: {
    readonly handleChange?: (ids: string[]) => void;
    readonly width?: number;
    readonly isAsynchronous?: boolean;
  };
};
