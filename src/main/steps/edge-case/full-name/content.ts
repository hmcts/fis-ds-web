import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
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
  resourceLoader.Loader('full-name');
  const Translations = resourceLoader.getFileContents().translations;
  const errors = resourceLoader.getFileContents().errors;

  const en = () => {
    return {
      ...Translations.en,
      errors: {
        ...errors.en,
      },
    };
  };
  const cy = () => {
    return {
      ...Translations.cy,
      errors: {
        ...errors.cy,
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
