import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  continue: 'Continue',
  label: 'Select Jurisdiction',
  one: 'Family',
  two: 'Tribunals',
  errors: {
    applyingWith: {
      required: 'Select the jurisdiction type',
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
      required: 'Select the jurisdiction type (in welsh)',
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
        { label: l => l.two, value: 'tribunals' },
      ],
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
