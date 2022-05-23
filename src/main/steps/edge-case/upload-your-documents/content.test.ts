import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  serviceName: 'application upload',
  title: 'Upload application form',
  youNeed: 'Please upload the application form that you have already completed.',
  youNeed2:
    'If you are nπot the person name on the application, you mat need to complete an additional form to ask for permission to apply on behalf of someone else.',
  youNeed3:
    'You may also need to upload a confidentiality form if you need the details of the person named on the application to be kept confidential.',
  uploadDescription: 'Please upload all required forms below.',
  uploadRequirement:
    "<div class='govuk-body-s'><ul class=‘govuk-list govuk-list--bullet’><li>File formats: MS Word, MS Excel, PDF, JPG, GIF, PNG, TXT, RTF</li><li>File size per document: up to 20 megabytes (MB)</li><li>Files cannot be password protected</li></ul><p> You can’t upload executable(.exe) .zip or other archive files due to virus risks.</div>",
  uploadButton: '+ upload another file',
};

const cyContent = {
  serviceName: 'application upload - (Whelsh)',
  title: 'Upload application form - (Whelsh)',
  youNeed: 'Please upload the application form that you have already completed. - (Whelsh)',
  youNeed2:
    'If you are nπot the person name on the application, you mat need to complete an additional form to ask for permission to apply on behalf of someone else. - (Whelsh)',
  youNeed3:
    'You may also need to upload a confidentiality form if you need the details of the person named on the application to be kept confidential. - (Whelsh)',
  uploadDescription: 'Please upload all required forms below. - (Whelsh)',
  uploadRequirement:
    "<div class='govuk-body-s'><ul class=‘govuk-list govuk-list--bullet’><li>File formats: MS Word, MS Excel, PDF, JPG, GIF, PNG, TXT, RTF</li><li>File size per document: up to 20 megabytes (MB)</li><li>Files cannot be password protected</li></ul><p> You can’t upload executable(.exe) .zip or other archive files due to virus risks.</div> (Whelsh)",
  uploadButton: '+ upload another file (Whelsh)',
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
    expect((form.submit.text as Function)(generatePageContent({ language: EN }))).toBe('Save and continue');
  });
});
