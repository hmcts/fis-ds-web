import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { ErrorMessages, ErrorMessagesWelsh } from '../../../../steps/errorMesages';

const en = () => ({
  continue: 'Continue to payment',
  serviceName: 'Statement Of truth',
  one: 'I believe that the facts stated in this application are true',
  confirmStatement: "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth'",
  errors: {
    statementOfTruth: {
      required: ErrorMessages.STATEMENTOFTRUTH_ERROR_MESSAGE,
    },
  },
});

const cy = () => ({
  continue: 'Continue to payment',
  one: 'I believe that the facts stated in this application are true',
  confirmStatement: "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth'",
  errors: {
    statementOfTruth: {
      required: ErrorMessagesWelsh.STATEMENTOFTRUTH_ERROR_MESSAGE,
    },
  },
});

export const form: FormContent = {
  fields: {
    statementOfTruth: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      label: l => l.label,
      values: [
        { label: l => l.one, value: 'statementOfTruth' }
      ],
      validator: isFieldFilledIn,
    },
    confirmStatementLabel: {
      type: 'label',
      label: l => l.confirmStatement
    },
  },

submit: {
    text: b => b.continue,
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
