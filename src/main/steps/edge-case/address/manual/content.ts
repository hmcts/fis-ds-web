import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent, FormFields } from '../../../../app/form/Form';
import {
  form as manualAddressForm,
  generateContent as manualAddressGenerateContent,
} from '../../../common/components/address-manual';

const en = ({ manualAddressContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant';
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section,
    serviceName: 'Apply to ' + title,
    title: "What's your address?",
    errors: {
      applicantAddress1: manualAddressContent.errors.address1,
      applicantAddressTown: manualAddressContent.errors.addressTown,
      applicantAddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const cy = ({ manualAddressContent, userCase }): Record<string, unknown> => {
  const section = 'Applicant (in welsh)';
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section,
    serviceName: 'Apply to ' + title + ' (in Welsh)',
    title: "What's your address? (in welsh)",
    errors: {
      applicantAddress1: manualAddressContent.errors.address1,
      applicantAddressTown: manualAddressContent.errors.addressTown,
      applicantAddressPostcode: manualAddressContent.errors.addressPostcode,
    },
  };
};

const manualAddressFormFields = manualAddressForm.fields as FormFields;
export const form: FormContent = {
  ...manualAddressForm,
  fields: {
    applicantAddress1: manualAddressFormFields.address1,
    applicantAddress2: manualAddressFormFields.address2,
    applicantAddressTown: manualAddressFormFields.addressTown,
    applicantAddressCounty: manualAddressFormFields.addressCounty,
    applicantAddressPostcode: manualAddressFormFields.addressPostcode,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  const manualAddressContent = manualAddressGenerateContent(content);
  const translations = languages[content.language]({ manualAddressContent, userCase: content.userCase });

  return {
    ...manualAddressContent,
    ...translations,
    form,
  };
};
