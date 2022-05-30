import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as selectAddressForm,
  generateContent as selectAddressGenerateContent,
} from '../../../common/components/address-select';
import { FIND_ADDRESS, MANUAL_ADDRESS } from '../../../urls';

const en = ({ selectAddressContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant';
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section,
    serviceName: 'Apply to ' + title,
    title: "What's your home address?",
    errors: {
      applicantSelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: FIND_ADDRESS,
    cantFindAddressUrl: MANUAL_ADDRESS,
  };
};

const cy = ({ selectAddressContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant (in Welsh)';
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section,
    serviceName: 'Apply to ' + title + ' (in Welsh)',
    title: "What's your home address? (in Welsh)",
    errors: {
      applicantSelectAddress: selectAddressContent.errors.selectAddress,
    },
    changePostCodeUrl: FIND_ADDRESS,
    cantFindAddressUrl: MANUAL_ADDRESS,
  };
};

const selectAddressFormFields = selectAddressForm.fields as FormFields;
export const form: FormContent = {
  ...selectAddressForm,
  fields: {
    applicantSelectAddress: selectAddressFormFields.selectAddress,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const selectAddressContent = selectAddressGenerateContent(content);
  const translations = languages[content.language]({ selectAddressContent, userCase: content.userCase });

  return {
    ...selectAddressContent,
    ...translations,
    form,
  };
};
