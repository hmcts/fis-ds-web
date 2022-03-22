import { Sections, Step } from '../constants';
import {
  ADOPTION_APPLICATION_TYPE,
  CITIZEN_HOME_URL,
  DATE_OF_BIRTH,
  FIND_ADDRESS,
  FULL_NAME,
  MANUAL_ADDRESS,
  PRIVATE_LAW_APPLICATION_TYPE,
  SELECT_ADDRESS,
  SERVICE_TYPE,
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
    getNextStep: () => ADOPTION_APPLICATION_TYPE,
  },
  {
    url: ADOPTION_APPLICATION_TYPE,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => PRIVATE_LAW_APPLICATION_TYPE,
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
    getNextStep: () => MANUAL_ADDRESS,
  },
  {
    url: MANUAL_ADDRESS,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => CITIZEN_HOME_URL,
  },
];
