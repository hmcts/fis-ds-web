const mockIsFieldFilledIn = jest.fn();
const mockIsEmailValid = jest.fn();
const mockIsPhoneNoValid = jest.fn();

jest.mock('../../../app/form/validation', () => ({
  isFieldFilledIn: mockIsFieldFilledIn,
  isEmailValid: mockIsEmailValid,
  isPhoneNoValid: mockIsPhoneNoValid,
}));

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import { YesOrNo } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
} as CommonContent;

const enContent = {
  label: 'What are your contact details?',
  one: 'I can provide an email address',
  two: 'I can not provide an email address',
  emailAddress: 'Your email address',
  homePhoneNumber: 'Your home phone',
  mobilePhoneNumber: 'Your mobile phone',
  errors: {
    emailAddressConsent: {
      required: 'Please answer the question',
    },
    emailAddress: {
      required: 'Enter your email address',
      invalid: 'Enter a real email address',
    },
    homePhoneNumber: {
      required: 'Enter your home phone number',
      invalid: 'Enter a real home phone number',
    },
    mobilePhoneNumber: {
      required: 'Enter your mobile number',
      invalid: 'Enter a real UK mobile number',
      atleastOneRequired: 'Enter atleast one contact detail out of email, home or mobile phone number',
    },
  },
};

const cyContent = {
  label: 'What are your contact details? (in welsh)',
  one: 'I can provide an email address (in welsh)',
  two: 'I can not provide an email address (in welsh)',
  emailAddress: 'Your email address (in welsh)',
  homePhoneNumber: 'Your home phone (in welsh)',
  mobilePhoneNumber: 'Your mobile phone (in welsh)',
  errors: {
    emailAddressConsent: {
      required: 'Please answer the question (in welsh)',
    },
    emailAddress: {
      required: 'Enter your email address (in welsh)',
      invalid: 'Enter a real email address (in welsh)',
    },
    homePhoneNumber: {
      required: 'Enter your home phone number (in welsh)',
      invalid: 'Enter a real home phone number (in welsh)',
    },
    mobilePhoneNumber: {
      required: 'Enter your mobile number (in welsh)',
      invalid: 'Enter a real UK mobile number (in welsh)',
      atleastOneRequired: 'Enter atleast one contact detail out of email, home or mobile phone number (in welsh)',
    },
  },
};

describe('applicant > contact-details-content', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });

    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.one).toEqual(enContent.one);
    expect(generatedContent.two).toEqual(enContent.two);
    expect(generatedContent.emailAddress).toEqual(enContent.emailAddress);
    expect(generatedContent.homePhoneNumber).toEqual(enContent.homePhoneNumber);
    expect(generatedContent.mobilePhoneNumber).toEqual(enContent.mobilePhoneNumber);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.one).toEqual(cyContent.one);
    expect(generatedContent.two).toEqual(cyContent.two);
    expect(generatedContent.emailAddress).toEqual(cyContent.emailAddress);
    expect(generatedContent.homePhoneNumber).toEqual(cyContent.homePhoneNumber);
    expect(generatedContent.mobilePhoneNumber).toEqual(cyContent.mobilePhoneNumber);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain applicantContactDetails field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const emailAddressConsentField = fields.emailAddressConsent as FormFields;
    const homePhoneNumberField = fields.homePhoneNumber as FormFields;
    const mobilePhoneNumberField = fields.mobilePhoneNumber as FormFields;

    expect(emailAddressConsentField.type).toBe('radios');
    expect(emailAddressConsentField.classes).toBe('govuk-radios');
    expect((emailAddressConsentField.label as Function)(generatedContent)).toBe('What are your contact details?');
    const emailAddressConsentOptions = fields.emailAddressConsent as FormOptions;
    expect((emailAddressConsentOptions.values[0].label as Function)({ one: 'Yes' })).toBe(YesOrNo.YES);
    expect((emailAddressConsentOptions.values[1].label as Function)({ two: 'No' })).toBe(YesOrNo.NO);
    expect(emailAddressConsentOptions.validator as Function).toBe(isFieldFilledIn);

    expect((emailAddressConsentOptions.values[0].subFields!.emailAddress.label as Function)(generatedContent)).toBe(
      'Your email address'
    );
    expect((emailAddressConsentOptions.values[0].subFields!.emailAddress.validator as Function)('test@gmail.com')).toBe(
      undefined
    );

    expect(homePhoneNumberField.type).toBe('text');
    expect(homePhoneNumberField.classes).toBe('govuk-input--width-20');
    expect((homePhoneNumberField.label as Function)(generatedContent)).toBe('Your home phone');
    expect(homePhoneNumberField.labelSize).toBe(null);
    expect((homePhoneNumberField.validator as Function)('0999999999')).toBe(undefined);

    expect(mobilePhoneNumberField.type).toBe('text');
    expect(mobilePhoneNumberField.classes).toBe('govuk-input--width-20');
    expect((mobilePhoneNumberField.label as Function)(generatedContent)).toBe('Your mobile phone');
    expect(mobilePhoneNumberField.labelSize).toBe(null);
    expect((mobilePhoneNumberField.validator as Function)('0999999999', {})).toBe(undefined);
    expect((mobilePhoneNumberField.validator as Function)('', {})).not.toBe('atleastOneRequired');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Continue');
  });

  test('should contain cancel button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.cancel!.text as Function)(generatePageContent({ language: EN }))).toBe('Cancel');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
