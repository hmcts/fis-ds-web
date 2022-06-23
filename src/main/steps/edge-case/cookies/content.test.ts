import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const resourceLoader = new ResourceReader();
resourceLoader.Loader('cookies');
const Translations = resourceLoader.getFileContents().translations;

const en = Translations.en;

const cy = Translations.cy;

describe('cookies > content', () => {
  const commonContent = generatePageContent({
    language: 'en',
    userCase: {},
  }) as CommonContent;

  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });
});
