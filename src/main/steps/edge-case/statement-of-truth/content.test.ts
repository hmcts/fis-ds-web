import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { isFieldFilledIn } from '../../../app/form/validation';
import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  serviceName: 'Statement of truth',
  statementOfTruthLabel: 'I believe that the facts stated in this application are true',
  confirmStatement:
    "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth'",
  continuePaymentButton: 'Continue to payment',
  errors: {
      statementOfTruth: {
        required : 'Tick checkbox to confirm Statement of truth'
      }
    }
};

const cyContent = {
  serviceName: 'Statement of truth (in Welsh)',
  statementOfTruthLabel: 'I believe that the facts stated in this application are true (in Welsh)',
  confirmStatement:
    "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth' (in Welsh)",
  continuePaymentButton: 'Continue to paymen (in Welsh)t',
  errors: {
    statementOfTruth: {
      required : 'Tick checkbox to confirm Statement of truth (in Welsh)'
    }
  }
};


describe('statement-of-truth', () => {
  const commonContent = { language: 'en' } as CommonContent;

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
