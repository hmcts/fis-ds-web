import _ from 'lodash';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../../steps/common/common.content';

import { AdditonalFormSummary, ApplicantSummaryList, TypeOfApplication, UploadFormSummary, UserRole } from './utils';
const resourceLoader = new ResourceReader();
resourceLoader.Loader('check-your-answers');
const Translations = resourceLoader.getFileContents().translations;

export const enContent = {
  ...Translations.en,
};

const en = (content: any) => {
  const userCase = content.userCase!;
  const caseDocuments = userCase.applicantApplicationFormDocuments;
  const additionalDocuments = userCase.applicantAdditionalDocuments;

  return {
    ...enContent,
    language: content.language,
    sections: [
      TypeOfApplication(enContent, userCase),
      UserRole(enContent, userCase),
      ApplicantSummaryList(enContent, _.get(content, 'additionalData.req.session')),
      UploadFormSummary(enContent, caseDocuments!),
      AdditonalFormSummary(enContent, additionalDocuments!),
    ],
  };
};

const cyContent: typeof enContent = {
  ...Translations.cy,
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const caseDocuments = userCase.applicantApplicationFormDocuments;
  const additionalDocuments = userCase.applicantAdditionalDocuments;

  return {
    ...cyContent,
    language: content.language,
    sections: [
      TypeOfApplication(cyContent, userCase),
      UserRole(cyContent, userCase),
      ApplicantSummaryList(cyContent, _.get(content, 'additionalData.req.session')),
      UploadFormSummary(cyContent, caseDocuments!),
      AdditonalFormSummary(cyContent, additionalDocuments!),
    ],
  };
};

export const form: FormContent = {
  fields: {},
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
