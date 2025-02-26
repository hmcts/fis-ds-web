import languageAssertions from '../../../../../test/unit/utils/languageAssertions';
import { FormContent, FormFields, FormInput, FormOptions, LanguageLookup } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../../common/common.content';
import { loadResources } from '../../util';

import { generateContent } from './content';

jest.mock('../../../../app/form/validation');

const resourceLoader = loadResources('/fees-applied');
const translations = resourceLoader.getFileContents().translations;
const en = translations['en'];
const cy = translations['cy'];

/* eslint-disable @typescript-eslint/ban-types */
describe('help with fess > fees applied', () => {
  const commonContent = { language: 'en', userCase: {} } as unknown as CommonContent;
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

  test('should contain feesAppliedDetails field', () => {
    const feesAppliedDetailsField = fields.feesAppliedDetails as FormOptions;
    expect(feesAppliedDetailsField.type).toBe('radios');
    expect(feesAppliedDetailsField.classes).toBe('govuk-radios');
    expect((feesAppliedDetailsField.values[0].label as LanguageLookup)(generatedContent)).toBe(en.yes);
    expect((feesAppliedDetailsField.values[1].label as LanguageLookup)(generatedContent)).toBe(en.no);

    const helpWithFeesReferenceLabelField = feesAppliedDetailsField.values[0].subFields!
      .helpWithFeesReferenceLabel as FormInput;
    expect(helpWithFeesReferenceLabelField.type).toBe('textAndHtml');
    expect((helpWithFeesReferenceLabelField.textAndHtml as LanguageLookup)(generatedContent)).toBe(
      '<h3 class="govuk-heading-m">Enter your help with fees reference number</h3>You received this number when you applied for help with fees.'
    );

    const helpWithFeesReferenceNumberField = feesAppliedDetailsField.values[0].subFields!.helpWithFeesReferenceNumber;
    expect(helpWithFeesReferenceNumberField.type).toBe('text');
    expect((helpWithFeesReferenceNumberField.hint as LanguageLookup)(generatedContent)).toBe(en.hwfReferenceNumberHint);
    (helpWithFeesReferenceNumberField.validator as Function)('test text');
    expect(isFieldFilledIn).toHaveBeenCalledWith('test text');
    expect(isTextAreaValid).toHaveBeenCalledWith('test text');

    const noHwfLabelField = feesAppliedDetailsField.values[1].subFields!.noHwfLabel;
    expect(noHwfLabelField.type).toBe('label');
    expect((noHwfLabelField.label as LanguageLookup)(generatedContent)).toBe(en.noHwfLabel);

    const cancelApplicationButtonField = feesAppliedDetailsField.values[1].subFields!.cancelApplicationButton;
    expect(cancelApplicationButtonField.type).toBe('button');
    expect((cancelApplicationButtonField.label as LanguageLookup)(generatedContent)).toBe(en.cancelApplication);
  });

  test('should contain onlycontinue button', () => {
    expect(
      (form?.submit?.text as LanguageLookup)(generatePageContent({ language: 'en' }) as Record<string, never>)
    ).toBe('Continue');
  });
});
