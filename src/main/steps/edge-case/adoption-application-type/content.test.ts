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
    expect(generatedContent.label).toEqual('Select the type of adoption you want to apply for');
    expect(generatedContent.one).toEqual('International adoption');
    expect(generatedContent.oneHint).toEqual('Application for an Adoption Order where the child ia habitually resident outside the British Islands and is brought into the United Kingdom for the purpose of adoption');
    expect(generatedContent.two).toEqual('Relinquished adoption');
    expect(generatedContent.twoHint).toEqual('Application for an Adoption Order where the child is under 6 weeks old');
    expect(generatedContent.three).toEqual('Stepparent adoption');
    expect(generatedContent.threeHint).toEqual("Application for an Adoption Order where you are applying to adopt alone and you are the partner (including spouse or civil partner) of the child's father or mother or other parent");
    expect(generatedContent.four).toEqual('Parental order');
    expect(generatedContent.fourHint).toEqual('Application to apply to become legal parents under Section 54 or 54A of the Human Fertilisation & Embryology Act 2008');
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.continue).toEqual('Continue (in welsh)');
    expect(generatedContent.label).toEqual('Select the type of adoption you want to apply for (in welsh)');
    expect(generatedContent.one).toEqual('International adoption (in welsh)');
    expect(generatedContent.oneHint).toEqual('Application for an Adoption Order where the child ia habitually resident outside the British Islands and is brought into the United Kingdom for the purpose of adoption (in welsh)');
    expect(generatedContent.two).toEqual('Relinquished adoption (in welsh)');
    expect(generatedContent.twoHint).toEqual('Application for an Adoption Order where the child is under 6 weeks old (in welsh)');
    expect(generatedContent.three).toEqual('Stepparent adoption (in welsh)');
    expect(generatedContent.threeHint).toEqual("Application for an Adoption Order where you are applying to adopt alone and you are the partner (including spouse or civil partner) of the child's father or mother or other parent (in welsh)");
    expect(generatedContent.four).toEqual('Parental order (in welsh)');
    expect(generatedContent.fourHint).toEqual('Application to apply to become legal parents under Section 54 or 54A of the Human Fertilisation & Embryology Act 2008 (in welsh)');
  });

  test('should contain adoption application type field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const adoptionApplicationTypeField = fields.applyingWith as FormOptions;
    expect(adoptionApplicationTypeField.type).toBe('radios');
    expect(adoptionApplicationTypeField.classes).toBe('govuk-radios');
    expect((adoptionApplicationTypeField.label as Function)(generatedContent)).toBe('Select the type of adoption you want to apply for');
    expect((adoptionApplicationTypeField.values[0].label as Function)(generatedContent)).toBe('International adoption');
    expect((adoptionApplicationTypeField.values[0].hint as Function)(generatedContent)).toBe('Application for an Adoption Order where the child ia habitually resident outside the British Islands and is brought into the United Kingdom for the purpose of adoption');
    expect((adoptionApplicationTypeField.values[1].label as Function)(generatedContent)).toBe('Relinquished adoption');
    expect((adoptionApplicationTypeField.values[1].hint as Function)(generatedContent)).toBe('Application for an Adoption Order where the child is under 6 weeks old');
    expect((adoptionApplicationTypeField.values[2].label as Function)(generatedContent)).toBe('Stepparent adoption');
    expect((adoptionApplicationTypeField.values[2].hint as Function)(generatedContent)).toBe("Application for an Adoption Order where you are applying to adopt alone and you are the partner (including spouse or civil partner) of the child's father or mother or other parent");
    expect((adoptionApplicationTypeField.values[3].label as Function)(generatedContent)).toBe('Parental order');
    expect((adoptionApplicationTypeField.values[3].hint as Function)(generatedContent)).toBe('Application to apply to become legal parents under Section 54 or 54A of the Human Fertilisation & Embryology Act 2008');
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
