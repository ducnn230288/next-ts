import { keepPreviousData } from '@tanstack/react-query';

import { serviceFetch } from '@/core/service';
import type Props from './type';

const config = <TData>({
  baseUrl,
  key = '',
  params = {},
  staleTime = 30000,
  enabled = true,
}: Props) => ({
  queryKey: [baseUrl, key],
  queryFn: async () => await serviceFetch.get<TData[]>({ url: baseUrl, params }),
  placeholderData: keepPreviousData,
  staleTime,
  enabled,
  retryDelay: 60000,
});

export default config;
