import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';

import { AdditonalFormSummary, UploadFormSummary, applicantSummaryList } from './utils';

export const enContent = {
  section: '',
  title: 'Check your Answers',
  change: 'change',
  sectionTitles: {
    applicantDetails: 'Applicant details',
    abc: 'xyz',
  },
  keys: {
    phoneNumber: 'Phone number',
    emailAddress: 'Contact number of the person named on the application',
    fullName: 'Subject’s name',
    dateOfBirth: 'Subject’s DoB',
    address: ' Address',
    recievingEmail: 'Who should receive emails about the application',
    namedPersonEmail: 'Email address of the person named on the application',
    namedPersonTel: 'Contact number of the person named on the application',
    uploadDocuments: 'List of forms uploaded (Application form)',
    additionalDocuments: 'List of Documents uploaded (supporting documents)',
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const caseDocuments = content.caseDocuments!;

  return {
    ...enContent,
    language: content.language,
    sections: [
      applicantSummaryList(enContent, userCase),
      UploadFormSummary(enContent, caseDocuments),
      AdditonalFormSummary(enContent, userCase),
    ],
  };
};

const cyContent: typeof enContent = {
  section: 'Adolygu eich cais',
  title: 'Adolygu eich atebion',
  change: 'change',
  sectionTitles: {
    applicantDetails: 'Manylion y ceisydd',
    abc: 'xyz',
  },
  keys: {
    phoneNumber: 'Rhif ffôn',
    emailAddress: 'Cyfeiriad e-bost',
    fullName: 'Enw llawn',
    dateOfBirth: 'Dyddiad geni',
    address: 'Cyfeiriad',
    recievingEmail: 'Who should receive emails about the application',
    namedPersonEmail: 'Email address of the person named on the application',
    namedPersonTel: 'Contact number of the person named on the application',
    uploadDocuments: 'Application form(s)',
    additionalDocuments: 'Supporting document(s)',
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [applicantSummaryList(cyContent, userCase)],
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
