import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../common/common.content';
import { generateContent } from '../application-submitted/content';

jest.mock('../../../app/form/validation');

const APPLICATION_SUBMITTED_TRANSLATION_FILE = 'application-submitted';

const resourceLoader = new ResourceReader();
resourceLoader.Loader(APPLICATION_SUBMITTED_TRANSLATION_FILE);
const translations = resourceLoader.getFileContents().translations;

const en = {
  ...translations.en,
};

const cy = {
  ...translations.cy,
};

describe('application-submitted', () => {
  const commonContent = { language: 'en' } as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () =>
      generateContent({
        ...commonContent,
        language: 'cy',
      })
    );
  });
});
