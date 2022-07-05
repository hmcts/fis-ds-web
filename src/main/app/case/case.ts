import { AnyObject } from '../controller/PostController';

import { CaseData, YesOrNo } from './definition';

/* Defining a mapping between the Case object and the CaseData object. */
export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {
  applicantDateOfBirth: 'applicantDateOfBirth',
};

/**
 * It takes an object of functions and an object of data, and returns an object of data
 * @param {FieldFormats} fields - FieldFormats - This is the object that contains the field names and
 * the functions that will be used to format the data.
 * @param {InputFormat} data - The data to be formatted.
 * @returns An object with the same keys as the input object, but with the values transformed by the
 * functions in the fields object.
 */
export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};
  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      /* Assigning the value of the data[field] to the result[value]. */
      result[value] = data[field];
    }
  }
  /* Casting the result to the type of the output. */
  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

/***@caseData */
/* Defining the interface of the Case object. */
export interface Case {
  /*********All information related to the Case */
  namedApplicant: YesOrNo;
  caseTypeOfApplication: string;
  applicantFirstName: string;
  applicantLastName: string;
  applicantDateOfBirth: CaseDate;
  applicantEmailAddress: string;
  applicantPhoneNumber: string;
  applicantHomeNumber: string;
  applicantAddress1: string;
  applicantAddress2: string;
  applicantAddressTown: string;
  applicantAddressCountry: any;
  applicantAddressPostcode: any;
  applicantStatementOfTruth: string;
}

/* Extending the Case interface with the id and state properties. */
export interface CaseWithId extends Case {
  id: string;
  state: any;
}

/* Defining the interface of the CaseWithDocuments object. */
export interface CaseWithDocuments {
  addtionalDocuments: any;
  uploadedDocuments: any;
}

/* Defining the values that the checkbox can have. */
export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}
/* Defining the interface of the CaseDate object. */

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export type Date = string;

/* Defining the values that the language preference can have. */
export enum LanguagePreference {
  English = 'english',
  Welsh = 'welsh',
}

/* Defining the interface of the UploadedFile object. */
export interface UploadedFile {
  id: string;
  name: string;
}

/* Defining the prefixes that will be used in the form fields. */
export enum FieldPrefix {
  APPLICANT = 'applicant',
}
