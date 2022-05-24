import { FormContent, FormFieldsFn, FormFields } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { TranslationFn } from '../../../app/controller/GetController';
import { ErrorMessages, ErrorMessagesWelsh } from '../../../steps/errorMesages';
import { form as fullNameForm, generateContent as fullNameGenerateContent } from '../../common/components/full-name';

const fullNameFormFields = fullNameForm.fields as FormFields;

export const form: FormContent = {
  fields: () => {
    return {
      applicant1FirstNames: fullNameFormFields.firstNames,
      applicant1LastNames: fullNameFormFields.lastNames,
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('full-name/translation.json');
  const Translations = resourceLoader.getFileContents().translations;

  const en = () => {
    return {
      ...Translations.en,
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
  const cy = () => {
    return {
      ...Translations.cy,
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

  const languages = {
    en,
    cy,
  };
  const translations = languages[content.language]();
  const fullNameContent = fullNameGenerateContent(content);
  return {
    ...fullNameContent,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
