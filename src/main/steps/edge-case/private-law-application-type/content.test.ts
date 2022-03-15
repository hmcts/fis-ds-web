import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('citizen-home content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.label).toEqual('Private Law Application Type');
    expect(generatedContent.one).toEqual('Genital Mutliation Orders(FGM)');
    expect(generatedContent.two).toEqual('Forced Protection Marriage Order(FMPO)');
    expect(generatedContent.three).toEqual('Special Guardianship');
    expect(generatedContent.four).toEqual('Financial Applications');
    expect(generatedContent.five).toEqual('Declaration of Parentage');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.label).toEqual('Private Law Application Type (in welsh)');
    expect(generatedContent.one).toEqual('Genital Mutliation Orders(FGM) (in welsh)');
    expect(generatedContent.two).toEqual('Forced Protection Marriage Order(FMPO) (in welsh)');
    expect(generatedContent.three).toEqual('Special Guardianship');
    expect(generatedContent.four).toEqual('Financial Applications');
    expect(generatedContent.five).toEqual('Declaration of Parentage');
  });

  test('should contain Select Jurisdiction field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const privateLawApplicationTypeField = fields.privateLawApplicationType as FormOptions;
    expect(privateLawApplicationTypeField.type).toBe('radios');
    expect(privateLawApplicationTypeField.classes).toBe('govuk-radios');
    expect((privateLawApplicationTypeField.label as Function)(generatedContent)).toBe('Private Law Application Type');
    expect((privateLawApplicationTypeField.values[0].label as Function)(generatedContent)).toBe(
      'Genital Mutliation Orders(FGM)'
    );
    expect((privateLawApplicationTypeField.values[1].label as Function)(generatedContent)).toBe(
      'Forced Protection Marriage Order(FMPO)'
    );
    expect((privateLawApplicationTypeField.values[2].label as Function)(generatedContent)).toBe('Special Guardianship');
    expect((privateLawApplicationTypeField.values[3].label as Function)(generatedContent)).toBe(
      'Financial Applications'
    );
    expect((privateLawApplicationTypeField.values[4].label as Function)(generatedContent)).toBe(
      'Declaration of Parentage'
    );
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
