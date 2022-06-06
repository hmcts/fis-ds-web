import { Case, /**Checkbox**/ formFieldsToCaseMapping, formatCase } from './case';
import { CaseData /**YesOrNo**/ } from './definition';

export type OrNull<T> = { [K in keyof T]: T[K] | null };

type ToApiConverters = Partial<Record<keyof Case, string | ((data: Case) => OrNull<Partial<CaseData>>)>>;


const fields: ToApiConverters = {
  ...formFieldsToCaseMapping,

  applicantDateOfBirth: data => ({
    applicantDateOfBirth: toApiDate(data.applicantDateOfBirth),
  }),
};

export const toApiDate = (date: any): string => {
  return date;
};


export const toApiFormat = (data: Partial<Case>): CaseData => formatCase(fields, data);