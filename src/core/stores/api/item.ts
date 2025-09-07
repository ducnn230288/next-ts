import { useQuery } from '@tanstack/react-query';

import { serviceFetch } from '@/core/services';
import type Props from './type';

const useItem = <TData, TParam = never>({
  url,
  params,
  staleTime = 10000,
}: Pick<Props<TData, TParam>, 'url' | 'params' | 'staleTime'>) =>
  useQuery<TData | undefined>({
    queryKey: [url, params],
    queryFn: async () => (await serviceFetch.get<TData>({ url, params })).data,
    staleTime,
  });
export default useItem;
