import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';

const en = () => ({
  continue: 'Continue',
  label: 'Select Jurisdiction',
  one: 'Family',
  two: 'Tribunals',
  hint: 'This is the area of law your application sits under. For example adoption and child custody are under family law, genter recognition and disputes are under tribunals',
  errors: {
    citizenHome: {
      required: 'Select Jurisdiction Type',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  label: 'Select Jurisdiction (in welsh)',
  one: 'Family (in welsh)',
  two: 'Tribunals (in welsh)',
  errors: {
    citizenHome: {
      required: 'Select Jurisdiction Type (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    citizenHome: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      hint: h => h.hint,
      values: [
        { label: l => l.one, value: 'family' },
        { label: l => l.two, value: 'tribunals' },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  cancel: {
    text: c => c.cancel,
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
