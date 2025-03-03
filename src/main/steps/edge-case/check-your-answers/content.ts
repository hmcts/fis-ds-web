import _ from 'lodash';

import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../../steps/common/common.content';
import { isFGMOrFMPOCase } from '../util';

import {
  AdditonalFormSummary,
  ApplicantSummaryList,
  TypeOfApplication,
  UploadFormSummary,
  UserRole,
  hwfSection,
} from './utils';
const resourceLoader = new ResourceReader();
resourceLoader.Loader('check-your-answers');
const Translations = resourceLoader.getFileContents().translations;

export const enContent = {
  ...Translations.en,
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const caseDocuments = userCase.applicantApplicationFormDocuments;
  const additionalDocuments = userCase.applicantAdditionalDocuments;
  const sections = [TypeOfApplication(enContent, userCase)];

  if (isFGMOrFMPOCase(userCase.edgeCaseTypeOfApplication!)) {
    sections.push(UserRole(enContent, userCase));
  }

  sections.push(ApplicantSummaryList(enContent, _.get(content, 'additionalData.req.session'), content.language));
  if (caseDocuments?.length) {
    sections.push(UploadFormSummary(enContent, caseDocuments));
  }

  if (additionalDocuments?.length) {
    sections.push(AdditonalFormSummary(enContent, additionalDocuments));
  }

  if (!isFGMOrFMPOCase(userCase.edgeCaseTypeOfApplication!)) {
    sections.push(hwfSection(enContent, userCase));
  }

  return {
    ...enContent,
    language: content.language,
    sections,
  };
};

const cyContent: typeof enContent = {
  ...Translations.cy,
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const caseDocuments = userCase.applicantApplicationFormDocuments;
  const additionalDocuments = userCase.applicantAdditionalDocuments;

  const sections = [TypeOfApplication(cyContent, userCase)];

  if (isFGMOrFMPOCase(userCase.edgeCaseTypeOfApplication!)) {
    sections.push(UserRole(cyContent, userCase));
  }

  sections.push(ApplicantSummaryList(cyContent, _.get(content, 'additionalData.req.session'), content.language));
  if (caseDocuments?.length) {
    sections.push(UploadFormSummary(cyContent, caseDocuments));
  }

  if (additionalDocuments?.length) {
    sections.push(AdditonalFormSummary(cyContent, additionalDocuments));
  }

  if (!isFGMOrFMPOCase(userCase.edgeCaseTypeOfApplication!)) {
    sections.push(hwfSection(cyContent, userCase));
  }

  return {
    ...cyContent,
    language: content.language,
    sections,
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
