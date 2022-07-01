import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, formFieldsToCaseMapping, formatCase } from './case';
import { CaseData } from './definition';

/* Extending the dayjs library with the advancedFormat plugin. */
dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

/* Creating a new object with the keys and values swapped. */
const fields: FromApiConverters = {
  /* Creating a new object with the keys and values swapped. */
  ...invert(formFieldsToCaseMapping),
};
/**
 * It takes a CaseData object and returns a Case object
 * @param {CaseData} data - CaseData - this is the data that is returned from the API.
 */

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
