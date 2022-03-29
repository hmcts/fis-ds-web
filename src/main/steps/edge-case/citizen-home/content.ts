import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ErrorMessages, ErrorMessagesWelsh } from '../../../steps/errorMesages';

const en = () => ({
  continue: 'Continue',
  label: 'Select Jurisdiction',
  one: 'Family',
  two: 'Tribunals',
  errors: {
    selectJurisdiction: {
      required: ErrorMessages.JURISDICTION_ERROR_MESSAGE,
    },
  },
});

const cy = () => ({
  continue: 'Continue',
  label: 'Select Jurisdiction (in welsh)',
  one: 'Family (in welsh)',
  two: 'Tribunals (in welsh)',
  errors: {
    selectJurisdiction: {
      required: ErrorMessagesWelsh.JURISDICTION_ERROR_MESSAGE,
    },
  },
});

export const form: FormContent = {
  fields: {
    selectJurisdiction: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.one, value: 'family' },
        { label: l => l.two, value: 'tribunals', disabled: true },
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
