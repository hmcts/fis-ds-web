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
    applyingWithAdoption: {
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
    applyingWithAdoption: {
      required: ErrorMessagesWelsh.ADOPTION_ERROR_MESSAGE,
    },
  },
});

export const form: FormContent = {
  fields: {
    applyingWithAdoption: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      values: [
        { label: l => l.one, value: LabelMessages.ADOPTION_ONE, hint: l => l.oneHint },
        { label: l => l.two, value: LabelMessages.ADOPTION_TWO, hint: l => l.twoHint },
        { label: l => l.three, value: LabelMessages.ADOPTION_THREE, hint: l => l.threeHint },
        { label: l => l.four, value: LabelMessages.ADOPTION_FOUR, hint: l => l.fourHint },
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
