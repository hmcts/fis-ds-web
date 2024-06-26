import { Request } from 'express';
import { Session } from 'express-session';
import type { LoggerInstance } from 'winston';

import { CaseApi } from '../case/CaseApi';
import { Case, CaseWithId } from '../case/case';
import { FormError } from '../form/Form';

export interface AppRequest<T = Partial<Case>> extends Request {
  session: AppSession;
  locals: {
    env: string;
    lang: string;
    logger: LoggerInstance;
    api: CaseApi;
  };
  body: T;
}

export interface AppSession extends Session {
  paymentSuccessDetails?: {
    amount: string;
    reference: string;
    ccd_case_number: string;
    case_reference: string;
    channel: string;
    method: string;
    status: string;
    external_reference: string;
    payment_group_reference: string;
  };
  paymentDetails?: {
    payment_reference: string;
    date_created: string;
    external_reference: string;
    next_url: string;
    status: string;
    serviceRequestReference: string;
  };
  csrfSecret: string;
  rpeToken: any;
  caseDocuments: any;
  AddtionalCaseDocuments: any;
  postDocs: any;
  cookieMessage: boolean;
  user: UserDetails;
  userCase: CaseWithId;
  paymentError: boolean;
  eligibility: Eligibility;
  lang: string | undefined;
  errors: FormError[] | undefined;
  fileErrors: any[];
  addresses: [];
  returnUrl?: string;
  cookieStorageMessage?: boolean;
}

export interface UserDetails {
  accessToken: string;
  id: string;
  email: string;
  givenName: string;
  familyName: string;
}

export interface Namer {
  name: string;
}

export interface Eligibility {
  under18Eligible?: string;
  marriedEligible?: string;
  livedUKEligible?: string;
  under21Eligible?: string;
}
