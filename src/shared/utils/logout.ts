import { serviceFetch } from '@/core/services';
import { C_API, C_LINK } from '../constants';

/**
 * Logout form system.
 */
export const logout = async () => {
  await serviceFetch.post({ url: C_API.BaseLogout, values: {}, showMessage: false });
  window.location.href = C_LINK.AuthLogin;
};
