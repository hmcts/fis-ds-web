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
  continue: 'Save and Continue',
  serviceName: 'Contact Details',
  homePhoneLabel: 'What is the home phone number of the person named on the application?',
  mobilePhoneLabel: 'What is the mobile phone number of the person named on the application?',
  homePhoneHint: 'Home Phone',
  mobilePhoneHint: 'Mobile Phone',
  homePhone: 'Enter home phone number',
  mobilePhone: 'Enter mobile phone number',
  errors: {
    mobilePhoneNumber: {
      required: 'Please enter correct mobile phone number',
      invalid: 'Please enter correct mobile phone number',
      atleastOneRequired: 'Mobile phone number is empty, please fill up at least one contact',
    },
    homePhoneNumber: {
      required: 'Please enter correct home phone number',
      invalid: 'Please enter correct home phone number',
      atleastOneRequired: 'Home phone number is empty, please fill up at least one contact',
    },
  },
};

const cyContent = {
  continue: 'Save and Continue (Welsh)',
  serviceName: 'Contact Details (Welsh)',
  homePhoneLabel: 'What is the home phone number of the person named on the application? (Welsh)',
  mobilePhoneLabel: 'What is the mobile phone number of the person named on the application? (Welsh)',
  homePhoneHint: 'Home Phone (Welsh)',
  mobilePhoneHint: 'Mobile Phone (Welsh)',
  homePhone: 'Enter home phone number (Welsh)',
  mobilePhone: 'Enter mobile phone number (Welsh)',
  errors: {
    mobilePhoneNumber: {
      required: 'Please enter correct mobile phone number (Welsh)',
      invalid: 'Please enter correct mobile phone number (Welsh)',
      atleastOneRequired: 'Mobile phone number is empty, please fill up at least one contact (Welsh)',
    },
    homePhoneNumber: {
      required: 'Please enter correct home phone number (Welsh)',
      invalid: 'Please enter correct home phone number (Welsh)',
      atleastOneRequired: 'Home phone number is empty, please fill up at least one contact (Welsh)',
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
  /* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as Function)(generateContent({ ...commonContent, language: EN }))).toBe(
      'Save and Continue'
    );
  });

  test('should call validation function', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const mobilePhoneNumberOption = fields.mobilePhoneNumber as FormOptions;
    expect((mobilePhoneNumberOption.label as Function)(generatedContent)).toBe(
      'What is the mobile phone number of the person named on the application?'
    );
    expect((mobilePhoneNumberOption.validator as Function)(null, mobilePhoneNumberOption)).toBe('atleastOneRequired');
    expect((mobilePhoneNumberOption.hint as Function)(generatedContent)).toBe('Mobile Phone');
    const homePhoneNumberOption = fields.homePhoneNumber as FormOptions;
    expect((homePhoneNumberOption.label as Function)(generatedContent)).toBe(
      'What is the home phone number of the person named on the application?'
    );
    expect((homePhoneNumberOption.validator as Function)(null, homePhoneNumberOption)).toBe('atleastOneRequired');
    expect((homePhoneNumberOption.hint as Function)(generatedContent)).toBe('Home Phone');
  });
});
