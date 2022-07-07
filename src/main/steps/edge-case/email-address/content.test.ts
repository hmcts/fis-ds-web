import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { EmailAddress } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

const resourceLoader = new ResourceReader();
resourceLoader.Loader('email-address');
const translations = resourceLoader.getFileContents().translations;
const errors = resourceLoader.getFileContents().errors;

jest.mock('../../../app/form/validation');

const enContent = {
  ...translations.en,
  errors: {
    ...errors.en,
  },
};

const cyContent = {
  ...translations.cy,
  errors: {
    ...errors.cy,
  },
};

const EN = 'en';
//const CY = 'cy';

const CommonContent = { language: EN } as CommonContent;
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('Email Address', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(CommonContent));
  });

  //const commonContent = { language: CY } as CommonContent;
  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...CommonContent, language: 'cy' }));
  });
  it('should have an email input text field', () => {
    const generatedContent = generateContent(CommonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applicantEmailAddress = fields.applicantEmailAddress;
    expect(applicantEmailAddress.classes).toBe('govuk-input');
    //expect((applicantEmailAddress.label as Function)(generatedContent)).toBe(enContent.label);
    expect((applicantEmailAddress.hint as Function)(generatedContent)).toBe(enContent.hint);
    expect(applicantEmailAddress.type).toBe('text');

    const emailAddressOptions = fields.applicantEmailAddress as FormOptions;
    expect(emailAddressOptions.values[0].value).toBe(EmailAddress.EMAIL_ADDRESS);
    expect((emailAddressOptions.values[0].label as Function)(generatedContent)).toBe('Insert email address');
    expect((emailAddressOptions.validator as Function)('test@gmail.com')).toBe(undefined);
    expect((emailAddressOptions.validator as Function)('')).toBe(undefined);
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(CommonContent);
    const form = generatedContent.form as FormContent;

    expect((form.submit.text as Function)(generateContent({ ...CommonContent, language: EN }))).toBe('Continue');
  });
});
