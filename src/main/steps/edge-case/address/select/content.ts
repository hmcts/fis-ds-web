import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields, FormFieldsFn } from '../../../../app/form/Form';
import { ResourceReader } from '../../../../modules/resourcereader/ResourceReader';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import { FIND_ADDRESS, MANUAL_ADDRESS } from '../../../urls';

const selectAddressFormFields = selectAddressForm.fields as FormFields;

export const form: FormContent = {
  ...selectAddressForm,
  fields: () => {
    return {
      applicant1SelectAddress: selectAddressFormFields.selectAddress,
    };
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('select-address');
  const Translations = resourceLoader.getFileContents().translations;
  const errors = resourceLoader.getFileContents().errors;

  const en = () => {
    return {
      ...Translations.en,
      errors: {
        ...errors.en,
      },
      changePostCodeUrl: FIND_ADDRESS,
      cantFindAddressUrl: MANUAL_ADDRESS,
    };
  };
  const cy = () => {
    return {
      ...Translations.cy,
      errors: {
        ...errors.cy,
      },
      changePostCodeUrl: FIND_ADDRESS,
      cantFindAddressUrl: MANUAL_ADDRESS,
    };
  };

  const languages = {
    en,
    cy,
  };

  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language]();

  return {
    ...selectAddressContent,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};
