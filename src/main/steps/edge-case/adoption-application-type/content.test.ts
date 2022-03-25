import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { HintMessages, HintMessagesWelsh, LabelMessages, LabelMessagesWelsh } from '../../../steps/labelMessages';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('adoption-application-type content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.label).toEqual(LabelMessages.ADOPTION_LABEL);
    expect(generatedContent.one).toEqual(LabelMessages.ADOPTION_ONE);
    expect(generatedContent.oneHint).toEqual(HintMessages.ADOPTION_ONE_HINT);
    expect(generatedContent.two).toEqual(LabelMessages.ADOPTION_TWO);
    expect(generatedContent.twoHint).toEqual(HintMessages.ADOPTION_TWO_HINT);
    expect(generatedContent.three).toEqual(LabelMessages.ADOPTION_THREE);
    expect(generatedContent.threeHint).toEqual(HintMessages.ADOPTION_THREE_HINT);
    expect(generatedContent.four).toEqual(LabelMessages.ADOPTION_FOUR);
    expect(generatedContent.fourHint).toEqual(HintMessages.ADOPTION_FOUR_HINT);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.continue).toEqual('Continue (in welsh)');
    expect(generatedContent.label).toEqual(LabelMessagesWelsh.ADOPTION_LABEL);
    expect(generatedContent.one).toEqual(LabelMessagesWelsh.ADOPTION_ONE);
    expect(generatedContent.oneHint).toEqual(HintMessagesWelsh.ADOPTION_ONE_HINT);
    expect(generatedContent.two).toEqual(LabelMessagesWelsh.ADOPTION_TWO);
    expect(generatedContent.twoHint).toEqual(HintMessagesWelsh.ADOPTION_TWO_HINT);
    expect(generatedContent.three).toEqual(LabelMessagesWelsh.ADOPTION_THREE);
    expect(generatedContent.threeHint).toEqual(HintMessagesWelsh.ADOPTION_THREE_HINT);
    expect(generatedContent.four).toEqual(LabelMessagesWelsh.ADOPTION_FOUR);
    expect(generatedContent.fourHint).toEqual(HintMessagesWelsh.ADOPTION_FOUR_HINT);
  });

  test('should contain adoption application type field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adoptionApplicationTypeField = fields.applyingWith as FormOptions;
    expect(adoptionApplicationTypeField.type).toBe('radios');
    expect(adoptionApplicationTypeField.classes).toBe('govuk-radios');
    expect((adoptionApplicationTypeField.label as Function)(generatedContent)).toBe(LabelMessages.ADOPTION_LABEL);
    expect((adoptionApplicationTypeField.values[0].label as Function)(generatedContent)).toBe(
      LabelMessages.ADOPTION_ONE
    );
    expect((adoptionApplicationTypeField.values[0].hint as Function)(generatedContent)).toBe(
      HintMessages.ADOPTION_ONE_HINT
    );
    expect((adoptionApplicationTypeField.values[1].label as Function)(generatedContent)).toBe(
      LabelMessages.ADOPTION_TWO
    );
    expect((adoptionApplicationTypeField.values[1].hint as Function)(generatedContent)).toBe(
      HintMessages.ADOPTION_TWO_HINT
    );
    expect((adoptionApplicationTypeField.values[2].label as Function)(generatedContent)).toBe(
      LabelMessages.ADOPTION_THREE
    );
    expect((adoptionApplicationTypeField.values[2].hint as Function)(generatedContent)).toBe(
      HintMessages.ADOPTION_THREE_HINT
    );
    expect((adoptionApplicationTypeField.values[3].label as Function)(generatedContent)).toBe(
      LabelMessages.ADOPTION_FOUR
    );
    expect((adoptionApplicationTypeField.values[3].hint as Function)(generatedContent)).toBe(
      HintMessages.ADOPTION_FOUR_HINT
    );
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });

  test('should contain cancel button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.cancel?.text as Function)(generatePageContent({ language: 'en' }))).toBe('Cancel');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
