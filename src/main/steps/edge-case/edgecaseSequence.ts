import { Sections, Step } from '../constants';
import {
  ADDITIONAL_DOCUMENTS_UPLOAD,
  CONTACT_DETAILS,
  CONTACT_PREFERENCES,
  DATE_OF_BIRTH,
  FIND_ADDRESS,
  FULL_NAME,
  MANUAL_ADDRESS,
  PAY_YOUR_FEE,
  REVIEW_PAY_SUBMIT,
  SELECT_ADDRESS,
  STATEMENT_OF_TRUTH,
  UPLOAD_YOUR_DOCUMENTS,
  USER_ROLE,
} from '../urls';

export const edgecaseSequence: Step[] = [
  {
    url: USER_ROLE,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => FULL_NAME,
  },
  {
    url: FULL_NAME,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => DATE_OF_BIRTH,
  },

  {
    url: DATE_OF_BIRTH,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => FIND_ADDRESS,
  },
  {
    url: FIND_ADDRESS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => SELECT_ADDRESS,
  },
  {
    url: SELECT_ADDRESS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => CONTACT_PREFERENCES,
  },
  {
    url: MANUAL_ADDRESS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => CONTACT_PREFERENCES,
  },
  {
    url: CONTACT_PREFERENCES,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => CONTACT_DETAILS,
  },
  {
    url: CONTACT_DETAILS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => UPLOAD_YOUR_DOCUMENTS,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => ADDITIONAL_DOCUMENTS_UPLOAD,
  },
  {
    url: ADDITIONAL_DOCUMENTS_UPLOAD,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => STATEMENT_OF_TRUTH,
  },
  {
    url: STATEMENT_OF_TRUTH,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PAY_YOUR_FEE,
  },
  {
    url: PAY_YOUR_FEE,
    getNextStep: () => REVIEW_PAY_SUBMIT,
  },
];
