import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  continue: 'Continue',
  label: 'Service Type',
  one: 'Adoption',
  two: 'Private Law',
  errors: {
    serviceType: {
      required: 'Select the Service type',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  label: 'Service Type (in welsh)',
  one: 'Adoption (in welsh)',
  two: 'Private Law (in welsh)',
  errors: {
    serviceType: {
      required: 'Select the Service type (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    serviceType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.one, value: 'adoption' },
        { label: l => l.two, value: 'privateLaw' },
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
