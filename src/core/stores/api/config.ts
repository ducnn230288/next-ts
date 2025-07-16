import { serviceFetch } from '@/core/services';
import type Props from './type';

const config = <TData, TParam>({
  url,
  valueParam,
  keyParam,
  isAddParamEmpty,
}: Props<TData, TParam>) => ({
  queryKey: [url, valueParam],
  queryFn:
    valueParam !== undefined
      ? async () =>
          await serviceFetch.get<TData[]>({
            url,
            params: valueParam || isAddParamEmpty ? { [keyParam]: valueParam } : {},
          })
      : () => [],
});

export default config;
