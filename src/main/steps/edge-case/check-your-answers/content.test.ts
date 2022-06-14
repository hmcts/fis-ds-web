import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { mockUserCase1 } from '../../../../test/unit/utils/mockUserCase';
import { FormContent } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';
const resourceLoader = new ResourceReader();
resourceLoader.Loader('check-your-answers');
const Translations = resourceLoader.getFileContents().translations;

const enContent = {
  ...Translations.en,
};

const cyContent = {
  ...Translations.cy,
};

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('check-your-answer > content', () => {
  const commonContent = {
    language: 'en',
    userCase: mockUserCase1,
  } as unknown as CommonContent;

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('en', cyContent, () =>
      generateContent({
        ...commonContent,
        userCase: { ...mockUserCase1, applyingWith: '' },
        language: 'cy',
      })
    );
  });
  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
