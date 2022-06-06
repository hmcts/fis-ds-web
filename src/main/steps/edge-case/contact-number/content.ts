import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isPhoneNoValid } from '../../../app/form/validation';
import { CommonContent } from '../../../steps/common/common.content';

export const en = ({ userCase }: CommonContent): Record<string, unknown> => {
  const titleBar = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    label: 'What are your contact details?',
    serviceName: 'Apply to ' + titleBar,
    one: 'I can provide an email address',
    two: 'I can not provide an email address',
    emailAddress: 'Your email address',
    homePhoneNumber: 'Your home phone',
    mobilePhoneNumber: 'Your mobile phone',
    errors: {
      emailAddressConsent: {
        required: 'Please answer the question',
      },
      emailAddress: {
        required: 'Enter your email address',
        invalid: 'Enter a real email address',
      },
      homePhoneNumber: {
        required: 'Enter your home phone number',
        invalid: 'Enter a real home phone number',
      },
      mobilePhoneNumber: {
        required: 'Enter your mobile number',
        invalid: 'Enter a real UK mobile number',
        atleastOneRequired: 'Enter atleast one contact detail out of email, home or mobile phone number',
      },
    },
  };
};

export const cy = ({ userCase }: CommonContent): Record<string, unknown> => {
  const titleBar =
    userCase?.serviceType === 'Yes' ? userCase?.adoptionApplicationType : userCase?.applyingWithPrivateLaw;
  return {
    label: 'What are your contact details? (in welsh)',
    serviceName: 'Apply to ' + titleBar + ' (in welsh)',
    one: 'I can provide an email address (in welsh)',
    two: 'I can not provide an email address (in welsh)',
    emailAddress: 'Your email address (in welsh)',
    homePhoneNumber: 'Your home phone (in welsh)',
    mobilePhoneNumber: 'Your mobile phone (in welsh)',
    errors: {
      emailAddressConsent: {
        required: 'Please answer the question (in welsh)',
      },
      emailAddress: {
        required: 'Enter your email address (in welsh)',
        invalid: 'Enter a real email address (in welsh)',
      },
      homePhoneNumber: {
        required: 'Enter your home phone number (in welsh)',
        invalid: 'Enter a real home phone number (in welsh)',
      },
      mobilePhoneNumber: {
        required: 'Enter your mobile number (in welsh)',
        invalid: 'Enter a real UK mobile number (in welsh)',
        atleastOneRequired: 'Enter atleast one contact detail out of email, home or mobile phone number (in welsh)',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    homePhoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.homePhoneNumber,
      labelSize: null,
      validator: value => isPhoneNoValid(value),
    },
    mobilePhoneNumber: {
      type: 'text',
      classes: 'govuk-input--width-20',
      label: l => l.mobilePhoneNumber,
      labelSize: null,
      validator: (value, formData) => {
        const hasMobilePhoneNumberEntered = (value as string[])?.length && (value as string) !== '[]';
        const hasHomePhoneNumberEntered = formData.homePhoneNumber && !!formData.homePhoneNumber?.length;
        const hasEmailEntered =
          formData.emailAddressConsent?.includes(YesOrNo.YES) &&
          formData.emailAddress &&
          !!formData.emailAddress?.length;

        if (!hasHomePhoneNumberEntered && !hasMobilePhoneNumberEntered && !hasEmailEntered) {
          return 'atleastOneRequired';
        }
        return isPhoneNoValid(value);
      },
    },
  },
  submit: {
    text: l => l.continue,
  },
  cancel: {
    text: l => l.cancel,
  },
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => ({
  ...languages[content.language](content),
  form,
});
