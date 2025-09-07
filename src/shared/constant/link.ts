import dashboard from '@/app/[locale]/(main)/(dashboard)/.constant';
import user from '@/app/[locale]/(main)/user/.constant';
import login from '@/app/[locale]/auth/login/.constant';

export const C_LINK = {
  ...login.LINK,
  ...dashboard.LINK,
  ...user.LINK,
};
