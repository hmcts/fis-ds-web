import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

export const stringToHTML = function (str) {
const parser = new DOMParser();
const doc = parser.parseFromString(str.value, 'text/html');
return doc.body.textContent?.toString();
};

export const form: FormContent = {
  fields: {
    statementOfTruth: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      label: l => l.label,
      values: [{ label: l => l.statementOfTruthLabel }],
      validator: isFieldFilledIn,
    },
    confirmStatement: {
      type: 'label',
      label: l => l.confirmStatement,
    },
 },
  submit: {
    classes: 'govuk-!-margin-top-5',
    text: s => s.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('statement-of-truth');
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
  return {
    ...translations,
    form: { ...form,
    },
  };
};
