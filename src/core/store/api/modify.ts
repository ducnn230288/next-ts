import { useMutation, useQueryClient } from '@tanstack/react-query';

import { serviceFetch } from '@/core/service';
import { EStoreApi } from '@/shared/enum';
import config from './config';
import type Props from './type';

type ModifyParams<TData> = {
  readonly url?: string;
  readonly values?: TData;
  readonly status: EStoreApi;
  readonly isShowMessage?: boolean;
  readonly handleSuccess?: () => void;
};
const useModify = <TData>(props: Props) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      values = {} as TData,
      status,
      url = '',
      handleSuccess,
      isShowMessage = true,
    }: ModifyParams<TData>) =>
      await serviceFetch[status]({
        url: props.baseUrl + url,
        values,
        handleSuccess,
        isShowMessage,
      }),
    onMutate: async ({ values, status }: ModifyParams<TData>) => {
      await queryClient.cancelQueries(config<TData>(props));
      const previous = queryClient.getQueryData<TData>(config<TData>(props).queryKey);
      if (previous) {
        if (status !== EStoreApi.Delete && values) {
          queryClient.setQueryData<TData>(config<TData>(props).queryKey, {
            ...previous,
            ...values,
          });
        }
      }
      return { previous };
    },
    onError: (_, __, context) => {
      if (context?.previous) {
        queryClient.setQueryData<TData>(config<TData>(props).queryKey, context.previous);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [props.baseUrl] }),
  });
};

export default useModify;
