import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';
import { HintMessages, HintMessagesWelsh, LabelMessages, LabelMessagesWelsh } from '../../labelMessages';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('private-law-application-type content', () => {
  const commonContent = {
    language: 'en',
    userCase: { applyingWithPrivateLaw: 'Yes', applyingWithAdoption: 'No' },
  } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.serviceName).toEqual('Private law');
    expect(generatedContent.label).toEqual(LabelMessages.PRL_LABEL);
    expect(generatedContent.one).toEqual(LabelMessages.PRL_ONE);
    expect(generatedContent.oneHint).toEqual(HintMessages.PRL_ONE_HINT);
    expect(generatedContent.two).toEqual(LabelMessages.PRL_TWO);
    expect(generatedContent.twoHint).toEqual(HintMessages.PRL_TWO_HINT);
    expect(generatedContent.three).toEqual(LabelMessages.PRL_THREE);
    expect(generatedContent.threeHint).toEqual(HintMessages.PRL_THREE_HINT);
    expect(generatedContent.four).toEqual(LabelMessages.PRL_FOUR);
    expect(generatedContent.fourHint).toEqual(HintMessages.PRL_FOUR_HINT);
    expect(generatedContent.five).toEqual(LabelMessages.PRL_FIVE);
    expect(generatedContent.fiveHint).toEqual(HintMessages.PRL_FIVE_HINT);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.serviceName).toEqual('Private law (in welsh)');
    expect(generatedContent.label).toEqual(LabelMessagesWelsh.PRL_LABEL);
    expect(generatedContent.one).toEqual(LabelMessagesWelsh.PRL_ONE);
    expect(generatedContent.oneHint).toEqual(HintMessagesWelsh.PRL_ONE_HINT);
    expect(generatedContent.two).toEqual(LabelMessagesWelsh.PRL_TWO);
    expect(generatedContent.twoHint).toEqual(HintMessagesWelsh.PRL_TWO_HINT);
    expect(generatedContent.three).toEqual(LabelMessagesWelsh.PRL_THREE);
    expect(generatedContent.threeHint).toEqual(HintMessagesWelsh.PRL_THREE_HINT);
    expect(generatedContent.four).toEqual(LabelMessagesWelsh.PRL_FOUR);
    expect(generatedContent.fourHint).toEqual(HintMessagesWelsh.PRL_FOUR_HINT);
    expect(generatedContent.five).toEqual(LabelMessagesWelsh.PRL_FIVE);
    expect(generatedContent.fiveHint).toEqual(HintMessagesWelsh.PRL_FIVE_HINT);
  });

  test('should contain private law application type field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const privateLawApplicationTypeField = fields.applyingWith as FormOptions;
    expect(privateLawApplicationTypeField.type).toBe('radios');
    expect(privateLawApplicationTypeField.classes).toEqual('govuk-radios');
    expect((privateLawApplicationTypeField.label as Function)(generatedContent)).toBe(LabelMessages.PRL_LABEL);
    expect((privateLawApplicationTypeField.values[0].label as Function)(generatedContent)).toBe(LabelMessages.PRL_ONE);
    expect((privateLawApplicationTypeField.values[0].hint as Function)(generatedContent)).toBe(
      HintMessages.PRL_ONE_HINT
    );
    expect((privateLawApplicationTypeField.values[1].label as Function)(generatedContent)).toBe(LabelMessages.PRL_TWO);
    expect((privateLawApplicationTypeField.values[1].hint as Function)(generatedContent)).toBe(
      HintMessages.PRL_TWO_HINT
    );
    expect((privateLawApplicationTypeField.values[2].label as Function)(generatedContent)).toBe(
      LabelMessages.PRL_THREE
    );
    expect((privateLawApplicationTypeField.values[2].hint as Function)(generatedContent)).toBe(
      HintMessages.PRL_THREE_HINT
    );
    expect((privateLawApplicationTypeField.values[3].label as Function)(generatedContent)).toBe(LabelMessages.PRL_FOUR);
    expect((privateLawApplicationTypeField.values[3].hint as Function)(generatedContent)).toBe(
      HintMessages.PRL_FOUR_HINT
    );
    expect((privateLawApplicationTypeField.values[4].label as Function)(generatedContent)).toBe(LabelMessages.PRL_FIVE);
    expect((privateLawApplicationTypeField.values[4].hint as Function)(generatedContent)).toBe(
      HintMessages.PRL_FIVE_HINT
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
