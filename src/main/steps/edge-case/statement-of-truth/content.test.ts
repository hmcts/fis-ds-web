import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  serviceName: 'Statement of truth',
  confirmStatement:
    "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth'",
  continuePaymentButton: 'Continue to payment',
};

const cyContent = {
  serviceName: 'Statement of truth (in Welsh)',
  confirmStatement:
    "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth' (in Welsh)",
  continuePaymentButton: 'Continue to paymen (in Welsh)t',
};

const commonContent = { language: EN } as CommonContent;
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('Upload content', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  it('should have an statement hidden input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const documentUploadProceed = fields.statementOfTruth;

    expect(documentUploadProceed.type).toBe('checkboxes');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
