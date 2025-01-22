import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { generateContent as fullNameGenerateContent } from '../../common/components/full-name';

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('help-with-fee');
  const translations = resourceLoader.getFileContents().translations;

  const en = () => {
    return {
      ...translations.en,
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
    };
  };

  const languages = {
    en,
    cy,
  };
  const translationContent = languages[content.language]();
  const fullNameContent = fullNameGenerateContent(content);
  return {
    ...fullNameContent,
    ...translationContent,
    form,
  };
};
