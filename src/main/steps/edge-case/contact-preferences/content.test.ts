import { ContactPreference } from '../../../app/case/definition';
import { FormContent, FormFields, FormOptions } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { CommonContent } from '../../common/common.content';
import { generateContent } from '../contact-preferences/content';

jest.mock('../../../app/form/validation');

const en = {
  continue: 'Continue',
  serviceName: 'Contact preferences',
  label: 'Who should receive emails about this application',
  accountOwner: 'The account owner',
  namedPerson: 'The person named on this application',
  bothReceiveEmail: 'Both the account owner and the person named on this application',
  errors: {
    contactPreferenceType: {
      required: 'Select an option',
    },
  },
};

const cy = {
  continue: 'Continue (in welsh)',
  serviceName: 'Contact preferences (in Welsh)',
  label: 'Who should receive emails about this application (in Welsh)',
  accountOwner: 'The account owner (in Welsh)',
  namedPerson: 'The person named on this application (in Welsh)',
  bothReceiveEmail: 'Both the account owner and the person named on this application (in Welsh)',
  errors: {
    contactPreferenceType: {
      required: 'Select an option (in Welsh)',
    },
  },
};

describe('contact-preferences', () => {
  const commonContent = { language: 'en' } as CommonContent;

  let generatedContent;
  let form;
  let fields;

  beforeEach(() => {
    generatedContent = generateContent(commonContent);
    form = generatedContent.form as FormContent;
    fields = form.fields as FormFields;
  });

  test('should return correct english content', () => {
    expect(generatedContent.serviceName).toEqual(en.serviceName);
    expect(generatedContent.label).toEqual(en.label);
    expect(generatedContent.accountOwner).toEqual(en.accountOwner);
    expect(generatedContent.namedPerson).toEqual(en.namedPerson);
    expect(generatedContent.bothReceiveEmail).toEqual(en.bothReceiveEmail);
    expect(generatedContent.errors).toEqual(en.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy' });
    expect(generatedContent.serviceName).toEqual(cy.serviceName);
    expect(generatedContent.label).toEqual(cy.label);
    expect(generatedContent.accountOwner).toEqual(cy.accountOwner);
    expect(generatedContent.namedPerson).toEqual(cy.namedPerson);
    expect(generatedContent.bothReceiveEmail).toEqual(cy.bothReceiveEmail);
    expect(generatedContent.errors).toEqual(cy.errors);
  });

  /* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
  test('should contain contactPreferenceType field', () => {
    generatedContent = generateContent(commonContent);
    const field = fields.contactPreferenceType as FormOptions;
    expect(field.type).toBe('radios');
    expect(field.classes).toBe('govuk-radios');
    expect((field.label as Function)(generatedContent)).toBe(en.label);

    expect((field.values[0].label as Function)(generatedContent)).toBe(en.accountOwner);
    expect(field.values[0].value).toBe(ContactPreference.ACOOUNT_OWNER);

    expect((field.values[1].label as Function)(generatedContent)).toBe(en.namedPerson);
    expect(field.values[1].value).toBe(ContactPreference.NAMED_PERSON);

    expect((field.values[2].label as Function)(generatedContent)).toBe(en.bothReceiveEmail);
    expect(field.values[2].value).toBe(ContactPreference.BOTH_RECEIVE);

    expect(field.validator).toBe(isFieldFilledIn);
  });

  test('should contain continue button', () => {
    expect((form.submit.text as Function)(generateContent(commonContent))).toBe(en.continue);
  });
});
