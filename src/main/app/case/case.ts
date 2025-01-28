import { AnyObject } from '../controller/PostController';

import {
  CASE_TYPE_OF_APPLICATION,
  CaseData,
  ContactPreference,
  Document,
  TYPE_OF_APPLICATION,
  YesOrNo,
} from './definition';

export const formFieldsToCaseMapping: Partial<Record<keyof Case, keyof CaseData>> = {};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};
  for (const field of Object.keys(data as Record<string, any>)) {
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

export interface CaseWithId extends Case {
  id: string;
  state: any;
  paymentDetails?: {
    payment_reference: string;
    date_created: string;
    external_reference: string;
    next_url: string;
    status: string;
    serviceRequestReference: string;
  };
  paymentSuccessDetails?: {
    amount: string;
    reference: string;
    ccd_case_number: string;
    case_reference: string;
    channel: string;
    method: string;
    status: string;
    external_reference: string;
    payment_group_reference: string;
  };
}

export interface CaseWithDocuments {
  addtionalDocuments: any;
  uploadedDocuments: any;
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

export interface Case {
  id: string;
  caseTypeOfApplication: CASE_TYPE_OF_APPLICATION;
  edgeCaseTypeOfApplication: TYPE_OF_APPLICATION;
  namedApplicant: YesOrNo;
  contactPreferenceType: ContactPreference;
  applicantFirstName: string;
  applicantLastName: string;
  applicantDateOfBirth: CaseDate;
  applicantEmailAddress: string;
  applicantPhoneNumber: string;
  applicantHomeNumber: string;
  applicantAddress1: string;
  applicantAddress2: string;
  applicantAddressTown: string;
  applicantAddressCountry: string;
  applicantAddressPostcode: string;
  availableCourts: { id: string; name: string }[];
  selectedCourtId: string;
  hwfPaymentSelection: YesOrNo;
  helpWithFeesReferenceNumber?: string;
  applicantStatementOfTruth: YesOrNo;
  applicationFee: string;
  applicantApplicationFormDocuments: Document[];
  applicantAdditionalDocuments: Document[];
}
