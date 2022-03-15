import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  continue: 'Continue',
  label: 'Private Law Application Type',
  one: 'Genital Mutliation Orders(FGM)',
  two: 'Forced Protection Marriage Order(FMPO)',
  three: 'Special Guardianship',
  four: 'Financial Applications',
  five: 'Declaration of Parentage',
  errors: {
    applyingWith: {
      required: 'Private Law Application Type',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  label: 'Private Law Application Type (in welsh)',
  one: 'Genital Mutliation Orders(FGM) (in welsh)',
  two: 'Forced Protection Marriage Order(FMPO) (in welsh)',
  three: 'Special Guardianship (in welsh)',
  four: 'Financial Applications (in welsh)',
  five: 'Declaration of Parentage (in welsh)',
  errors: {
    applyingWith: {
      required: 'Private Law Application Type',
    },
  },
});

export const form: FormContent = {
  fields: {
    privateLawApplicationType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      values: [
        { label: l => l.one, value: 'genitalMutliationOrdersFGM' },
        { label: l => l.two, value: 'forcedProtectionMarriageOrderFMPO' },
        { label: l => l.two, value: 'specialGuardianship' },
        { label: l => l.two, value: 'financialApplications' },
        { label: l => l.two, value: 'declarationOfParentage' },
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
