import { serviceFetch } from '@/core/service';
import { C_API, C_LINK, IS_LOGGED_IN } from '../constant';

/**
 * Logout form system.
 */
export const logout = async () => {
  const isLoggedIn = localStorage.getItem(IS_LOGGED_IN);
  if (isLoggedIn === 'true') {
    localStorage.setItem(IS_LOGGED_IN, 'false');
    await serviceFetch.post({ url: C_API.UsersLogout, values: {}, isShowMessage: false });
  }
  window.location.href = C_LINK.AuthLogin;
};
