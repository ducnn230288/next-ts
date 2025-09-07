'use client';
import { useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/core/lib/i18n/navigation';
import { useAppSelector } from '@/core/stores';
import { Icon, Menu } from '@/shared/components/atoms';
import { C_LINK } from '@/shared/constants';
import { EIcon, EPermissions } from '@/shared/enums';
import { checkPermission } from '@/shared/utils/check-permission';
import './style.scss';

const Component = () => {
  const t = useTranslations('Main/Sidebar');
  const pathname = usePathname();
  const router = useRouter();

  const fnMenuClick = (value: string) => {
    if (pathname !== value) {
      router.push(value);
    }
  };

  const user = useAppSelector(state => state.user);

  const menus = [
    {
      value: C_LINK.Example,
      label: 'Dashboard',
      icon: EIcon.Dashboard,
      isActive: pathname === C_LINK.Example,
      onClick: () => fnMenuClick(C_LINK.Example),
    },
    checkPermission(user, EPermissions.USER_VIEW_LIST) && {
      value: C_LINK.Users,
      label: 'Users',
      icon: EIcon.Users,
      isActive: pathname.includes(C_LINK.Users),
      onClick: () => fnMenuClick(C_LINK.Users),
    },
  ].filter(item => !!item);

  return (
    <aside className="main-sidebar" aria-label={t('Sidebar')}>
      <div className="logo">
        <button>
          <Icon name={EIcon.Logo} />
          <h1>{t('AppName')}</h1>
        </button>
      </div>
      <Menu isTree={true} options={menus} translate={t} />
    </aside>
  );
};
export default Component;
