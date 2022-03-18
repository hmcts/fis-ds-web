import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('service-type content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.label).toEqual('Select type of family law you need');
    expect(generatedContent.one).toEqual('Adoption');
    expect(generatedContent.two).toEqual('Private Law');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.continue).toEqual('Continue (in welsh)');
    expect(generatedContent.label).toEqual('Service Type (in welsh)');
    expect(generatedContent.one).toEqual('Adoption (in welsh)');
    expect(generatedContent.two).toEqual('Private Law (in welsh)');
  });

  test('should contain Select Jurisdiction field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const serviceTypeField = fields.serviceType as FormOptions;
    expect(serviceTypeField.type).toBe('radios');
    expect(serviceTypeField.classes).toBe('govuk-radios');
    expect((serviceTypeField.label as Function)(generatedContent)).toBe('Select type of family law you need');
    expect((serviceTypeField.values[0].label as Function)(generatedContent)).toBe('Adoption');
    expect((serviceTypeField.values[1].label as Function)(generatedContent)).toBe('Private Law');
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe('Save and continue');
  });
});
/* eslint-enable @typescript-eslint/ban-types */
