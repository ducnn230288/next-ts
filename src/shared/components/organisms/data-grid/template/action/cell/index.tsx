import type { CellContext } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';

import { serviceMessage } from '@/core/service';
import { Icon } from '@/shared/components/atoms';
import { Dropdown } from '@/shared/components/molecules';
import { EIcon, EPlacement } from '@/shared/enum';
import type Props from '../../../type';

const ActionCell = <TData,>({
  row,
  action,
}: CellContext<TData, unknown> & Pick<Props<TData>, 'action'>) => {
  const t = useTranslations('Components');
  const data = row.original;

  const options = [
    {
      label: 'Detail',
      value: 'Detail',
      icon: EIcon.Eye,
      onClick: () => action?.onDetail?.(data),
    },
    {
      label: 'Edit',
      value: 'Edit',
      icon: EIcon.Edit,
      onClick: () => action?.onEdit?.(data),
    },
    {
      label: 'Delete',
      value: 'Delete',
      icon: EIcon.Trash,
      onClick: () =>
        serviceMessage.warning({
          content: t('AreYouSureWantDelete', {
            name: action?.name(data) as string,
            label: action?.label.toLowerCase() as string,
          }),
          onOk: () => action?.onDelete?.(data),
        }),
    },
    ...(action?.renderMore?.(data).filter(item => !!item) ?? []),
  ].filter(
    menu =>
      (menu.value === 'Detail' && action?.onDetail) ||
      (menu.value === 'Edit' && action?.onEdit) ||
      (menu.value === 'Delete' && action?.onDelete) ||
      !['Detail', 'Edit', 'Delete'].includes(menu.value),
  );

  return (
    options.length > 0 && (
      <Dropdown
        isWidthFull={false}
        placement={EPlacement.BottomEnd}
        classContainer="h-6 items-center"
        options={options}
        translate={t}>
        <button title={t('Action')}>
          <Icon name={EIcon.Dots} className="size-4" />
        </button>
      </Dropdown>
    )
  );
};

export default ActionCell;
