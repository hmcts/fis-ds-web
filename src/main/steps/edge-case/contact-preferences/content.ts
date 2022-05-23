import { ContactPreference } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

export const en = (): Record<string, unknown> => {
  return {
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
};

export const cy = (): Record<string, unknown> => {
  return {
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
};

export const form: FormContent = {
  fields: {
    contactPreferenceType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.accountOwner, value: ContactPreference.ACOOUNT_OWNER },
        {
          label: l => l.namedPerson,
          value: ContactPreference.NAMED_PERSON,
        },
        { label: l => l.bothReceiveEmail, value: ContactPreference.BOTH_RECEIVE },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
