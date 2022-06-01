import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseData } from './definition';
import { toApiFormat } from './to-api-format';

export class CaseApi {
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  public async getOrCreateCase(): Promise<CaseWithId> {
    return new Promise((req, res) => {});
  }

  public async getOrCreateCaseNew(
    req: AppRequest,
    userDetails: UserDetails,
    formData: Partial<Case>
  ): Promise<CaseWithId> {
    return this.createCaseNew(req, userDetails, formData);
  }

  public async createCaseNew(req: AppRequest, userDetails: UserDetails, formData: Partial<Case>): Promise<CaseWithId> {
    const date = this.axios.interceptors.request;
    //********** ADD axios data */
    console.log(date);
    return new Promise((reject, resolve) => {});
  }

  private async dispatchCaseEvent(caseId: string, data: Partial<CaseData>): Promise<CaseWithId> {
    try {
    } catch (error) {
      this.logError(error);
    } finally {
      return new Promise((reject, resolve) => {});
    }
  }

  public async triggerEvent(caseId: string, userData: Partial<Case>): Promise<CaseWithId> {
    const data = toApiFormat(userData);
    return this.dispatchCaseEvent(caseId, data);
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
