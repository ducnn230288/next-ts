import user from '@/app/[locale]/(main)/user/.constant';
import login from '@/app/[locale]/auth/login/.constant';

export const C_API = {
  UsersCSRFToken: '/v1/users/csrf-token/',
  UsersLogout: '/v1/users/logout/',
  UsersMe: '/v1/users/me/',
  ...login.API,
  ...user.API,
};
