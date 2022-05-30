import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { generateContent } from './content';

const STATEMENT_OF_TRUTH_TRANSLATION_FILE = 'statement-of-truth';

const resourceLoader = new ResourceReader();
resourceLoader.Loader(STATEMENT_OF_TRUTH_TRANSLATION_FILE);const translations = resourceLoader.getFileContents().translations;
const errors = resourceLoader.getFileContents().errors;


jest.mock('../../../app/form/validation');

const ENGLISH = 'en';
const CYMRAEG = 'cy';

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

describe('statement-of-truth', () => {
  const commonContent = { language: ENGLISH } as CommonContent;

  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct content in English', () => {
    expect(generatedContent.serviceName).toEqual(enContent.serviceName);
    expect(generatedContent.statementOfTruthLabel).toEqual(enContent.statementOfTruthLabel);
    expect(generatedContent.confirmStatement).toEqual(enContent.confirmStatement);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct content in Welsh', () => {
    generatedContent = generateContent({ ...commonContent, language: CYMRAEG });
        expect(generatedContent.serviceName).toEqual(cyContent.serviceName);
    expect(generatedContent.statementOfTruthLabel).toEqual(cyContent.statementOfTruthLabel);
    expect(generatedContent.confirmStatement).toEqual(cyContent.confirmStatement);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  /* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
  test('should contain Statement of Truth fields', () => {
    generatedContent = generateContent(commonContent);
    const field = fields.checkboxes as FormOptions;
    expect(field.type).toBe('checkboxes');
    expect(field.classes).toBe('govuk-checkboxes');
    expect((field.label as Function)(generatedContent)).toBe(enContent.statementOfTruthLabel);
    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect((form.submit.text as Function)(generateContent(commonContent))).toBe(enContent.continuePaymentButton);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
