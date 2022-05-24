import { FormContent, FormFieldsFn, FormFields } from '../../../../app/form/Form';
import { ResourceReader } from '../../../../modules/resourcereader/ResourceReader';
import { TranslationFn } from '../../../../app/controller/GetController';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../common/components/address-lookup';
import { MANUAL_ADDRESS } from '../../../urls';


const addressLookupFormFields = addressLookupForm.fields as FormFields;

export const form: FormContent = {
  ...addressLookupForm,
  fields: {
    applicant1AddressPostcode: addressLookupFormFields.addressPostcode,
  },

  fields: (addressLookupForm) => {
    return {
      ...addressLookupForm,
      applicant1AddressPostcode: addressLookupFormFields.addressPostcode
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader('address-lookup/translation.json');
  const Translations = resourceLoader.getFileContents().translations;

  const en = () => {
    return {
      ...Translations.en,
      errors: {
        applicant1AddressPostcode: addressLookupContent.errors.addressPostcode,
      },
      manualAddressUrl: MANUAL_ADDRESS,
    };
  };
  const cy = () => {
    return {
      ...Translations.cy,
      errors: {
        applicant1AddressPostcode: addressLookupContent.errors.addressPostcode,
      },
      manualAddressUrl: MANUAL_ADDRESS,
    };
  };

  const languages = {
    en,
    cy,
  };
  
  const translations = languages[content.language]();
  const addressLookupContent = addressLookupGenerateContent(content);
  return {
    ...addressLookupContent,
    ...translations,
    form: { ...form, fields: (form.fields as FormFieldsFn)(content.userCase || {}) },
  };
};

