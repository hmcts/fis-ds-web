import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  continue: 'Continue',
  label: 'Adoption Application Type',
  one: 'International Adoption',
  two: 'Relinquished Adoption',
  three: 'Step-parent Adoption',
  four: 'Parental Orders',
  errors: {
    applyingWith: {
      required: 'Select the Adoption Application type',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  label: 'Adoption Application Type (in welsh)',
  one: 'International Adoption (in welsh)',
  two: 'Relinquished Adoption (in welsh)',
  three: 'Step-parent Adoption (in welsh)',
  four: 'Parental Orders (in welsh)',
  errors: {
    applyingWith: {
      required: 'Select the Adoption Application type (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    adoptionApplicationType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.one, value: 'internationalAdoption' },
        { label: l => l.two, value: 'relinquishedAdoption' },
        { label: l => l.three, value: 'stepParentAdoption' },
        { label: l => l.four, value: 'parentalOrders' },
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
