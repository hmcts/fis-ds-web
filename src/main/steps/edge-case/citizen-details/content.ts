import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
// import { isEmailValid, isFieldFilledIn} from '../../../app/form/validation';

export const en = (): Record<string, unknown> => ({
  // section: 'Submit to HMCSTS',
  // title: "What's your full name?",
  firstNames: 'First name',
  firstHint: '(Include any given or middle names)',
  lastNames: 'Last name',
  lastHint: '(Include surname or family names)',
  jurisdication: 'Jurisdication',
  adopAgencyContactEmail: 'Email',
  address: 'Address',
  appType: 'Application Type',
  errors: {
    applicant2FirstNames: {
      required: 'Enter your first names',
    },
    applicant2LastNames: {
      required: 'Enter your last names',
    },
  },
});

export const cy = (): Record<string, unknown> => ({
  section: 'Second applicant (in Welsh)',
  title: "What's your full name? (in Welsh)",
  firstNames: 'First names (in Welsh)',
  firstHint: '(Include any given or middle names) (in Welsh)',
  lastNames: 'Last names (in Welsh)',
  lastHint: '(Include surname or family names) (in Welsh)',
  jurisdication: 'Jurisdication',
  errors: {
    applicant2FirstNames: {
      required: 'Enter your first names (in Welsh)',
    },
    applicant2LastNames: {
      required: 'Enter your last names (in Welsh)',
    },
  },
});

export const form: FormContent = {
  fields: {
    applicant2FirstNames: {
      type: 'input',
      label: l => l.firstNames,
      // hint: l => l.firstHint,
      labelSize: 'normal',
      // validator: input => isFieldFilledIn(input),
    },
    applicant2LastNames: {
      type: 'input',
      label: l => l.lastNames,
      // hint: l => l.lastHint,
      labelSize: 'normal',
      // validator: input => isFieldFilledIn(input),
    },
    adopAgencyOrLaContactEmail: {
      type: 'text',
      classes: 'govuk-label govuk-!-width-two-thirds',
      label: l => l.adopAgencyContactEmail,
      labelSize: null,
      // validator: value => isFieldFilledIn(value) || isEmailValid(value) ,
    },
    applicant2Address: {
      type: 'input',
      label: l => l.address,
      // hint: l => l.lastHint,
      labelSize: 'normal',
      // validator: input => isFieldFilledIn(input),
    },
  },
  submit: {
    text: l => l.next,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](),
  form,
});
