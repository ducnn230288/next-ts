// import dayjs from 'dayjs';
// import i18n from 'i18next';

// import { C_Locale } from '@/shared/constants';

// /**
//  * Change the language and sets the locale and localeDate accordingly.
//  */
// export default (language: string) => {
//   switch (language) {
//     case 'en':
//       dayjs.locale(C_Locale.Dayjs.EN);
//       break;
//     case 'vi':
//       dayjs.locale(C_Locale.Dayjs.VI);
//       break;
//     case 'ja':
//       dayjs.locale(C_Locale.Dayjs.JA);
//       break;
//   }
//   localStorage.setItem('i18nextLng', language);
//   document.querySelector('html')?.setAttribute('lang', language);
//   i18n.changeLanguage(language);
//   location.hash = '#/' + language + '/' + location.hash.split('/').slice(2).join('/');
// };
