import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';
import { ErrorMessages, ErrorMessagesWelsh } from '../../../steps/errorMesages';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';

export const en = ({ userCase }: CommonContent): Record<string, unknown> => {
  const section = 'Applicant';
  return {
    section,
    serviceName: 'Full Name',
    title: "What's your full name?",
    errors: {
      applicant1FirstNames: {
        required: ErrorMessages.ENTER_FIRST_NAME,
      },
      applicant1LastNames: {
        required: ErrorMessages.ENTER_LAST_NAME,
      },
    },
  };
};

export const cy = ({ userCase }: CommonContent): Record<string, unknown> => {
  const section = 'Applicant (in Welsh)';
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section,
    serviceName: 'Apply to ' + title + ' (in Welsh)',
    title: "What's your full name? (in Welsh)",
    errors: {
      applicant1FirstNames: {
        required: ErrorMessagesWelsh.ENTER_FIRST_NAME,
      },
      applicant1LastNames: {
        required: ErrorMessagesWelsh.ENTER_LAST_NAME,
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
    ...languages[content.language](content),
    form,
  };
};
