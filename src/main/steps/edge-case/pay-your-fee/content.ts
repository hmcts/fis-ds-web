import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { interpolate } from '../../../steps/common/string-parser';
import { PAYMENT_GATEWAY_ENTRY_URL } from '../../../steps/urls';
import { loadResources } from '../util';
export * from './routeGuard';

const PAY_YOUR_FEE_FILE = 'pay-your-fee';

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.payAndSubmitButton,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = loadResources(PAY_YOUR_FEE_FILE);
  const translations = resourceLoader.getFileContents().translations[content.language];
  const caseId = content.userCase?.id;

  return {
    ...translations,
    errors: {
      ...translations.errors,
      paymentError: {
        ...translations.errors.paymentError,
        applicationNotSubmitted: interpolate(translations.errors.paymentError.applicationNotSubmitted, {
          caseId: caseId!,
        }),
      },
    },
    form,
    paymentUrl: PAYMENT_GATEWAY_ENTRY_URL,
  };
};
