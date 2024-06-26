import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

const STATEMENT_OF_TRUTH_TRANSLATION_FILE = 'statement-of-truth';

export const form: FormContent = {
  fields: {
    applicantStatementOfTruth: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      label: l => l.label,
      values: [{ label: l => l.statementOfTruthLabel, value: 'Yes' }],
      validator: isFieldFilledIn,
    },
    confirmStatement: {
      type: 'label',
      label: l => l.confirmStatement,
    },
  },
  submit: {
    classes: 'govuk-!-margin-top-5',
    text: s => s.continueC100,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader(STATEMENT_OF_TRUTH_TRANSLATION_FILE);
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
    form: { ...form },
  };
};
