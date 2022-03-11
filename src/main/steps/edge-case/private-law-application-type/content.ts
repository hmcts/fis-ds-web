import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  label: 'Private Law Application Type',
  one: "Genital Mutliation Orders(FGM)",
  two: "Forced Protection Marriage Order(FMPO)",
  three: "Special Guardianship",
  four: "Financial Applications",
  five: "Declaration of Parentage",
  errors: {
    applyingWith: {
      required: 'Select the jurisdiction type',
    },
  },
});

const cy = () => ({
  section: 'Applicant details (in welsh)',
  label: 'Are you applying on your own, or with someone else?(in welsh)',
  one: "I'm applying on my own (in welsh)",
  two: "I'm applying with my spouse or civil partner (in welsh)",
  three: "I'm applying with someone who is not my spouse or civil partner (in welsh)",
  errors: {
    applyingWith: {
      required: 'Select the number of people applying to adopt (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWith: {
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
  }
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
