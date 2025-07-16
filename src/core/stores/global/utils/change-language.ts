import dayjs from 'dayjs';

import { C_Dayjs } from '@/shared/constants';

/**
 * Change the language and sets the locale and localeDate accordingly.
 */
const changeLanguage = (language: string) => {
  switch (language) {
    case 'en':
      dayjs.locale(C_Dayjs.EN);
      break;
    case 'vi':
      dayjs.locale(C_Dayjs.VI);
      break;
    case 'ja':
      dayjs.locale(C_Dayjs.JA);
      break;
  }
};
export default changeLanguage;
