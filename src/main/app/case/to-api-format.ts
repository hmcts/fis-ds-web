import { Case, CaseDate, /**Checkbox**/ formFieldsToCaseMapping, formatCase } from './case';
import { CaseData /**YesOrNo**/ } from './definition';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;

export const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,

  applicantDateOfBirth: data => ({
    applicantDateOfBirth: toApiDate(data.applicantDateOfBirth),
  }),
};

export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);

export const toApiDate = (date: CaseDate | any | undefined): string => {
  if (!date?.year || !date?.month || !date?.day) {
    return '';
  }
  return date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');
};
