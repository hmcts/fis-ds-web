import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
//import { CommonContent } from '../../../steps/common/common.content';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';

export const en = (): Record<string, unknown> => {
  const section = 'Applicant';
  return {
    section,
    title: "What's your full name?",
    errors: {
      applicant1FirstNames: {
        required: 'Enter your first names',
      },
      applicant1LastNames: {
        required: 'Enter your last names',
      },
    },
  };
};

export const cy = (): Record<string, unknown> => {
  const section = 'Applicant (in Welsh)';
  return {
    section,
    title: "What's your full name? (in Welsh)",
    errors: {
      applicant1FirstNames: {
        required: 'Enter your first names (in Welsh)',
      },
      applicant1LastNames: {
        required: 'Enter your last names (in Welsh)',
      },
    },
  };
};

const fullNameFormFields = fullNameForm.fields as FormFields;
export const form: FormContent = {
  fields: {
    applicant1FirstNames: fullNameFormFields.firstNames,
    applicant1LastNames: fullNameFormFields.lastNames,
  },
  submit: {
    text: l => l.continue,
  },
  cancel: {
    text: l => l.cancel,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const fullNameContent = fullNameGenerateContent(content);
  return {
    ...fullNameContent,
    ...languages[content.language](),
    form,
  };
};
