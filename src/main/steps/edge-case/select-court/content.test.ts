import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../common/common.content';
import { TYPE_OF_APPLICATION_URL } from '../../urls';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const resourceLoader = new ResourceReader();
resourceLoader.Loader(TYPE_OF_APPLICATION_URL);
const translations = resourceLoader.getFileContents().translations;
const errors = resourceLoader.getFileContents().errors;

const EN = 'en';
const CY = 'cy';

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
  const commonContent = { language: EN, userCase: {} } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual(enContent.continue);
    expect(generatedContent.label).toEqual(enContent.label);
    expect(generatedContent.serviceName).toEqual(enContent.serviceName);
    expect(generatedContent.one).toEqual(enContent.one);
    expect(generatedContent.two).toEqual(enContent.two);
    expect(generatedContent.three).toEqual(enContent.three);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: CY });
    expect(generatedContent.continue).toEqual(cyContent.continue);
    expect(generatedContent.label).toEqual(cyContent.label);
    expect(generatedContent.serviceName).toEqual(cyContent.serviceName);
    expect(generatedContent.one).toEqual(cyContent.one);
    expect(generatedContent.two).toEqual(cyContent.two);
    expect(generatedContent.three).toEqual(cyContent.three);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain namedApplicant field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const typeOfApplication = fields.typeOfApplication as FormOptions;
    expect(typeOfApplication.type).toBe('radios');
    expect(typeOfApplication.classes).toBe('govuk-radios');
    expect((typeOfApplication.label as Function)(generatedContent)).toBe(enContent.label);
    expect((typeOfApplication.values[0].label as Function)(generatedContent)).toBe(enContent.one);
    expect((typeOfApplication.values[1].label as Function)(generatedContent)).toBe(enContent.two);
    expect((typeOfApplication.values[2].label as Function)(generatedContent)).toBe(enContent.three);
  });

  test('should contain continue button', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual(enContent.continue);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
