import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isPhoneNoValid } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

export const form: FormContent = {
  fields: {
    homePhoneNumber: {
      type: 'text',
      classes: 'govuk-input',
      label: hl => hl.homePhoneLabel,
      hint: hh => hh.homePhoneHint,
      validator: (value, formData) => {
        const hasHomePhoneNumberEntered = (value as string[])?.length && (value as string) !== '[]';
        const hasMobilePhoneNumberEntered = formData.mobilePhoneNumber && !!formData.mobilePhoneNumber?.length;

        if (!hasHomePhoneNumberEntered && !hasMobilePhoneNumberEntered) {
          return 'atleastOneRequired';
        }
        return isPhoneNoValid(value);
      },
    },
    mobilePhoneNumber: {
      type: 'text',
      classes: 'govuk-input',
      label: ml => ml.mobilePhoneLabel,
      hint: mh => mh.mobilePhoneHint,
      validator: (value, formData) => {
        const hasMobilePhoneNumberEntered = (value as string[])?.length && (value as string) !== '[]';
        const hasHomePhoneNumberEntered = formData.homePhoneNumber && !!formData.homePhoneNumber?.length;

        if (!hasHomePhoneNumberEntered && !hasMobilePhoneNumberEntered) {
          return 'atleastOneRequired';
        }
        return isPhoneNoValid(value);
      },
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('contact-details');
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
