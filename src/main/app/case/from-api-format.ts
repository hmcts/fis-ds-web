import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import { invert } from 'lodash';

import { Case, /**Checkbox*/ formFieldsToCaseMapping, formatCase } from './case';
import { CaseData /**YesOrNo*/ } from './definition';

dayjs.extend(advancedFormat);

type FromApiConverters = Partial<Record<keyof CaseData, string | ((data: Partial<CaseData>) => Partial<Case>)>>;

/**
 * const checkboxConverter = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }
    return value === YesOrNo.YES ? Checkbox.Checked : Checkbox.Unchecked;
};
 */

const fields: FromApiConverters = {
  ...invert(formFieldsToCaseMapping),

  /**
   *   applicant1StatementOfTruth: data => ({
    applicant1IBelieveApplicationIsTrue: checkboxConverter(data.applicant1StatementOfTruth),
  }),

   */
};

/**
 * 
 * @param date 
 * @returns 
 * 
 * const fromApiDate = date => {
  if (!date) {
    return;
  }

  const [y, m, d] = date.split('-');
  return { year: `${+y}`, month: `${+m}`, day: `${+d}` };
};

 */

export const fromApiFormat = (data: CaseData): Case => formatCase(fields, data);
