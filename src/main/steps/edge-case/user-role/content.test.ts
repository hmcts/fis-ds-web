import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const resourceLoader = new ResourceReader();
resourceLoader.Loader('user-role');
const translations = resourceLoader.getFileContents().translations;
const errors = resourceLoader.getFileContents().errors;

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

/* eslint-disable @typescript-eslint/ban-types */
describe('role-type content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.serviceName).toEqual(enContent.serviceName);
    expect(generatedContent.one).toEqual(enContent.one);
    expect(generatedContent.two).toEqual(enContent.two);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.continue).toEqual(cyContent.continue);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.serviceName).toEqual(cyContent.serviceName);
    expect(generatedContent.one).toEqual(cyContent.one);
    expect(generatedContent.two).toEqual(cyContent.two);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain applyingForSelf field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingForSelfField = fields.applyingForSelf as FormOptions;
    expect(applyingForSelfField.type).toBe('radios');
    expect(applyingForSelfField.classes).toBe('govuk-radios');
    expect((applyingForSelfField.label as Function)(generatedContent)).toBe(
      'Are you named as the applicant on the application form you are submitting?'
    );
    expect((applyingForSelfField.values[0].label as Function)(generatedContent)).toBe('Yes');
    expect((applyingForSelfField.values[1].label as Function)(generatedContent)).toBe(
      'No - I am sending an application for someone else.'
    );
  });

  test('should contain continue button', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
