import { TYPE_OF_APPLICATION } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent, FormFieldsFn } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

export const form: FormContent = {
  fields: () => {
    return {
      typeOfApplication: {
        type: 'radios',
        classes: 'govuk-radios',
        label: l => l.label,
        selected: false,
        values: [
          { label: l => l.fgm, value: TYPE_OF_APPLICATION.FGM },
          { label: l => l.fmpo, value: TYPE_OF_APPLICATION.FMPO },
          { label: l => l.sg, value: TYPE_OF_APPLICATION.SPECIAL_GUARDIANSHIP },
          { label: l => l.dop, value: TYPE_OF_APPLICATION.DECLARATION_OF_PARENTEGE },
          { label: l => l.po, value: TYPE_OF_APPLICATION.PARENTAL_ORDERS },
        ],
        validator: isFieldFilledIn,
      },
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('type-of-application');
  const translations = resourceLoader.getFileContents().translations;
  const errors = resourceLoader.getFileContents().errors;

  const en = () => {
    return {
      ...translations.en,
      errors: {
        ...errors.en,
      },
    };
  };
  const cy = () => {
    return {
      ...translations.cy,
      errors: {
        ...errors.cy,
      },
    };
  };

  const languages = {
    en,
    cy,
  };
  const translationContent = languages[content.language]();
  return {
    ...translationContent,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
