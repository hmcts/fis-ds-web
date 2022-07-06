import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  serviceName: 'Document upload',
  title: 'Additional Documents',
  youNeed: 'Please upload any additional documents that should accompany this application(s) form(s).',
  youNeed2: 'Examples of additional documents can be found on the application form',
  youNeed3: 'Please upload each document separately by using the “upload another file” button',
  youNeed4:
    'You can post or email your documents to the court. Copies of certificates must be certified, which means they must be signed and dated by a professional person such as a solicitor or doctor.',
  uploadButton: 'Upload',
};

const cyContent = {
  serviceName: 'Document upload - (Whelsh)',
  title: 'Additional Documents - (Whelsh)',
  youNeed: 'Please upload any additional documents that should accompany this application(s) form(s). - (Whelsh)',
  youNeed2: 'Examples of additional documents can be found on the application form - (Whelsh)',
  youNeed3: 'Please upload each document separately by using the “upload another file” button - (Whelsh)',
  youNeed4:
    'You can post or email your documents to the court. Copies of certificates must be certified, which means they must be signed and dated by a professional person such as a solicitor or doctor. - (Whelsh)',
  uploadButton: 'Upload',
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

  it('should have an documentUploadProceed hidden input field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const documentUploadProceed = fields.documentUploadProceed;

    expect(documentUploadProceed.type).toBe('hidden');
  });

  it('should have an documentUploadProceed not be a checkbox field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const documentUploadProceed = fields.documentUploadProceed;

    expect(documentUploadProceed.type).not.toBe('checkboxes');
  });

  it('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Continue');
  });
});
