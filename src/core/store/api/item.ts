import { useQuery } from '@tanstack/react-query';

import { serviceFetch } from '@/core/service';
import type Props from './type';

const useItem = <TData>({
  baseUrl,
  key = '',
  params,
  staleTime = 30000,
  enabled = true,
}: Props) => {
  return useQuery<TData | undefined>({
    queryKey: [baseUrl, key],
    queryFn: async () => (await serviceFetch.get<TData>({ url: baseUrl, params })).data,
    staleTime,
    enabled,
    retryDelay: 60000,
  });
};
export default useItem;
