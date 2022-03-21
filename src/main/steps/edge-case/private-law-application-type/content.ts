import { isFieldFilledIn } from '../../../app/form/validation';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';

const en = () => ({
  continue: 'Continue',
  serviceName: 'Private law',
  label: 'Select the type of private law you want to apply for',
  one: 'Female Genital Mutilation Orders(FGM)',
  oneHint: 'A court order to protect a female at risk of FGM',
  two: 'Forced Marriage Protection Order(FMPO)',
  twoHint: 'A court order to protect you or someone else from the consequences of a forced marriage',
  three: 'Special Guardianship',
  threeHint: 'A court order placing a child to live with someone other than their parents',
  four: 'Financial applications',
  fourHint:'If you are applying for financial order under Schedule 1 of the Children Act 1989',
  five: 'Declaration of parentage',
  fiveHint: 'Ask the court to declare whether or not someone is parent of another named person',
  errors: {
    applyingWith: {
      required: 'Select if any of the type of private law you want to apply for',
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  serviceName: 'Private law (in welsh)',
  label: 'Select the type of private law you want to apply for (in welsh)',
  one: 'Female Genital Mutilation Orders(FGM) (in welsh)',
  oneHint: 'A court order to protect a female at risk of FGM',
  two: 'Forced Marriage Protection Order(FMPO) (in welsh)',
  twoHint: 'A court order to protect you or someone else from the consequences of a forced marriage (in welsh)',
  three: 'Special Guardianship (in welsh)',
  threeHint: 'A court order placing a child to live with someone other than their parents (in welsh)',
  four: 'Financial applications (in welsh)',
  fourHint:'If you are applying for financial order under Schedule 1 of the Children Act 1989 (in welsh)',
  five: 'Declaration of parentage (in welsh)',
  fiveHint: 'Ask the court to declare whether or not someone is parent of another named person (in welsh)',
  errors: {
    applyingWith: {
      required: 'Select if any of the type of private law you want to apply for (in welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.one, value: 'genitalMutliationOrdersFGM',
           hint: l => l.oneHint },
        { label: l => l.two, value: 'forcedProtectionMarriageOrderFMPO',
           hint: l => l.twoHint },
        { label: l => l.three, value: 'specialGuardianship',
           hint: l => l.threeHint },
        { label: l => l.four, value: 'financialApplications',
           hint: l => l.fourHint },
        { label: l => l.five, value: 'declarationOfParentage',
           hint: l => l.fiveHint },
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
