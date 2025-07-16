import { useQuery } from '@tanstack/react-query';

import config from './config';
import type Props from './type';

const useList = <TData, TParam>({
  url,
  valueParam,
  keyParam,
  isAddParamEmpty,
}: Props<TData, TParam>) =>
  useQuery<TData[]>(config<TData, TParam>({ url, valueParam, keyParam, isAddParamEmpty }) as never);

export default useList;
