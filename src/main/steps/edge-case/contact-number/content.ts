import { EmailAddress } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isEmailValid } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

export const form: FormContent = {
  fields: {
    homePhone: {
      type: 'text',
      classes: 'govuk-input',
      label: l => l.homePhoneLabel,
      hint: h => h.homePhoneHint,

      values: [{ label: l => l.homePhone, value: EmailAddress.EMAIL_ADDRESS }],
      validator: value => isEmailValid(value),
    },
    mobilePhone: {
          type: 'text',
          classes: 'govuk-input',
          label: l => l.mobilePhoneLabel,
          hint: h => h.mobilePhoneHint,

          values: [{ label: l => l.mobilePhone, value: EmailAddress.EMAIL_ADDRESS }],
          validator: value => isEmailValid(value),
        },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('contact-number');
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
    form,
  };
};
