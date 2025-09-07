import { useQuery } from '@tanstack/react-query';

import type { TResponses } from '@/shared/types';
import config from './config';
import type Props from './type';

const useList = <TData>(props: Props) =>
  useQuery<TResponses<TData[]>>(config<TData>({ ...props }) as never);

export default useList;
