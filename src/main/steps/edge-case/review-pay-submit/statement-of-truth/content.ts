import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { ErrorMessages, ErrorMessagesWelsh } from '../../../../steps/errorMesages';

const en = () => ({
  continue: 'Continue to payment',
  serviceName: 'Statement Of truth',
  one: 'I believe that the facts stated in this application are true',
  confirmStatement: "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth'",
  courtContempt: "Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in the truth",
  errors: {
    statementTruth: {
      required: ErrorMessages.JURISDICTION_ERROR_MESSAGE,
    },
  },
});

const cy = () => ({
  continue: 'Continue to payment',
  one: 'I believe that the facts stated in this application are true',
  confirmStatement: "This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'Statement Of Truth'",
  courtContempt: "Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in the truth",
  errors: {
    statementTruth: {
      required: ErrorMessagesWelsh.JURISDICTION_ERROR_MESSAGE,
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
        { label: l => l.one, value: 'statementOfTruth' },
      ],
      validator: isFieldFilledIn,
    },
    confirmStatementLabel: {
      type: 'label',
      label: l => l.confirmStatement,
    },
    courtContemptLabel: {
      type: 'label',
      label: l => l.courtContempt,
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
