/* eslint-disable @typescript-eslint/no-shadow */
import https from 'https';

import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import {
  CITIZEN_SUBMIT,
  CaseData,
  CourtListOptions,
  DSS_CASE_EVENT,
} from './definition';
import { toApiDate, toApiFormat } from './to-api-format';
import {  prepareCaseRequestData, CreateCaseResponse, prepareUpdateCaseRequestData, mapCreateCaseResponseData, mapUpdateCaseResponseData, UpdateCaseRequest, UpdateCaseResponse } from './api-utility';

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
   * @param userCase
   * @returns
   */
  public async createCase(userCase: CaseWithId): Promise<CreateCaseResponse> {
    try {
      if (!userCase?.edgeCaseTypeOfApplication) {
        throw new Error('createCase - error in creating case. case type is missing.');
      }

      const request = prepareCaseRequestData(userCase)
      const response = await this.axios.post<CreateCaseResponse, AxiosResponse<CaseData>>('/case/create', request, {
        httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      if (response.status === 200) {
        return mapCreateCaseResponseData(response.data);
      }
      throw new Error('createCase - error in creating case. case could not be created.');
    } catch (err) {
      this.logError(err);
      throw new Error('createCase - error in creating case. case could not be created.');
    }
  }


  /**
   *
   * @param req
   * @param userDetails
   * @param  formData
   * @returns
   */
  public async updateCase(userCase: CaseWithId, eventName: string): Promise<UpdateCaseResponse> {
    try {
      if (!userCase?.id) {
        throw new Error('updateCase - error in updating case. case id is missing.');
      }

      const event = eventName === CITIZEN_SUBMIT ? DSS_CASE_EVENT.DSS_CASE_SUBMIT : DSS_CASE_EVENT.UPDATE_CASE;

      const response = await this.axios.post<UpdateCaseRequest, AxiosResponse<CaseData>>(
        `${userCase.id}/${event}/update-dss-case`,
        prepareUpdateCaseRequestData(userCase),
        {
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
      );

      if (response.status === 200) {
        return mapUpdateCaseResponseData(response.data);
      }
      throw new Error('updateCase - error in updating case. case could not be updated.');
    } catch (err) {
      this.logError(err);
      throw new Error('updateCase - error in updating case. case could not be updated.');
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
   * @returns
   */
  public async getCourtList(): Promise<CourtListOptions[]> {
    try {
      const response = await this.axios.get('/get-edge-case/court-list');
      return response.data;
    } catch (err) {
      this.logError(err);
      throw new Error('getCourtList - court list could not be fetched.');
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
      this.logger.error(
        `API Error ${error.response.config.method} ${error.response.config.url} ${error.response.status}`
      );
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      this.logger.error(`API Error ${error.request.config.method} ${error.request.config.url}`);
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
      baseURL: config.get('services.cos.url'),
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
        experimental: 'true',
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    }),
    logger
  );
};

export const enum State {
  CASE_DRAFT = 'AWAITING_SUBMISSION_TO_HMCTS',
  CASE_SUBMITTED_PAID = 'SUBMITTED_PAID',
  CASE_SUBMITTED_NOT_PAID = 'SUBMITTED_NOT_PAID',
  CASE_ISSUED_TO_LOCAL_COURT = 'CASE_ISSUE',
  CASE_GATE_KEEPING = 'GATE_KEEPING',
  CASE_CLOSED = 'ALL_FINAL_ORDERS_ISSUED',
  CASE_SERVED = 'PREPARE_FOR_HEARING_CONDUCT_HEARING',
  CASE_WITHDRAWN = 'CASE_WITHDRAWN',
  CASE_DELETED = 'REQUESTED_FOR_DELETION',
}

export const mapCaseData = (req: AppRequest): any => {
  const data = {
    // applicants: req.session.userCase.applicants[0],

    namedApplicant: req.session.userCase.namedApplicant,
    caseTypeOfApplication: req.session['edgecaseType'],
    applicantFirstName: req.session.userCase.applicantFirstName,
    applicantLastName: req.session.userCase.applicantLastName,
    applicantDateOfBirth: toApiDate(req.session.userCase.applicantDateOfBirth),
    applicantContactPreference: req.session.userCase['contactPreferenceType'],
    applicantEmailAddress: req.session.userCase.applicantEmailAddress,
    applicantPhoneNumber: req.session.userCase.applicantPhoneNumber,
    applicantHomeNumber: req.session.userCase.applicantHomeNumber,
    applicantAddress1: req.session.userCase.applicantAddress1,
    applicantAddress2: req.session.userCase.applicantAddress2,
    applicantAddressTown: req.session.userCase.applicantAddressTown,
    applicantAddressCountry: 'United Kingdom',
    applicantAddressPostCode: req.session.userCase.applicantAddressPostcode,
    applicantStatementOfTruth: req.session.userCase.applicantStatementOfTruth,
    selectedCourt: req.session.userCase.selectedCourt,
    paymentServiceRequestReferenceNumber: req.session.userCase.paymentDetails?.serviceRequestReference,
    paymentReferenceNumber: req.session.userCase.paymentDetails?.payment_reference,
  };
  return data;
};

