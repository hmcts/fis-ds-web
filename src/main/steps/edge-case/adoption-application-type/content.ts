import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { ErrorMessages, ErrorMessagesWelsh } from '../../../steps/errorMesages';
import { HintMessages, HintMessagesWelsh, LabelMessages, LabelMessagesWelsh } from '../../../steps/labelMessages';

const en = () => ({
  continue: 'Continue',
  serviceName: 'Adoption',
  label: LabelMessages.ADOPTION_LABEL,
  one: LabelMessages.ADOPTION_ONE,
  oneHint: HintMessages.ADOPTION_ONE_HINT,
  two: LabelMessages.ADOPTION_TWO,
  twoHint: HintMessages.ADOPTION_TWO_HINT,
  three: LabelMessages.ADOPTION_THREE,
  threeHint: HintMessages.ADOPTION_THREE_HINT,
  four: LabelMessages.ADOPTION_FOUR,
  fourHint: HintMessages.ADOPTION_FOUR_HINT,
  errors: {
    applyingWith: {
      required: ErrorMessages.ADOPTION_ERROR_MESSAGE,
    },
  },
});

const cy = () => ({
  continue: 'Continue (in welsh)',
  serviceName: 'Adoption (in welsh)',
  label: LabelMessagesWelsh.ADOPTION_LABEL,
  one: LabelMessagesWelsh.ADOPTION_ONE,
  oneHint: HintMessagesWelsh.ADOPTION_ONE_HINT,
  two: LabelMessagesWelsh.ADOPTION_TWO,
  twoHint: HintMessagesWelsh.ADOPTION_TWO_HINT,
  three: LabelMessagesWelsh.ADOPTION_THREE,
  threeHint: HintMessagesWelsh.ADOPTION_THREE_HINT,
  four: LabelMessagesWelsh.ADOPTION_FOUR,
  fourHint: HintMessagesWelsh.ADOPTION_FOUR_HINT,
  errors: {
    applyingWith: {
      required: ErrorMessagesWelsh.ADOPTION_ERROR_MESSAGE,
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
        { label: l => l.one, value: 'internationalAdoption', hint: l => l.oneHint },
        { label: l => l.two, value: 'relinquishedAdoption', hint: l => l.twoHint },
        { label: l => l.three, value: 'stepParentAdoption', hint: l => l.threeHint },
        { label: l => l.four, value: 'parentalOrders', hint: l => l.fourHint },
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
