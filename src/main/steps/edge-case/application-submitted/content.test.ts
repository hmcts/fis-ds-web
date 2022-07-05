import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../common/common.content';
import { generateContent } from '../application-submitted/content';

jest.mock('../../../app/form/validation');

const APPLICATION_SUBMITTED_TRANSLATION_FILE = 'application-submitted';

const resourceLoader = new ResourceReader();
resourceLoader.Loader(APPLICATION_SUBMITTED_TRANSLATION_FILE);
const translations = resourceLoader.getFileContents().translations;

const EN = 'en';
const CY = 'cy';

const en = {
  ...translations.en,
};

const cy = {
  ...translations.cy,
};

describe('application-submitted', () => {
  const commonContent = { language: EN } as CommonContent;

  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
  });

  test('should return correct english content', () => {
    expect(generatedContent.serviceName).toEqual(en.serviceName);
    expect(generatedContent.title).toEqual(en.title);
    expect(generatedContent.emailSentConfirmation).toEqual(en.emailSentConfirmation);
    expect(generatedContent.line2).toEqual(en.line2);
    expect(generatedContent.line3).toEqual(en.line3);
    expect(generatedContent.line4).toEqual(en.line4);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: CY });
    expect(generatedContent.serviceName).toEqual(cy.serviceName);
    expect(generatedContent.title).toEqual(cy.title);
    expect(generatedContent.emailSentConfirmation).toEqual(cy.emailSentConfirmation);
    expect(generatedContent.line2).toEqual(cy.line2);
    expect(generatedContent.line3).toEqual(cy.line3);
    expect(generatedContent.line4).toEqual(cy.line4);
  });
});
