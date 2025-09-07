type Props = {
  readonly baseUrl: string;
  readonly key?: string | Record<string, unknown>;
  readonly params?: Record<string, unknown>;
  readonly staleTime?: number;
  readonly enabled?: boolean;
};
export default Props;
