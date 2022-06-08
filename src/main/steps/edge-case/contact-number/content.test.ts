const mockIsFieldFilledIn = jest.fn();
const mockIsEmailValid = jest.fn();
const mockIsPhoneNoValid = jest.fn();

jest.mock('../../../app/form/validation', () => ({
  isFieldFilledIn: mockIsFieldFilledIn,
  isEmailValid: mockIsEmailValid,
  isPhoneNoValid: mockIsPhoneNoValid,
}));

import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
jest.mock('../../../app/form/validation');

const EN = 'en';
const CY = 'cy';
const commonContent = {
  language: EN,
} as CommonContent;

const enContent = {
  continue: 'Continue',
  serviceName: 'Contact Numbers',
  homePhoneLabel: 'What is the home phone number of the person named on the application',
  mobilePhoneLabel: 'What is the mobile phone number of the person named on the application',
  homePhoneHint: 'Home Phone',
  mobilePhoneHint: 'Mobile Phone',
  homePhone: 'Enter home phone number',
  mobilePhone: 'Enter mobile phone number',
  errors: {
    mobilePhoneNumber: {
      required: 'Please enter correct mobile phone number',
      invalid: 'Please enter correct mobile phone number',
      atleastOneRequired: 'Please either enter home or mobile phone number',
      undefined: 'undefined',
    },
    homePhoneNumber: {
      required: 'Please enter correct home phone number',
      invalid: 'Please enter correct home phone number',
      atleastOneRequired: 'Please either enter home or mobile phone number',
      undefined: 'undefined',
    },
  },
};

const cyContent = {
  continue: 'Continue (Welsh)',
  serviceName: 'Contact Numbers (Welsh)',
  homePhoneLabel: 'What is the home phone number of the person named on the application (Welsh)',
  mobilePhoneLabel: 'What is the mobile phone number of the person named on the application (Welsh)',
  homePhoneHint: 'Home Phone (Welsh)',
  mobilePhoneHint: 'Mobile Phone (Welsh)',
  homePhone: 'Enter home phone number (Welsh)',
  mobilePhone: 'Enter mobile phone number (Welsh)',
  errors: {
    mobilePhoneNumber: {
      required: 'Please either enter home or mobile phone number (Welsh)',
      invalid: 'Please either enter home or mobile phone number (Welsh)',
      atleastOneRequired: 'Please either enter home or mobile phone number (Welsh)',
      undefined: 'undefined (Welsh)',
    },
    homePhoneNumber: {
      required: 'Please enter correct home phone number (Welsh)',
      invalid: 'Please enter correct home phone number (Welsh)',
      atleastOneRequired: 'Please enter correct home phone number (Welsh)',
      undefined: 'undefined (Welsh)',
    },
  },
};

describe('contact-number-content', () => {
  test('should return correct english content', () => {
    const generatedContent = generateContent({ ...commonContent });
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.serviceName).toEqual(enContent.serviceName);
    expect(generatedContent.homePhoneLabel).toEqual(enContent.homePhoneLabel);
    expect(generatedContent.mobilePhoneLabel).toEqual(enContent.mobilePhoneLabel);
    expect(generatedContent.homePhoneHint).toEqual(enContent.homePhoneHint);
    expect(generatedContent.mobilePhoneHint).toEqual(enContent.mobilePhoneHint);
    expect(generatedContent.homePhone).toEqual(enContent.homePhone);
    expect(generatedContent.mobilePhone).toEqual(enContent.mobilePhone);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({
      ...commonContent,
      language: CY,
    });

    expect(generatedContent.continue).toEqual(cyContent.continue);
    expect(generatedContent.serviceName).toEqual(cyContent.serviceName);
    expect(generatedContent.homePhoneLabel).toEqual(cyContent.homePhoneLabel);
    expect(generatedContent.mobilePhoneLabel).toEqual(cyContent.mobilePhoneLabel);
    expect(generatedContent.homePhoneHint).toEqual(cyContent.homePhoneHint);
    expect(generatedContent.mobilePhoneHint).toEqual(cyContent.mobilePhoneHint);
    expect(generatedContent.homePhone).toEqual(cyContent.homePhone);
    expect(generatedContent.mobilePhone).toEqual(cyContent.mobilePhone);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as Function)(generateContent({ ...commonContent, language: EN }))).toBe('Continue');
  });

  test('should call validation function', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const mobilePhoneNumberOption = fields.mobilePhoneNumber as FormOptions;
    expect((mobilePhoneNumberOption.label as Function)(generatedContent)).toBe(
      'What is the mobile phone number of the person named on the application'
    );
    expect((mobilePhoneNumberOption.validator as Function)(null, mobilePhoneNumberOption)).toBe("atleastOneRequired");

    const homePhoneNumberOption = fields.homePhoneNumber as FormOptions;
    expect((homePhoneNumberOption.label as Function)(generatedContent)).toBe(
      'What is the home phone number of the person named on the application'
    );
    expect((homePhoneNumberOption.validator as Function)(null, homePhoneNumberOption)).toBe("atleastOneRequired");
  });
});
