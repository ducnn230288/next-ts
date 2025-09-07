type Props<TData, TParam> = {
  readonly url: string;
  readonly valueParam?: string;
  readonly keyParam: keyof TParam | keyof TData;
  readonly isAddParamEmpty?: boolean;
  readonly params?: Record<string, unknown>;
  readonly staleTime?: number;
  readonly handleSuccess?: () => void;
  readonly enabled?: boolean;
};
export default Props;
