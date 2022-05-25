import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

export const form: FormContent = {
  fields: () => {
    return { };
  },
  submit: {
    text: s => s.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('statement-of-truth');
  const Translations = resourceLoader.getFileContents().translations;

  const en = () => {
    return {
      ...Translations.en,    
    };
  };
  const cy = () => {
    return {
      ...Translations.cy,
    };
  };

  const languages = {
    en,
    cy,
  };
  const translations = languages[content.language]();
  return {
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
