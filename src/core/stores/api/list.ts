import { useQuery } from '@tanstack/react-query';

import type { TResponses } from '@/shared/types';
import config from './config';
import type Props from './type';

const useList = <TData, TParam>(props: Props<TData, TParam>) =>
  useQuery<TResponses<TData[]>>(
    config<TData, TParam>({ ...props, params: { page_size: 300, ...props.params } }) as never,
  );

export default useList;
