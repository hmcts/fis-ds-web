/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn } from '../../../../app/form/validation';
import { loadResources } from '../../../../steps/edge-case/util';
export * from './routeGuard';

const NEED_HELP_WITH_FEES_FILE = '/need-help-with-fees';

export const form: FormContent = {
  fields: {
    hwfPaymentSelection: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yesNeedHelpWithFeesPaying,
          value: YesOrNo.YES,
        },
        {
          label: l => l.noNeedHelpWithFeesPaying,
          value: YesOrNo.NO,
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = loadResources(NEED_HELP_WITH_FEES_FILE);
  const translations = resourceLoader.getFileContents().translations[content.language];
  const appRequest = content.additionalData?.req;
  const hasFeeError = appRequest.session.errors.find(error => error.errorType === 'errorFetchingFee');
  form.submit.disabled = hasFeeError;
  return {
    ...translations,
    form,
  };
};
