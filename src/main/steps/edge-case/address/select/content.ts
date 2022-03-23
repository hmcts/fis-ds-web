import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import {FIND_ADDRESS, MANUAL_ADDRESS } from '../../../urls';

const en = ({ selectAddressContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant';
  return {
    section,
    title: "What's your home address?",
    errors: {
      applicant1SelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: FIND_ADDRESS,
    cantFindAddressUrl: MANUAL_ADDRESS,
  };
};

const cy = ({ selectAddressContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant (in Welsh)';
  return {
    section,
    title: "What's your home address? (in Welsh)",
    errors: {
      applicant1SelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: FIND_ADDRESS,
    cantFindAddressUrl: MANUAL_ADDRESS,
  };
};

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    applicant1SelectAddress: selectAddressFormFields.selectAddress,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  console.log("Conent-->", content.userCase);
  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language]({ selectAddressContent, userCase: content.userCase });

  return {
    ...selectAddressContent,
    ...translations,
    form,
  };
};
