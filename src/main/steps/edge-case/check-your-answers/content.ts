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

const en = (content: any) => {
  const userCase = content.userCase!;
  const caseDocuments = content.uploadedDocuments;
  const AdditionalDocuments = content.addtionalDocuments;

  return {
    ...enContent,
    language: content.language,
    sections: [
      applicantSummaryList(enContent, userCase),
      UploadFormSummary(enContent, caseDocuments),
      AdditonalFormSummary(enContent, AdditionalDocuments),
    ],
  };
};

const cyContent: typeof enContent = {
  section: '',
  title: 'Check your Answers - welsh',
  change: 'change - welsh',
  sectionTitles: {
    applicantDetails: 'Applicant details - welsh',
  },
  keys: {
    phoneNumber: 'Phone number - welsh',
    emailAddress: 'Contact number of the person named on the application -welsh',
    fullName: 'Subject’s name -welsh',
    dateOfBirth: 'Subject’s DoB - welsh',
    address: ' Address - welsh',
    recievingEmail: 'Who should receive emails about the application - welsh',
    namedPersonEmail: 'Email address of the person named on the application - welsh',
    namedPersonTel: 'Contact number of the person named on the application - welsh',
    uploadDocuments: 'List of forms uploaded (Application form) - welsh',
    additionalDocuments: 'List of Documents uploaded (supporting documents) - welsh',
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  const caseDocuments = content.uploadedDocuments;
  const AdditionalDocuments = content.addtionalDocuments;

  return {
    ...cyContent,
    language: content.language,
    sections: [
      applicantSummaryList(cyContent, userCase),
      UploadFormSummary(enContent, caseDocuments),
      AdditonalFormSummary(enContent, AdditionalDocuments),
    
    
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
