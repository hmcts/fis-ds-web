import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as addressLookupForm,
  generateContent as addressLookupGenerateContent,
} from '../../../common/components/address-lookup';
import { MANUAL_ADDRESS } from '../../../urls';

const en = ({ addressLookupContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant';
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section,
    serviceName: 'Apply to ' + title,
    title: "What's your home address?",
    errors: {
      applicant1AddressPostcode: addressLookupContent.errors.addressPostcode,
    },
    manualAddressUrl: MANUAL_ADDRESS,
  };
};

const cy = ({ addressLookupContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant (in welsh)';
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section,
    serviceName: 'Apply to ' + title + ' (in Welsh)',
    title: "What's your home address? (in welsh)",
    errors: {
      applicant1AddressPostcode: addressLookupContent.errors.addressPostcode,
    },
    manualAddressUrl: MANUAL_ADDRESS,
  };
};

const addressLookupFormFields = addressLookupForm.fields as FormFields;
export const form: FormContent = {
  ...addressLookupForm,
  fields: {
    applicant1AddressPostcode: addressLookupFormFields.addressPostcode,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const addressLookupContent = addressLookupGenerateContent(content);
  const translations = languages[content.language]({ addressLookupContent, userCase: content.userCase });
  return {
    ...addressLookupContent,
    ...translations,
    form,
  };
};
