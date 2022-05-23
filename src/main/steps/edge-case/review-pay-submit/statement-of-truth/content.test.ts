import { FormContent, FormFields, FormOptions } from '../../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('statement-of-truth content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.one).toEqual('I believe that the facts stated in this application are true');
  });

  test('should contain checkbox and  Lbel', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const statementOfTruthField = fields.statementOfTruth as FormOptions;
    expect(statementOfTruthField.type).toBe('checkboxes');
    expect(statementOfTruthField.classes).toBe('govuk-checkboxes');
    expect((statementOfTruthField.values[0].label as Function)(generatedContent)).toBe('I believe that the facts stated in this application are true');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
