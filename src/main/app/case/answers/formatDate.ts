import dayjs from 'dayjs';
import 'dayjs/locale/cy';
import { isEmpty } from 'lodash';

import { CaseDate } from '../../../app/case/case';
import { isDateInputInvalid } from '../../form/validation';

export const getFormattedDate = (date: CaseDate | undefined, locale = 'en'): string =>
  date && !isEmpty(date.day) &&  !isEmpty(date.month) && !isEmpty(date.year) && !isDateInputInvalid(date)
    ? dayjs(`${date.day}-${date.month}-${date.year}`, 'D-M-YYYY').locale(locale).format('D MMMM YYYY')
    : '';
