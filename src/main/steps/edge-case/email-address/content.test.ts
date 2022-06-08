import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { EmailAddress } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  continue: 'Continue',
  serviceName: 'Email Address',
  label: 'What is the email address of the person named on the application?',
  hint: 'Email Address',
  emailAddress: 'Insert email address',
};

const cyContent = {
  continue: 'Continue (Welsh)',
  serviceName: 'Email Address (Welsh)',
  label: 'What is the email address of the person named on the application? (Welsh)',
  hint: 'Email Address',
  emailAddress: 'Insert email address (Welsh)',
};

const commonContent = { language: EN } as CommonContent;
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('Email Address', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });
  it('should have an email input text field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const emailAddress = fields.emailAddress;
    expect(emailAddress.classes).toBe('govuk-input');
    expect((emailAddress.label as Function)(generatedContent)).toBe(
      'What is the email address of the person named on the application?'
    );
    expect((emailAddress.hint as Function)(generatedContent)).toBe('Email Address');
    expect(emailAddress.type).toBe('text');

    const emailAddressOptions = fields.emailAddress as FormOptions;
    expect(emailAddressOptions.values[0].value).toBe(EmailAddress.EMAIL_ADDRESS);
    expect((emailAddressOptions.values[0].label as Function)(generatedContent)).toBe('Insert email address');
    expect((emailAddressOptions.validator as Function)('test@gmail.com')).toBe(undefined);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as Function)(generateContent({ ...commonContent, language: EN }))).toBe('Continue');
  });
});
