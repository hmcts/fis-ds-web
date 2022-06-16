import dayjs from 'dayjs';
import 'dayjs/locale/cy';

import { CaseDate } from '../../../app/case/case';
import { isDateInputInvalid } from '../../form/validation';

export const getFormattedDate = (date: CaseDate | undefined, locale = 'en'): string =>
  date && !isDateInputInvalid(date)
    ? dayjs(`${date.day}-${date.month}-${date.year}`, 'D-M-YYYY').locale(locale).format('D MMMM YYYY')
    : '';
