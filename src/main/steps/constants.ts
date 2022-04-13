import { CaseWithId } from '../app/case/case';

import { PageLink } from './urls';

export enum Sections {
  AboutEdgeCase = 'aboutEdgeCase',
}

export interface Step {
  url: string;
  showInSection?: Sections;
  showInCompleteSection?: Sections;
  excludeFromContinueApplication?: boolean;
  getNextStep: (data: Partial<CaseWithId>) => PageLink;
}
export enum FEE_APPLICATION_TYPES {
  APPLY_ADOPTION = 'ApplyAdoption',
  APPLY_PARENT = 'AppnParent',
  PQR = 'PQR',
  SPECIAL_GUARDIAN = 'SpecialGuardian',
  NO_FEE = 'NoFee',
  PRIVATE = 'Private',
}
