import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
//import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

/* eslint-disable @typescript-eslint/ban-types */
describe('private-law-application-type content', () => {
  const commonContent = { language: 'en', userCase: { applyingWith: 'alone' } } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.serviceName).toEqual('Private law');
    expect(generatedContent.label).toEqual('Select the type of private law you want to apply for');
    expect(generatedContent.one).toEqual('Female Genital Mutilation Orders(FGM)');
    expect(generatedContent.oneHint).toEqual('A court order to protect a female at risk of FGM');
    expect(generatedContent.two).toEqual('Forced Marriage Protection Order(FMPO)');
    expect(generatedContent.twoHint).toEqual(
      'A court order to protect you or someone else from the consequences of a forced marriage'
    );
    expect(generatedContent.three).toEqual('Special Guardianship');
    expect(generatedContent.threeHint).toEqual(
      'A court order placing a child to live with someone other than their parents'
    );
    expect(generatedContent.four).toEqual('Financial applications');
    expect(generatedContent.fourHint).toEqual(
      'If you are applying for financial order under Schedule 1 of the Children Act 1989'
    );
    expect(generatedContent.five).toEqual('Declaration of parentage');
    expect(generatedContent.fiveHint).toEqual(
      'Ask the court to declare whether or not someone is parent of another named person'
    );
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.serviceName).toEqual('Private law (in welsh)');
    expect(generatedContent.label).toEqual('Select the type of private law you want to apply for (in welsh)');
    expect(generatedContent.one).toEqual('Female Genital Mutilation Orders(FGM) (in welsh)');
    expect(generatedContent.oneHint).toEqual('A court order to protect a female at risk of FGM');
    expect(generatedContent.two).toEqual('Forced Marriage Protection Order(FMPO) (in welsh)');
    expect(generatedContent.twoHint).toEqual(
      'A court order to protect you or someone else from the consequences of a forced marriage (in welsh)'
    );
    expect(generatedContent.three).toEqual('Special Guardianship (in welsh)');
    expect(generatedContent.threeHint).toEqual(
      'A court order placing a child to live with someone other than their parents (in welsh)'
    );
    expect(generatedContent.four).toEqual('Financial applications (in welsh)');
    expect(generatedContent.fourHint).toEqual(
      'If you are applying for financial order under Schedule 1 of the Children Act 1989 (in welsh)'
    );
    expect(generatedContent.five).toEqual('Declaration of parentage (in welsh)');
    expect(generatedContent.fiveHint).toEqual(
      'Ask the court to declare whether or not someone is parent of another named person (in welsh)'
    );
  });

  test('should contain private law application type field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const privateLawApplicationTypeField = fields.applyingWith as FormOptions;
    expect(privateLawApplicationTypeField.type).toBe('radios');
    expect(privateLawApplicationTypeField.classes).toEqual('govuk-radios');
    expect((privateLawApplicationTypeField.label as Function)(generatedContent)).toBe(
      'Select the type of private law you want to apply for'
    );
    expect((privateLawApplicationTypeField.values[0].label as Function)(generatedContent)).toBe(
      'Female Genital Mutilation Orders(FGM)'
    );
    expect((privateLawApplicationTypeField.values[0].hint as Function)(generatedContent)).toBe(
      'A court order to protect a female at risk of FGM'
    );
    expect((privateLawApplicationTypeField.values[1].label as Function)(generatedContent)).toBe(
      'Forced Marriage Protection Order(FMPO)'
    );
    expect((privateLawApplicationTypeField.values[1].hint as Function)(generatedContent)).toBe(
      'A court order to protect you or someone else from the consequences of a forced marriage'
    );
    expect((privateLawApplicationTypeField.values[2].label as Function)(generatedContent)).toBe('Special Guardianship');
    expect((privateLawApplicationTypeField.values[2].hint as Function)(generatedContent)).toBe(
      'A court order placing a child to live with someone other than their parents'
    );
    expect((privateLawApplicationTypeField.values[3].label as Function)(generatedContent)).toBe(
      'Financial applications'
    );
    expect((privateLawApplicationTypeField.values[3].hint as Function)(generatedContent)).toBe(
      'If you are applying for financial order under Schedule 1 of the Children Act 1989'
    );
    expect((privateLawApplicationTypeField.values[4].label as Function)(generatedContent)).toBe(
      'Declaration of parentage'
    );
    expect((privateLawApplicationTypeField.values[4].hint as Function)(generatedContent)).toBe(
      'Ask the court to declare whether or not someone is parent of another named person'
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
