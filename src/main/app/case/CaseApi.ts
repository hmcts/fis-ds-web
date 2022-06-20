import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import { CaseData } from './definition';
import { toApiDate, toApiFormat } from './to-api-format';

export class CaseApi {
  /**
   *
   * @param axios
   * @param logger
   */
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  /**
   *
   * @returns
   */
  public async getOrCreateCase(): Promise<any> {
    return { id: '', state: 'FIS' };
  }

  /**
   *
   * @param req
   * @param userDetails
   * @param formData
   * @returns
   */
  public async getOrCreateCaseNew(req: AppRequest, userDetails: UserDetails): Promise<CaseWithId> {
    return this.createCaseNew(req, userDetails);
  }

  /**
   *
   * @param caseId
   * @returns
   */
  public async getCaseById(): Promise<CaseWithId> {
    return new Promise(() => {
      null;
    });
  }

  /**
   *
   * @param req
   * @param userDetails
   * @param  formData
   * @returns
   */
  public async updateCase(req: AppRequest, userDetails: UserDetails): Promise<any> {
    Axios.defaults.headers.put['Content-Type'] = 'application/json';
    Axios.defaults.headers.put['Authorization'] = 'Bearer ' + userDetails.accessToken;
    try {
      if (req.session.userCase.id === '') {
        throw new Error('Error in updating case, case id is missing');
      }
      const url: string = config.get('services.case.url');
      const res: AxiosResponse<createCaseResponse> = await Axios.put(
        url + req.session.userCase.id + '/update',
        mapCaseData(req),
        {
          params: { event: 'UPDATE' },
        }
      );
      if (res.status === 200) {
        return { id: res.data.id };
      } else {
        throw new Error('Error in updating case');
      }
    } catch (err) {
      this.logError(err);
      throw new Error('Error in updating case');
    }
  }
  /**
   *
   * @param req
   * @param userDetails
   * @param  formData
   * @returns
   */
  public async createCaseNew(req: AppRequest, userDetails: UserDetails): Promise<any> {
    try {
      console.log(userDetails.accessToken);
      const url: string = config.get('services.case.url');
      const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + userDetails.accessToken };
      const res: AxiosResponse<createCaseResponse> = await Axios.post(url + 'create', mapCaseData(req), { headers });
      if (res.status === 200) {
        req.session.userCase.id = res.data.id;
        return { id: res.data.id };
      } else {
        throw new Error('Error in creating case');
      }
    } catch (err) {
      this.logError(err);
      throw new Error('Error in creating case');
    }
  }

  /**
   *
   * @param caseId
   * @param userId
   * @returns
   */
  public async getCaseUserRoles(caseId: string, userId: string): Promise<CaseAssignedUserRoles> {
    try {
      const response = await this.axios.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('Case roles could not be fetched.');
    }
  }

  /**
   *
   * @param caseId
   * @param data
   * @param eventName
   * @returns
   */
  private async sendEvent(caseId: string, data: Partial<CaseData>, eventName: string): Promise<CaseWithId> {
    console.log({ caseId, data, eventName });
    return new Promise(() => {
      null;
    });
  }

  /**
   *
   * @param caseId
   * @param userData
   * @param eventName
   * @returns
   */
  public async triggerEvent(caseId: string, userData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    const data = toApiFormat(userData);
    return this.sendEvent(caseId, data, eventName);
  }

  /**
   *
   * @param error
   */
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

/**
 *
 * @param userDetails
 * @param logger
 * @returns
 */
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
    logger
  );
};

interface createCaseResponse {
  status: string;
  id: string;
}

export const mapCaseData = (req: AppRequest): any => {
  const data = {
    applicantFirstName: req.session.userCase.applicantFirstName,
    applicantLastName: req.session.userCase.applicantLastName,
    applicantDateOfBirth: toApiDate(req.session.userCase.applicantDateOfBirth),
    applicantEmailAddress: req.session.userCase.applicantEmailAddress,
    applicantPhoneNumber: req.session.userCase.applicantPhoneNumber,
    applicantHomeNumber: req.session.userCase.applicantHomeNumber,
    applicantAddress1: req.session.userCase.applicantAddress1,
    applicantAddress2: req.session.userCase.applicantAddress2,
    applicantAddressTown: req.session.userCase.applicantAddressTown,
    applicantAddressCountry: 'United Kingdom',
    applicantAddressPostCode: req.session.userCase.applicantAddressPostcode,
  };
  return data;
};
