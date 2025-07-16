import type { TFile } from '@/shared/types';

type Props = {
  value?: (TFile | string)[];
  handleChange?: (values: (TFile | string)[]) => void;
  showBtnDelete?: (file: TFile | string) => boolean;
  method?: string;
  maxSize?: number;
  isMultiple?: boolean;
  api?: string;
  accept?: string;
  isShowFile?: boolean;
  validation?: (file: File, listFiles: (TFile | string)[]) => Promise<boolean>;
};
export default Props;
