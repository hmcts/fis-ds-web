import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ErrorMessages,ErrorMessagesWelsh } from '../../../steps/errorMesages';
import { LabelMessages,LabelMessagesWelsh,HintMessages,HintMessagesWelsh } from '../../../steps/labelMessages';


const en = () => ({
  continue: 'Continue',
  serviceName: 'Private law',
  label: LabelMessages.PRL_LABEL,
  one: LabelMessages.PRL_ONE,
  oneHint: HintMessages.PRL_ONE_HINT,
  two: LabelMessages.PRL_TWO,
  twoHint: HintMessages.PRL_TWO_HINT,
  three: LabelMessages.PRL_THREE,
  threeHint: HintMessages.PRL_THREE_HINT,
  four: LabelMessages.PRL_FOUR,
  fourHint: HintMessages.PRL_FOUR_HINT,
  five: LabelMessages.PRL_FIVE,
  fiveHint: HintMessages.PRL_FIVE_HINT,
  errors: {
    applyingWith: {
      required: ErrorMessages.PRL_ERROR_MESSAGE,
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  serviceName: 'Private law (in welsh)',
  label: LabelMessagesWelsh.PRL_LABEL,
  one: LabelMessagesWelsh.PRL_ONE,
  oneHint:HintMessagesWelsh.PRL_ONE_HINT,
  two: LabelMessagesWelsh.PRL_TWO,
  twoHint:HintMessagesWelsh.PRL_TWO_HINT,
  three:LabelMessagesWelsh.PRL_THREE,
  threeHint:HintMessagesWelsh.PRL_THREE_HINT,
  four: LabelMessagesWelsh.PRL_FOUR,
  fourHint:HintMessagesWelsh.PRL_FOUR_HINT ,
  five: LabelMessagesWelsh.PRL_FIVE,
  fiveHint:HintMessagesWelsh.PRL_FIVE_HINT,
  errors: {
    applyingWith: {
      required: ErrorMessagesWelsh.PRL_ERROR_MESSAGE,
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWith: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.one, value: 'genitalMutliationOrdersFGM', hint: l => l.oneHint },
        { label: l => l.two, value: 'forcedProtectionMarriageOrderFMPO', hint: l => l.twoHint },
        { label: l => l.three, value: 'specialGuardianship', hint: l => l.threeHint },
        { label: l => l.four, value: 'financialApplications', hint: l => l.fourHint },
        { label: l => l.five, value: 'declarationOfParentage', hint: l => l.fiveHint },
      ],
      validator: isFieldFilledIn,
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

export const generateContent: TranslationFn = content => {
  const translations = languages[content.language]();
  return {
    ...translations,
    form,
  };
};
