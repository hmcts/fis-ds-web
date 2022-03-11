import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import { FIND_ADDRESS, MANUAL_ADDRESS } from '../../../urls';

const en = selectAddressContent => ({
  section: 'Applicant',
  title: "What's your home address?",
  errors: {
    applicant1SelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: FIND_ADDRESS,
  cantFindAddressUrl: MANUAL_ADDRESS,
});

const cy = selectAddressContent => ({
  section: 'Applicant (in welsh)',
  title: "What's your home address? (in welsh)",
  errors: {
    applicant1SelectAddress: selectAddressContent.errors.selectAddress,
  },
  changePostCodeUrl: FIND_ADDRESS,
  cantFindAddressUrl: MANUAL_ADDRESS,
});

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  fields: {
    applicant1SelectAddress: selectAddressFormFields.selectAddress,
  },
  submit: {
    text: l => l.continue,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language](selectAddressContent);
  return {
    ...selectAddressContent,
    ...translations,
    form,
  };
};
