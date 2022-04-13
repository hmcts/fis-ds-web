import { CaseWithId } from '../../../../app/case/case';
import { PaymentMethod } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { CommonContent } from '../../../../steps/common/common.content';

const getFeeAmount = (userCase: Partial<CaseWithId>): string => {
  const total = userCase?.applicationFeeOrderSummary?.PaymentTotal;
  return total || '0';
};

export const en = ({ userCase }: CommonContent): Record<string, unknown> => {
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section: 'Review your application, pay and send',
    serviceName: 'Apply to ' + title,
    label: 'Paying your ' + title + ' application court fees',
    hint: `The application court fees total <span class="govuk-!-font-weight-bold">£${getFeeAmount(userCase!)}</span>.
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your application fees.`,
    payingByCard: 'I am paying by card',
    haveHWFRef: 'I have a help with fees reference number',
    hwfRefNumber: 'Enter your help with fees reference number',
    applyForHWF: 'I want to apply for help with fees',
    errors: {
      paymentType: {
        errorRetrievingFee: 'Error in retrieving fee',
        required: 'Select an option',
      },
      hwfRefNumber: {
        required: 'Enter your reference number',
      },
    },
  };
};

export const cy = ({ userCase }: CommonContent): Record<string, unknown> => {
  const title = userCase?.serviceType === 'Yes' ? userCase?.applyingWithAdoption : userCase?.applyingWithPrivateLaw;
  return {
    section: 'Review your application, pay and send (in welsh)',
    serviceName: 'Apply to ' + title + ' (in Welsh)',
    label: 'Paying your ' + title + ' application court fees (in welsh)',
    hint: `The application court fees total <span class="govuk-!-font-weight-bold">£${getFeeAmount(
      userCase!
    )}</span> (in welsh).
  <br>If you have little or no savings, receive certain benefits or have a low income you may be able to get help with your application fees. (in welsh)`,
    payingByCard: 'I am paying by card (in welsh)',
    haveHWFRef: 'I have a help with fees reference number (in welsh)',
    hwfRefNumber: 'Enter your help with fees reference number (in welsh)',
    applyForHWF: 'I want to apply for help with fees (in welsh)',
    errors: {
      paymentType: {
        errorRetrievingFee: 'Error in retrieving fee (in welsh)',
        required: 'Select an option (in welsh)',
      },
      hwfRefNumber: {
        required: 'Enter your reference number (in welsh)',
      },
    },
  };
};

export const form: FormContent = {
  fields: {
    paymentType: {
      type: 'radios',
      classes: 'govuk-radios',
      label: l => l.label,
      section: l => l.section,
      hint: l => l.hint,
      values: [
        { label: l => l.payingByCard, value: PaymentMethod.PAY_BY_CARD },
        {
          label: l => l.haveHWFRef,
          value: PaymentMethod.PAY_BY_HWF,
          subFields: {
            hwfRefNumber: {
              type: 'text',
              classes: 'govuk-!-width-one-third',
              label: l => l.hwfRefNumber,
              labelSize: null,
              validator: isFieldFilledIn,
            },
          },
        },
        { label: l => l.applyForHWF, value: PaymentMethod.APPLY_FOR_HWF },
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
  const translations = languages[content.language](content);
  return {
    ...translations,
    form,
  };
};
