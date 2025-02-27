import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn, isPhoneNoValid } from '../../../app/form/validation';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

export const form: FormContent = {
  fields: {
    applicantPhoneNumber: {
      type: 'text',
      classes: 'govuk-input',
      label: ml => ml.mobilePhoneLabel,
      validator: value => {
        return isFieldFilledIn(value) || isPhoneNoValid(value);
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
  const translations = resourceLoader.getFileContents();

  return {
    ...translations?.translations?.[content.language],
    errors: {
      ...translations?.errors?.[content.language],
    },
    form,
  };
};
