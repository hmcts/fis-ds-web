import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import {
  generateContent as generateManualAddressContent,
  form as manualAddressForm,
} from '../../../common/components/address-manual';

import { generateContent } from './content';

const enContent = {
  section: 'Applicant',
  title: "What's your address?",
};

const cyContent = {
  section: 'Applicant (in welsh)',
  title: "What's your address? (in welsh)",
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('applicant1 > address > manual > content', () => {
  const commonContent = { language: 'en' } as CommonContent;
  let generatedContent;
  let form;
  let fields;
  const manualAddressFormFields = manualAddressForm.fields as FormFields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    const manualAddressContent = generateManualAddressContent(commonContent);
    expect(generatedContent.section).toEqual(enContent.section);
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual({
      applicantAddress1: (manualAddressContent.errors as any).address1,
      applicantAddressTown: (manualAddressContent.errors as any).addressTown,
      applicantAddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
  });

  test('should return correct welsh content', () => {
    const manualAddressContent = generateManualAddressContent({ ...commonContent, language: 'cy' });
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.section).toEqual(cyContent.section);
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual({
      applicantAddress1: (manualAddressContent.errors as any).address1,
      applicantAddressTown: (manualAddressContent.errors as any).addressTown,
      applicantAddressPostcode: (manualAddressContent.errors as any).addressPostcode,
    });
  });

  test('should contain applicantAddress1 field', () => {
    const applicant1Address1Field = fields.applicantAddress1 as FormOptions;
    expect(applicant1Address1Field).toEqual(manualAddressFormFields.address1);
  });

  test('should contain applicantAddress2 field', () => {
    const applicant1Address2Field = fields.applicantAddress2 as FormOptions;
    expect(applicant1Address2Field).toEqual(manualAddressFormFields.address2);
  });

  test('should contain applicantAddressTown field', () => {
    const applicant1AddressTownField = fields.applicantAddressTown as FormOptions;
    expect(applicant1AddressTownField).toEqual(manualAddressFormFields.addressTown);
  });

  test('should contain applicantAddressCounty field', () => {
    const applicant1AddressCountyField = fields.applicantAddressCounty as FormOptions;
    expect(applicant1AddressCountyField).toEqual(manualAddressFormFields.addressCounty);
  });

  test('should contain applicantAddressPostcode field', () => {
    const applicantAddressPostcodeField = fields.applicantAddressPostcode as FormOptions;
    expect(applicantAddressPostcodeField).toEqual(manualAddressFormFields.addressPostcode);
  });

  it('should have applicantAddressPostcode label when language: en and  applyingWith: alone', () => {
    const commonContent1 = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Applicant');
  });

  it('should have an applicantAddressPostcode label when language: cy and  applyingWith: alone', () => {
    const commonContent1 = { language: 'cy', userCase: { applyingWith: 'alone' } } as CommonContent;

    const generatedContent1 = generateContent(commonContent1);
    expect(generatedContent1.section).toBe('Applicant (in welsh)');
  });

  test('should contain submit button', () => {
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
