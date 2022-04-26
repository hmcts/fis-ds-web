import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  ADOPTION_APPLICATION_TYPE,
  CITIZEN_HOME_URL,
  CONTACT_DETAILS,
  DATE_OF_BIRTH,
  FIND_ADDRESS,
  FULL_NAME,
  MANUAL_ADDRESS,
  PAY_YOUR_FEE,
  PRIVATE_LAW_APPLICATION_TYPE,
  SELECT_ADDRESS,
  SERVICE_TYPE,
  UPLOAD_YOUR_DOCUMENTS,
} from '../urls';

export const edgecaseSequence: Step[] = [
  {
    url: CITIZEN_HOME_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => SERVICE_TYPE,
  },
  {
    url: SERVICE_TYPE,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: data => (data.serviceType === YesOrNo.YES ? ADOPTION_APPLICATION_TYPE : PRIVATE_LAW_APPLICATION_TYPE),
  },
  {
    url: ADOPTION_APPLICATION_TYPE,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => FULL_NAME,
  },
  {
    url: PRIVATE_LAW_APPLICATION_TYPE,
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
    getNextStep: () => CONTACT_DETAILS,
  },
  {
    url: MANUAL_ADDRESS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => CONTACT_DETAILS,
  },
  {
    url: CONTACT_DETAILS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PAY_YOUR_FEE,
  },
  {
    url: PAY_YOUR_FEE,
    getNextStep: () => UPLOAD_YOUR_DOCUMENTS,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => CITIZEN_HOME_URL,
  },
];
