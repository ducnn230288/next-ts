import { useMutation, useQueryClient } from '@tanstack/react-query';

import { serviceFetch } from '@/core/services';
import config from './config';
import type Props from './type';

const useModify = <TData, TParam>({
  keyId,
  ...props
}: Props<TData, TParam> & {
  keyId: keyof TData;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      oldData,
      newData,
      status,
    }: {
      oldData?: TData;
      newData?: TData;
      status: 'add' | 'update' | 'delete';
    }) => {
      switch (status) {
        case 'add':
          return await serviceFetch.post({ url: props.url, values: newData });
        case 'delete':
          return await serviceFetch.delete({ url: props.url + '/' + oldData?.[keyId] });
        case 'update':
          return await serviceFetch.put({
            url: props.url + '/' + oldData?.[keyId],
            values: newData,
          });
      }
    },
    onMutate: async ({
      oldData,
      newData,
      status,
    }: {
      oldData?: TData;
      newData?: TData;
      status: 'add' | 'update' | 'delete';
    }) => {
      await queryClient.cancelQueries(config<TData, TParam>(props));
      const previous = queryClient.getQueryData<TData[]>(config<TData, TParam>(props).queryKey);
      if (previous) {
        const listData = previous.filter(data => data?.[keyId] !== oldData?.[keyId]);
        if (status !== 'delete' && newData) {
          const data = { ...oldData, ...newData };
          listData.unshift(data);
          if (oldData?.[keyId]) {
            queryClient.setQueryData<TData>([props.url, oldData?.[keyId]], data);
          }
        }
        queryClient.setQueryData<TData[]>(config<TData, TParam>(props).queryKey, listData);
      }

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData<TData[]>(config<TData, TParam>(props).queryKey, context.previous);
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: config<TData, TParam>(props).queryKey,
      }),
  });
};

export default useModify;
