export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  PostTown: string;
  County: string;
  PostCode: string;
  Country: string;
}

export enum ContactPreference {
  ACCOUNT_OWNER = 'ACCOUNT_OWNER',
  NAMED_PERSON = 'NAMED_PERSON',
  BOTH_RECEIVE = 'BOTH_RECEIVE',
}

export type AddressUK = Address;

export interface CaseLink {
  CaseReference: string;
}

export interface Document {
  document_url: string;
  document_filename: string;
  document_binary_url: string;
}

export type getOrCreateCaseType = {
  id: string;
};

export interface Applicant {
  applicantFirstName: string;
  applicantLastName: string;
  applicantEmailAddress: string;
  applicantDateOfBirth: DateAsString;
  applicantPhoneNumber: string;
  applicantHomeNumber: string;
  PhoneNumber: string;
  applicantAddress1: string;
  applicantAddress2: string;
  applicantAddressTown: string;
  applicantAddressCountry: string;
  applicantAddressPostCode: string;
}

export interface Application {
  applicantStatementOfTruth: YesOrNo;
}

export const enum ContactDetails {
  EMAIL = 'email',
  PHONE = 'phone',
}

export interface CaseData {
  caseID: string;
  namedApplicant: YesOrNo;
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
  applicantStatementOfTruth: YesOrNo;
}

export interface StatusHistoriesItem {
  date_updated: string;
  date_created: string;
  external_status: string;
  status: string;
  error_code: string;
  error_message: string;
}

export type DateAsString = string;

export const enum FieldType {
  Unspecified = 'Unspecified',
  Email = 'Email',
  PhoneUK = 'PhoneUK',
  Date = 'Date',
  Document = 'Document',
  Schedule = 'Schedule',
  TextArea = 'TextArea',
  FixedList = 'FixedList',
  FixedRadioList = 'FixedRadioList',
  YesOrNo = 'YesOrNo',
  Address = 'Address',
  CaseLink = 'CaseLink',
  OrderSummary = 'OrderSummary',
  MultiSelectList = 'MultiSelectList',
  Collection = 'Collection',
  Label = 'Label',
}

export const enum YesOrNo {
  YES = 'Yes',
  NO = 'No',
}

export const enum YesNoNotsure {
  YES = 'Yes',
  NO = 'No',
  NOT_SURE = 'NotSure',
}

export const enum LanguagePreference {
  ENGLISH = 'ENGLISH',
  WELSH = 'WELSH',
}

export const enum EmailAddress {
  EMAIL_ADDRESS = 'em',
}
export const CITIZEN_UPDATE = 'citizen-update-application';
export const CITIZEN_CREATE = 'citizen-create-application';
