import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isPhoneNoValid } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

export const form: FormContent = {
  fields: {
    applicantHomeNumber: {
      type: 'text',
      classes: 'govuk-input',
      label: l2 => l2.homePhoneLabel,
      validator: (value, formData) => {
        const hasHomePhoneNumberEntered = (value as string[])?.length && (value as string) !== '[]';
        const hasMobilePhoneNumberEntered = formData.applicantPhoneNumber && !!formData.applicantPhoneNumber?.length;

        if (!hasHomePhoneNumberEntered && !hasMobilePhoneNumberEntered) {
          return 'atleastOneRequired';
        }
        return isPhoneNoValid(value);
      },
    },
    applicantPhoneNumber: {
      type: 'text',
      classes: 'govuk-input',
      label: ml => ml.mobilePhoneLabel,
      validator: (value, formData) => {
        const hasMobilePhoneNumberEntered = (value as string[])?.length && (value as string) !== '[]';
        const hasHomePhoneNumberEntered = formData.applicantHomeNumber && !!formData.applicantHomeNumber?.length;

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
