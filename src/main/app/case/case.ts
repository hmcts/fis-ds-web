import { AnyObject } from '../controller/PostController';

import { CaseData } from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
/**
 *   namedApplicant: 'namedApplicant',
  applicantFirstName:'applicantFirstName',
  applicantLastName: 'applicantLastName',
  applicantDateOfBirth: 'applicantDateOfBirth',
  applicantEmailAddress: 'applicantEmailAddress',
  applicantPhoneNumber: 'applicantPhoneNumber',
  applicantHomeNumber: 'applicantHomeNumber',
  applicantAddress1: 'applicantAddress1',
  applicantAddress2: 'applicantAddress2',
  applicantAddressTown: 'applicantAddressTown',
  applicantAddressCountry: 'applicantAddressCountry',
  applicantAddressPostCode: 'applicantAddressPostCode'
 */
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};
  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }
  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;




/***@caseData */
export interface Case {
  /*********All information related to the Case */
  namedApplicant: boolean;
  applicantFirstName: string;
  applicantLastName: string;
  applicantDateOfBirth: string;
  applicantEmailAddress: string;
  applicantPhoneNumber: string;
  applicantHomeNumber: string;
  applicantAddress1: string;
  applicantAddress2: string;
  applicantAddressTown: string;
  applicantAddressCountry: any;
  applicantAddressPostCode: any;
}

export interface CaseWithId extends Case {
  id: string;
  state: any;
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export type Date = string;

export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

export interface UploadedFile {
  id: string;
  name: string;
}

export enum FieldPrefix {
  APPLICANT1 = 'applicant1',
  APPLICANT = 'applicant',
  APPLICANT2 = 'applicant2',
  CHILDREN = 'children',
  BIRTH_FATHER = 'birthFather',
  BIRTH_MOTHER = 'birthMother',
  OTHER_PARENT = 'otherParent',
}