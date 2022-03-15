import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('adoption-application-type content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.label).toEqual('Adoption Application Type');
    expect(generatedContent.one).toEqual('International Adoption');
    expect(generatedContent.two).toEqual('Relinquished Adoption');
    expect(generatedContent.three).toEqual('Step-parent Adoption');
    expect(generatedContent.four).toEqual('Parental Orders');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.continue).toEqual('Continue (in welsh)');
    expect(generatedContent.label).toEqual('Adoption Application Type (in welsh)');
    expect(generatedContent.one).toEqual('International Adoption (in welsh)');
    expect(generatedContent.two).toEqual('Relinquished Adoption (in welsh)');
    expect(generatedContent.three).toEqual('Step-parent Adoption (in welsh)');
    expect(generatedContent.four).toEqual('Parental Orders (in welsh)');
  });

  test('should contain adoption application type field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adoptionApplicationTypeField = fields.adoptionApplicationType as FormOptions;
    expect(adoptionApplicationTypeField.type).toBe('radios');
    expect(adoptionApplicationTypeField.classes).toBe('govuk-radios');
    expect((adoptionApplicationTypeField.label as Function)(generatedContent)).toBe('Adoption Application Type');
    expect((adoptionApplicationTypeField.values[0].label as Function)(generatedContent)).toBe('International Adoption');
    expect((adoptionApplicationTypeField.values[1].label as Function)(generatedContent)).toBe('Relinquished Adoption');
    expect((adoptionApplicationTypeField.values[2].label as Function)(generatedContent)).toBe('Step-parent Adoption');
    expect((adoptionApplicationTypeField.values[3].label as Function)(generatedContent)).toBe('Parental Orders');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
