import { YesOrNo } from '../../../main/app/case/definition';

export const MockData = {
  applicant1FirstNames: 'MOCK_APPLICANT1_FIRST_NAMES',
  applicant1LastNames: 'MOCK_APPLICANT1_LAST_NAMES',
  applicant1HasOtherNames: YesOrNo.YES,
  applicant1AdditionalNames: [{ firstNames: 'MOCK_ADDITIONAL_FIRST_NAMES', lastNames: 'MOCK_ADDITIONAL_LAST_NAMES' }],
  applicant1EmailAddress: 'applicant1@email.com',
  applicant1PhoneNumber: '01234567893',
  applicant1ContactDetailsConsent: YesOrNo.YES,
  applicant1DateOfBirth: { day: '1', month: '4', year: '1990' },
  applicant1Occupation: 'MOCK_OCCUPATION',
  applicant1Address1: 'MOCK_ADDRESS_LINE_1',
  applicant1AddressTown: 'MOCK_ADDRESS_TOWN',
  applicant1AddressCounty: 'MOCK_ADDRESS_COUNTY',
  applicant1AddressPostcode: 'MOCK_ADDRESS_POSTCODE',
} as unknown as any;
