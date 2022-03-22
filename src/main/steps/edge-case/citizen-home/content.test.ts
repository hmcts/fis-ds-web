import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toEqual('Select Jurisdiction');
    expect(generatedContent.one).toEqual('Family');
    expect(generatedContent.two).toEqual('Tribunals');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.label).toEqual('Select Jurisdiction (in welsh)');
    expect(generatedContent.one).toEqual('Family (in welsh)');
    expect(generatedContent.two).toEqual('Tribunals (in welsh)');
  });

  test('should contain Select Jurisdiction field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const citizenHomeField = fields.citizenHome as FormOptions;
    expect(citizenHomeField.type).toBe('radios');
    expect(citizenHomeField.classes).toBe('govuk-radios');
    expect((citizenHomeField.label as Function)(generatedContent)).toBe('Select Jurisdiction');
    expect((citizenHomeField.hint as Function)(generatedContent)).toBe(
      'This is the area of law your application sits under. For example adoption and child custody are under family law, genter recognition and disputes are under tribunals'
    );
    expect((citizenHomeField.values[0].label as Function)(generatedContent)).toBe('Family');
    expect((citizenHomeField.values[1].label as Function)(generatedContent)).toBe('Tribunals');
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
