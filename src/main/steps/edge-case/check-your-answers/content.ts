import { TranslationFn } from '../../../app/controller/GetController';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../../steps/common/common.content';

import { applicantSummaryList } from './utils';

export const enContent = {
  section: 'Review your application',
  title: 'Review your answers',
  sectionTitles: {
    applicantDetails: "Applicant's details",
  },
  keys: {
    phoneNumber: 'Phone number',
    emailAddress: 'Email address',
    fullName: 'Full name',
    dateOfBirth: 'Date of birth',
    address: 'Address',
  },
};

const en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...enContent,
    language: content.language,
    sections: [
      applicantSummaryList(enContent, userCase),
    ],
  };
};

const cyContent: typeof enContent = {
  section: 'Adolygu eich cais',
  title: 'Adolygu eich atebion',
  sectionTitles: {
    applicantDetails: 'Manylion y ceisydd',
  },
  keys: {
    phoneNumber: 'Rhif ffôn',
    emailAddress: 'Cyfeiriad e-bost',
    fullName: 'Enw llawn',
    dateOfBirth: 'Dyddiad geni',
    address: 'Cyfeiriad',
  },
};

const cy: typeof en = (content: CommonContent) => {
  const userCase = content.userCase!;
  return {
    ...cyContent,
    language: content.language,
    sections: [
      applicantSummaryList(cyContent, userCase),
    ],
  };
};

export const form: FormContent = {
  fields: {
  },
  submit: {
    text: l => l.continue,
  }
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
