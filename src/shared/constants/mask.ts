import dayjs from 'dayjs';
import IMask from 'imask';

import type { TMask } from '../types';

export const C_MASK = {
  date: () =>
    ({
      mask: Date,
      pattern: dayjs.localeData().longDateFormat('L'),
      lazy: false,
      // min: new Date(1970, 0, 1),
      // max: new Date(2030, 0, 1),

      format: date => dayjs(date).format('L'),
      parse: str => dayjs(str, dayjs.localeData().longDateFormat('L')),

      blocks: {
        YYYY: {
          mask: IMask.MaskedRange,
          from: 1970,
          to: 2040,
        },
        MM: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 12,
        },
        DD: {
          mask: IMask.MaskedRange,
          from: 1,
          to: 31,
        },
        HH: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 23,
        },
        mm: {
          mask: IMask.MaskedRange,
          from: 0,
          to: 59,
        },
      },
    }) as TMask,
  number: () => ({ mask: Number, normalizeZeros: true, radix: '.' }),
};
