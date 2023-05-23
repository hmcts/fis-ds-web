/* eslint-disable @typescript-eslint/no-shadow */
import Axios, { AxiosError, AxiosInstance } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';
import https from 'https';

import {
  APPLICATION_JSON,
  AUTHORIZATION,
  BEARER,
  CONTENT_TYPE,
} from '../../steps/common/constants/apiConstants';
import { EMPTY, SPACE } from '../../steps/common/constants/commonConstants';
import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import { CaseData, YesOrNo } from './definition';
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
  public async updateCase(req: AppRequest, userDetails: UserDetails, eventName: string): Promise<any> {
    Axios.defaults.headers.put[CONTENT_TYPE] = APPLICATION_JSON;
    Axios.defaults.headers.put[AUTHORIZATION] = BEARER + SPACE + userDetails.accessToken;
    try {
      if (req.session.userCase.id === EMPTY) {
        throw new Error('Error in updating case, case id is missing');
      }
      
      const AdditionalDocuments = req.session['AddtionalCaseDocuments'].map(document => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { document_url, document_filename, document_binary_url } = document;
        return {
          id: document_url.substring(document_url.lastIndexOf('/')+1),
          value: {
            documentLink: {
              document_url: document_url,
              document_filename: document_filename,
              document_binary_url: document_binary_url,
            },
          },
        };
      });
      const CaseDocuments = req.session['caseDocuments'].map(document => {
        const { document_url, document_filename, document_binary_url } = document;
        return {
          id: document_url.substring(document_url.lastIndexOf('/')+1),
          value: {
            documentLink: {
              document_url: document_url,
              document_filename: document_filename,
              document_binary_url: document_binary_url,
            },
          },
        };
      });
    

      const data = {
        ...mapCaseData(req),
        applicantAdditionalDocuments: AdditionalDocuments,
        applicantApplicationFormDocuments: CaseDocuments,
      };
      
      const res = await this.axios.post<CreateCaseResponse>('https://prl-cos-pr-1400.preview.platform.hmcts.net/' + req.session.userCase.id +'/citizen-dss-case-submit/update-dss-case', data,
        {
          headers: {
            ServiceAuthorization: 'Bearer ' + getServiceAuthToken(),
            Authorization: `Bearer ${req.session.user['accessToken']}`,
          },
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
          
        
        }
        
        
        );
        if (res.status === 200) {
          req.session.userCase.id = res.data.id;
          return req.session.userCase;
        } else {
          throw new Error('Error in creating case');
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
   
      const data = {
        caseTypeOfApplication: 'C100'
      };
  
      try {
        //const response = await this.axios.post<CreateCaseResponse>('https://prl-cos-pr-1385.preview.platform.hmcts.net/case/create', data);
        const response = await this.axios.post<CreateCaseResponse>('https://prl-cos-pr-1400.preview.platform.hmcts.net/case/create', data,
        {
          
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
          maxContentLength: Infinity,
          maxBodyLength: Infinity,
        }
        
        
        );
      //  const { id, caseTypeOfApplication, c100RebuildReturnUrl, state, noOfDaysRemainingToSubmitCase } = response?.data;
        req.session.userCase.id = response.data.id;
        return req.session.userCase;
        //return { id, caseTypeOfApplication, c100RebuildReturnUrl, state, noOfDaysRemainingToSubmitCase };
      } catch (err) {
        this.logError(err);
        throw new Error('Case could not be created.');
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
      baseURL: config.get('services.fis.url'),
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

interface CreateCaseResponse {
  status: string;
  id: string;
  caseTypeOfApplication: string;
  c100RebuildReturnUrl: string;
  state: State;
  noOfDaysRemainingToSubmitCase: string;

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
    applicantStatementOfTruth: checkboxConverter(req.session.userCase.applicantStatementOfTruth),
  };
  return data;
};

const checkboxConverter = (value: string | undefined) => {
  if (value === YesOrNo.YES) {
    return YesOrNo.YES;
  } else {
    return YesOrNo.NO;
  }
};
