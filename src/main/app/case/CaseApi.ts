import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';

import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import {
  CITIZEN_ADD_PAYMENT,
  CaseData,
  ListValue,
  Payment,
  State,
} from './definition';
import { fromApiFormat } from './from-api-format';
import { toApiFormat } from './to-api-format';


export class CaseApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly logger: LoggerInstance
  ) {}

  public async getOrCreateCase(): Promise<CaseWithId> {

    return { id: '', state: State.Holding };
  }

  public async getOrCreateCaseNew(
    req: AppRequest,
    userDetails: UserDetails,
    formData: Partial<Case>
  ): Promise<CaseWithId> {
    return this.createCaseNew(req, userDetails, formData);
  }

  public async getCaseById(caseId: string): Promise<CaseWithId> {
   return new Promise((reject, resolve)=> {})
  }


  public async createCaseNew(req: AppRequest, userDetails: UserDetails, formData: Partial<Case>): Promise<CaseWithId> {
    return new Promise((reject, resolve)=> {})
  }


  public async getCaseUserRoles(caseId: string, userId: string): Promise<CaseAssignedUserRoles> {
    try {
      const response = await this.axios.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case roles could not be fetched.');
    }
  }

  private async sendEvent(caseId: string, data: Partial<CaseData>, eventName: string): Promise<CaseWithId> {
    try {
      const tokenResponse = await this.axios.get<CcdTokenResponse>(`/cases/${caseId}/event-triggers/${eventName}`);
      const token = tokenResponse.data.token;
      const event = { id: eventName };

      const response: AxiosResponse<CcdV2Response> = await this.axios.post(`/cases/${caseId}/events`, {
        event,
        data,
        event_token: token,
      });
      return { id: response.data.id, state: response.data.state, ...fromApiFormat(response.data.data) };
    } catch (err) {
      this.logError(err);
      throw new Error('Case could not be updated.');
    }
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const data = toApiFormat(userData);
    return this.sendEvent(caseId, data, eventName);
  }

  public async addPayment(caseId: string, payments: ListValue<Payment>[]): Promise<CaseWithId> {
    return this.sendEvent(caseId, { applicationPayments: payments }, CITIZEN_ADD_PAYMENT);
  }

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url}`);
    } else {
      this.logger.error('API Error', error.message);
    }
  }
}

export const getCaseApi = (userDetails: UserDetails, logger: LoggerInstance): CaseApi => {
  return new CaseApi(
    Axios.create({
      baseURL: config.get('services.case.url'),
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: getServiceAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    //userDetails,
    logger
  );
};


interface CcdV2Response {
  id: string;
  state: State;
  data: CaseData;
}

interface CcdTokenResponse {
  token: string;
}
