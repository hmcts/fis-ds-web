import _ from 'lodash';

import { YesOrNo } from '../../../app/case/definition';
import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { isFieldFilledIn } from '../../../app/form/validation';
import { isFGMOrFMPOCase, loadResources } from '../util';

export * from './routeGuard';

const STATEMENT_OF_TRUTH_TRANSLATION_FILE = 'statement-of-truth';

export const form: FormContent = {
  fields: {
    applicantStatementOfTruth: {
      type: 'checkboxes',
      classes: 'govuk-checkboxes',
      label: l => l.label,
      values: [{ label: l => l.statementOfTruthLabel, value: 'Yes' }],
      validator: isFieldFilledIn,
    },
    confirmStatement: {
      type: 'label',
      label: l => l.confirmStatement,
    },
  },
  submit: {
    classes: 'govuk-!-margin-top-5',
    text: s => s.submit,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = loadResources(STATEMENT_OF_TRUTH_TRANSLATION_FILE);
  const translations = resourceLoader.getFileContents().translations[content.language];
  const userCase = content.userCase;
  const typeOfApplication = userCase?.edgeCaseTypeOfApplication;

  return {
    ...translations,
    submit:
      isFGMOrFMPOCase(typeOfApplication!) ||
      (userCase?.hwfPaymentSelection === YesOrNo.YES && !_.isEmpty(userCase?.helpWithFeesReferenceNumber))
        ? translations.submitApplication
        : translations.continue ?? translations.continue,
    form,
  };
};
