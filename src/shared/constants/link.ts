import dashboard from '@/app/[locale]/(main)/(dashboard)/.constants';
import user from '@/app/[locale]/(main)/users/.constants';
import login from '@/app/[locale]/auth/login/.constants';

export const C_LINK = {
  ...login.LINK,
  ...dashboard.LINK,
  ...user.LINK,
};
