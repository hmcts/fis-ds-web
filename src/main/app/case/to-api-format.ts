import { Case, Date, /**Checkbox**/ formFieldsToCaseMapping, formatCase } from './case';
import { CaseData /**YesOrNo**/ } from './definition';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

/**
 * 
 * @param value 
 * @returns 
 * 
 * const checkboxConverter = (value: string | undefined) => {
  if (value === null) {
    return null;
  }

  return value === Checkbox.Checked ? YesOrNo.YES : YesOrNo.NO;
};
 */

/***Still need to be refactored */
const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,

  applicantFirstName: data => ({
    applicantFirstName: toApiDate(data.applicantFirstName),
  }),

  applicantDateOfBirth: data => ({
    applicantDateOfBirth: toApiDate(data.applicantDateOfBirth),
  }),
};

export const toApiDate = (date: Date): string => {
  return date;
};

/**
 * 
 * @param properties 
 * @returns 
 * 
 * const setUnreachableAnswersToNull = (properties: string[]): Record<string, null> =>
  properties.reduce((arr: Record<string, null>, property: string) => ({ ...arr, [property]: null }), {});
 */

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);
