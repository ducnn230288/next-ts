import { useMutation, useQueryClient } from '@tanstack/react-query';

import { serviceFetch } from '@/core/services';
import { EStoreApi } from '@/shared/enums';
import type { TResponses } from '@/shared/types';
import config from './config';
import type Props from './type';

const useModify = <TData, TParam>({
  keyId,
  handleSuccess,
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
      status: EStoreApi;
    }) => {
      switch (status) {
        case EStoreApi.Post:
          return await serviceFetch.post({ url: props.url, values: newData, handleSuccess });
        case EStoreApi.Delete:
          return await serviceFetch.delete({ url: props.url + oldData?.[keyId], handleSuccess });
        case EStoreApi.Put:
          return await serviceFetch.put({
            url: props.url + oldData?.[keyId],
            values: newData,
            handleSuccess,
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
      status: EStoreApi;
    }) => {
      await queryClient.cancelQueries(config<TData, TParam>(props));
      const previous = queryClient.getQueryData<TResponses<TData[]>>(
        config<TData, TParam>(props).queryKey,
      );
      if (previous) {
        const listData = previous?.data?.filter(data => data?.[keyId] !== oldData?.[keyId]);
        if (status !== EStoreApi.Delete && newData) {
          const data = { ...oldData, ...newData };
          listData?.unshift(data);
          if (oldData?.[keyId]) {
            queryClient.setQueryData<TData>([props.url, oldData?.[keyId]], data);
          }
        } else {
          queryClient.setQueryData<TData[]>(config<TData, TParam>(props).queryKey, listData);
        }
      }

      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData<TResponses<TData[]>>(
          config<TData, TParam>(props).queryKey,
          context.previous,
        );
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: config<TData, TParam>(props).queryKey,
      }),
  });
};

export default useModify;
