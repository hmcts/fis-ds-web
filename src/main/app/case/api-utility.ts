import { CaseDate, CaseWithId } from './case';
import {
  Document,
  TYPE_OF_APPLICATION,
  CASE_TYPE_OF_APPLICATION,
  YesOrNo,
  ContactPreference,
  CaseData,
  PartyDetails,
  DocumentReference,
} from './definition';
import { toApiDate, toDate } from './to-api-format';
import { State } from './CaseApi';
import _ from 'lodash';

export const prepareCaseRequestData = (userCase: CaseWithId): CreateCaseRequest => {
  return {
    edgeCaseTypeOfApplication: userCase.edgeCaseTypeOfApplication,
    applicantCaseName: `${userCase.applicantFirstName} ${userCase.applicantLastName}`,
    caseTypeOfApplication: [TYPE_OF_APPLICATION.FGM, TYPE_OF_APPLICATION.FMPO].includes(
      userCase.edgeCaseTypeOfApplication
    )
      ? CASE_TYPE_OF_APPLICATION.FL401
      : CASE_TYPE_OF_APPLICATION.C100,
  };
};

export const mapCreateCaseResponseData = (response: CaseData): CreateCaseResponse => {
  return {
    id: response.id,
    state: response.state,
    caseTypeOfApplication: response.caseTypeOfApplication,
    edgeCaseTypeOfApplication: response.edgeCaseTypeOfApplication,
    applicantCaseName: response.applicantCaseName,
    lastModifiedDate: response.lastModifiedDate,
    caseCreatedBy: response.caseCreatedBy,
  };
};

export const prepareUpdateCaseRequestData = (userCase: CaseWithId): UpdateCaseRequest => {
  return {
    edgeCaseTypeOfApplication: userCase?.edgeCaseTypeOfApplication,
    namedApplicant: userCase?.namedApplicant,
    caseTypeOfApplication: userCase?.caseTypeOfApplication,
    applicantFirstName: userCase?.applicantFirstName,
    applicantLastName: userCase?.applicantLastName,
    applicantDateOfBirth: toApiDate(userCase?.applicantDateOfBirth),
    applicantContactPreference: userCase?.contactPreferenceType,
    applicantEmailAddress: userCase?.applicantEmailAddress,
    applicantPhoneNumber: userCase?.applicantPhoneNumber,
    applicantHomeNumber: userCase?.applicantHomeNumber,
    applicantAddress1: userCase?.applicantAddress1,
    applicantAddress2: userCase?.applicantAddress2,
    applicantAddressTown: userCase?.applicantAddressTown,
    applicantAddressCountry: 'United Kingdom',
    applicantAddressPostcode: userCase?.applicantAddressPostcode,
    selectedCourt: userCase?.selectedCourt,
    applicantApplicationFormDocuments: userCase?.applicantApplicationFormDocuments ?? [],
    applicantAdditionalDocuments: userCase?.applicantAdditionalDocuments ?? [],
    applicantStatementOfTruth: userCase?.applicantStatementOfTruth,
    paymentServiceRequestReferenceNumber: userCase?.paymentDetails?.serviceRequestReference,
    paymentReferenceNumber: userCase?.paymentDetails?.payment_reference,
  };
};

export const mapUpdateCaseResponseData = (response: CaseData): UpdateCaseResponse => {
  const partyDetails = _.get(response, 'applicants[0].value', {}) as PartyDetails;

  return {
    ...mapCreateCaseResponseData(response),
    applicantFirstName: partyDetails?.firstName,
    applicantLastName: partyDetails?.lastName,
    applicantDateOfBirth: toDate(partyDetails?.dateOfBirth),
    applicantEmailAddress: partyDetails?.email,
    applicantPhoneNumber: partyDetails?.phoneNumber,
    applicantAddress1: partyDetails?.address?.AddressLine1,
    applicantAddress2: partyDetails?.address?.AddressLine2,
    applicantAddressTown: partyDetails?.address?.PostTown,
    applicantAddressCountry: partyDetails?.address?.Country,
    applicantAddressPostcode: partyDetails?.address?.PostCode,
    applicantApplicationFormDocuments: response.dssUploadedDocuments.map((document: DocumentReference) => ({
      ...document.value,
    })),
    applicantAdditionalDocuments: response.dssUploadedAdditionalDocuments.map((document: DocumentReference) => ({
      ...document.value,
    })),
    caseDocuments: [
      {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/ed798bd9-16a2-41e0-b2a8-f2c1aa25395a',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/ed798bd9-16a2-41e0-b2a8-f2c1aa25395a/binary',
        document_filename: 'Test email.docx',
      },
    ],
    AddtionalCaseDocuments: [
      {
        document_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/ed798bd9-16a2-41e0-b2a8-f2c1aa25395a',
        document_binary_url:
          'http://dm-store-aat.service.core-compute-aat.internal/documents/ed798bd9-16a2-41e0-b2a8-f2c1aa25395a/binary',
        document_filename: 'Test email additional.docx',
      },
    ],
  };
};

export type CreateCaseRequest = {
  edgeCaseTypeOfApplication: TYPE_OF_APPLICATION;
  applicantCaseName: string;
  caseTypeOfApplication: CASE_TYPE_OF_APPLICATION;
};

export interface CreateCaseResponse {
  id: string;
  caseTypeOfApplication: CASE_TYPE_OF_APPLICATION;
  edgeCaseTypeOfApplication: TYPE_OF_APPLICATION;
  state: State;
  applicantCaseName: string;
  lastModifiedDate: string;
  caseCreatedBy: string;
}

export interface UpdateCaseRequest {
  edgeCaseTypeOfApplication: TYPE_OF_APPLICATION;
  caseTypeOfApplication: CASE_TYPE_OF_APPLICATION;
  namedApplicant: YesOrNo;
  applicantFirstName: string;
  applicantLastName: string;
  applicantDateOfBirth: string;
  applicantContactPreference: ContactPreference;
  applicantEmailAddress: string;
  applicantPhoneNumber: string;
  applicantHomeNumber: string;
  applicantAddress1: string;
  applicantAddress2: string;
  applicantAddressTown: string;
  applicantAddressCountry: string;
  applicantAddressPostcode: string;
  selectedCourt?: { value: string; text: string };
  applicantApplicationFormDocuments: Document[] | [];
  applicantAdditionalDocuments: Document[] | [];
  paymentServiceRequestReferenceNumber?: string;
  paymentReferenceNumber?: string;
  helpWithFeesReferenceNumber?: string;
  hwfPaymentSelection?: YesOrNo;
  applicantStatementOfTruth?: YesOrNo;
}

export interface UpdateCaseResponse extends CreateCaseResponse {
  applicantFirstName: string;
  applicantLastName: string;
  applicantDateOfBirth: CaseDate;
  applicantEmailAddress: string;
  applicantPhoneNumber: string;
  applicantAddress1: string;
  applicantAddress2: string;
  applicantAddressTown: string;
  applicantAddressCountry: string;
  applicantAddressPostcode: string;
  applicantApplicationFormDocuments: Document[];
  applicantAdditionalDocuments: Document[];
  caseDocuments: Document[];
  AddtionalCaseDocuments: Document[];
}
