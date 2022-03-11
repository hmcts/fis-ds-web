import { Sections, Step } from '../constants';
import * as Urls from '../urls';

export const edgecaseSequence: Step[] = [
  {
    url: Urls.CITIZEN_HOME_URL,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => Urls.SELECT_JURISDICTION,
  },
  {
    url: Urls.SELECT_JURISDICTION,
    showInSection: Sections.AboutEdgeCase,
    getNextStep: () => Urls.CITIZEN_HOME_URL,
  },
];
