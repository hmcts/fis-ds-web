import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { CommonContent, generatePageContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const en = () => ({
  continue: 'Save and continue',
});

const enContentError = {
  errors: {
    applyingForSelf: {
      required: 'Please select an answer before you can proceed further',
    },
  },
};

const cyContentError = {
  errors: {
    applyingForSelf: {
      required: 'Please select an answer before you can proceed further (in welsh)',
    },
  },
};

/* eslint-disable @typescript-eslint/ban-types */
describe('role-type content', () => {
  const commonContent = { language: 'en', userCase: {} } as CommonContent;
  test('should return correct english content', () => {
    const generatedContent = generateContent(commonContent);
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.label).toEqual(
      'Are you named as the applicant on the on the application form you are submitting?'
    );
    expect(generatedContent.serviceName).toEqual("Determine user's role");
    expect(generatedContent.one).toEqual('Yes');
    expect(generatedContent.two).toEqual('No - I am sending an application for someone else.');
    expect(generatedContent.errors).toEqual(enContentError.errors);
  });

  test('should return correct welsh content', () => {
    const generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.continue).toEqual('Continue');
    expect(generatedContent.label).toEqual(
      'Are you named as the applicant on the on the application form you are submitting? (in welsh)'
    );
    expect(generatedContent.serviceName).toEqual("Determine user's role (in welsh)");
    expect(generatedContent.one).toEqual('Yes (in welsh)');
    expect(generatedContent.two).toEqual('No - I am sending an application for someone else. (in welsh)');
    expect(generatedContent.errors).toEqual(cyContentError.errors);
  });

  test('should contain applyingForSelf field', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    const fields = form.fields as FormFields;
    const applyingForSelfField = fields.applyingForSelf as FormOptions;
    expect(applyingForSelfField.type).toBe('radios');
    expect(applyingForSelfField.classes).toBe('govuk-radios');
    expect((applyingForSelfField.label as Function)(generatedContent)).toBe(
      'Are you named as the applicant on the on the application form you are submitting?'
    );
    expect((applyingForSelfField.values[0].label as Function)(generatedContent)).toBe('Yes');
    expect((applyingForSelfField.values[1].label as Function)(generatedContent)).toBe(
      'No - I am sending an application for someone else.'
    );
  });

  test('should contain submit button', () => {
    const generatedContent = generateContent(commonContent);
    const form = generatedContent.form as FormContent;
    expect((form.submit.text as Function)(generatePageContent({ language: 'en' }))).toBe(en().continue);
  });
});
/* eslint-enable @typescript-eslint/ban-types */
