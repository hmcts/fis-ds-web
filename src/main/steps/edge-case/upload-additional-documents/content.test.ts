import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';
import {ResourceReader} from '../../../modules/resourcereader/ResourceReader'
import { generateContent } from './content';

const resourceLoader = new ResourceReader();
resourceLoader.Loader('upload-addtional-documents');
const Translations = resourceLoader.getFileContents().translations;

jest.mock('../../../app/form/validation');

const EN = 'en';

const enContent = {
  ...Translations.en
};

const cyContent = {
  ...Translations.cy
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
