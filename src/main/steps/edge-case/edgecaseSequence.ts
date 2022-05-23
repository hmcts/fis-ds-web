//import { YesOrNo } from '../../app/case/definition';
import { Sections, Step } from '../constants';
import {
  //ADOPTION_APPLICATION_TYPE,
  //CITIZEN_HOME_URL,
  CONTACT_DETAILS,
  DATE_OF_BIRTH,
  FIND_ADDRESS,
  FULL_NAME,
  MANUAL_ADDRESS,
  PAY_YOUR_FEE,
  //PRIVATE_LAW_APPLICATION_TYPE,
  SELECT_ADDRESS,
  //SERVICE_TYPE,
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
    getNextStep: () => UPLOAD_YOUR_DOCUMENTS,
  },
  {
    url: UPLOAD_YOUR_DOCUMENTS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PAY_YOUR_FEE,
  },
  {
    url: PAY_YOUR_FEE,
    getNextStep: () => FULL_NAME,
  },
];
