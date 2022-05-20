import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ErrorMessages, ErrorMessagesWelsh } from '../../../steps/errorMesages';

const en = () => ({
  continue: 'Continue',
  serviceName: "Determine user's role",
  label: 'Are you named as the applicant on the on the application form you are submitting?',
  one: 'Yes',
  two: 'No - I am sending an application for someone else.',
  errors: {
    applyingForSelf: {
      required: ErrorMessages.APPLYINGFORSELF_ERROR_MESSAGE,
    },
  },
});

const cy = () => ({
  continue: 'Continue',
  serviceName: "Determine user's role (in welsh)",
  label: 'Are you named as the applicant on the on the application form you are submitting? (in welsh)',
  one: 'Yes (in welsh)',
  two: 'No - I am sending an application for someone else. (in welsh)',
  errors: {
    applyingForSelf: {
      required: ErrorMessagesWelsh.APPLYINGFORSELF_ERROR_MESSAGE,
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingForSelf: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      selected: false,
      values: [
        { label: l => l.one, value: YesOrNo.YES },
        { label: l => l.two, value: YesOrNo.NO },
      ],
      validator: isFieldFilledIn,
    },
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
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
