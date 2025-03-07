import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { loadResources } from '../../util';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const resourceLoader = loadResources('/need-help-with-fees');
const translations = resourceLoader.getFileContents().translations;
const en = translations['en'];
const cy = translations['cy'];

describe('help-with-fees > need-help-with-fees', () => {
  const commonContent = {
    language: 'en',
    userCase: { applyingWith: 'alone' },
    additionalData: {
      req: {
        session: {
          errors: [],
        },
      },
    },
  } as unknown as CommonContent;
  let generatedContent;
  let form;
  let fields;
  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct english content', () => {
    languageAssertions('en', en, () => generateContent(commonContent));
  });

  // eslint-disable-next-line jest/expect-expect
  test('should return correct welsh content', () => {
    languageAssertions('cy', cy, () => generateContent({ ...commonContent, language: 'cy' }));
  });

  test('should select hwfPaymentSelection field', () => {
    const hwfPaymentSelection = fields.hwfPaymentSelection as FormOptions;
    expect(hwfPaymentSelection.type).toBe('radios');
    expect(hwfPaymentSelection.classes).toBe('govuk-radios');
    expect((hwfPaymentSelection.values[0].label as LanguageLookup)(generatedContent)).toBe(
      en.yesNeedHelpWithFeesPaying
    );
    expect((hwfPaymentSelection.values[1].label as LanguageLookup)(generatedContent)).toBe(en.noNeedHelpWithFeesPaying);
    // eslint-disable-next-line @typescript-eslint/ban-types
    (hwfPaymentSelection.validator as Function)();
    expect(isFieldFilledIn).toHaveBeenCalledWith();
  });

  test('should contain onlycontinue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
