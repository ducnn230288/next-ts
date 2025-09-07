import { keepPreviousData } from '@tanstack/react-query';

import { serviceFetch } from '@/core/services';
import type Props from './type';

const config = <TData, TParam>({
  url,
  valueParam,
  keyParam,
  isAddParamEmpty,
  params = {},
  staleTime = 4000,
  enabled = true,
}: Props<TData, TParam>) => ({
  queryKey: [url, valueParam],
  queryFn:
    valueParam !== undefined
      ? async () =>
          await serviceFetch.get<TData[]>({
            url,
            params: {
              ...(valueParam || isAddParamEmpty ? { [keyParam]: valueParam } : {}),
              ...params,
            },
          })
      : () => [],
  placeholderData: keepPreviousData,
  staleTime,
  enabled,
});

export default config;
