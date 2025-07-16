import { useQuery } from '@tanstack/react-query';

import { serviceFetch } from '@/core/services';

const useItem = <TData>({ url, param }: { url: string; param: string }) =>
  useQuery<TData | undefined>({
    queryKey: [url, param],
    queryFn: async () =>
      param ? (await serviceFetch.get<TData>({ url: url + '/' + param })).data : undefined,
  });
export default useItem;
