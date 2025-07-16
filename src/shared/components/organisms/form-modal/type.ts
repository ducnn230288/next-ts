import type { TFieldForm, TForm } from '@/shared/types';

type Props<T> = {
  readonly title?: string;
  readonly fields: TFieldForm<T>[];
  readonly textSubmit?: string;
  readonly textCancel?: string;
  readonly className?: string;
  readonly footerCustom?: React.JSX.Element;
  readonly handleSubmit: (props: { value?: T; formApi: TForm<T> }) => void;
  readonly handleCancel?: () => void;
  readonly isOpen?: boolean;
  readonly isLoading?: boolean;
  readonly values?: T;
  readonly translate: (key: string, options?: Record<string, string>) => string;
};
export default Props;
