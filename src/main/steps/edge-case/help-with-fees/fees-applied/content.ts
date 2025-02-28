import { YesOrNo } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { isFieldFilledIn, isTextAreaValid } from '../../../../app/form/validation';
import { loadResources } from '../../../../steps/edge-case/util';

export * from './routeGuard';

const FEES_APPLIED_FILE = '/fees-applied';

export const form: FormContent = {
  fields: {
    feesAppliedDetails: {
      type: 'radios',
      classes: 'govuk-radios',
      values: [
        {
          label: l => l.yes,
          value: YesOrNo.YES,
          subFields: {
            helpWithFeesReferenceLabel: {
              type: 'textAndHtml',
              textAndHtml: l =>
                `<h3 class="govuk-heading-m">${l.hwfReferenceNumberLabel}</h3>${l.hwfReferenceNumberBody}`,
            },
            helpWithFeesReferenceNumber: {
              type: 'text',
              hint: l => l.hwfReferenceNumberHint,
              classes: 'govuk-input--width-10',
              validator: value => isFieldFilledIn(value) || isTextAreaValid(value),
            },
          },
        },
        {
          label: l => l.no,
          value: YesOrNo.NO,
          subFields: {
            noHwfLabel: {
              type: 'textAndHtml',
              textAndHtml: l => l.noHwfLabel,
            },
          },
        },
      ],
      validator: isFieldFilledIn,
    },
  },
  submit: {
    text: l => l.continue,
  },
  cancel: {
    text: l => l.cancelApplication,
    classes: 'govuk-button--warning',
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = loadResources(FEES_APPLIED_FILE);
  const translations = resourceLoader.getFileContents().translations[content.language];
  return {
    ...translations,
    form,
  };
};
