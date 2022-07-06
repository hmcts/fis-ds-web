/* eslint-disable @typescript-eslint/no-shadow */
import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import {
  APPLICATION_JSON,
  AUTHORIZATION,
  BEARER,
  CONTENT_TYPE,
  CONTEXT_PATH,
  CREATE_API_PATH,
  FIS_COS_API_BASE_URL,
  UPDATE_API_PATH,
} from '../../steps/common/constants/apiConstants';
import { EMPTY, FORWARD_SLASH, SPACE } from '../../steps/common/constants/commonConstants';
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
    Axios.defaults.headers.put[CONTENT_TYPE] = APPLICATION_JSON;
    Axios.defaults.headers.put[AUTHORIZATION] = BEARER + SPACE + userDetails.accessToken;
    try {
      if (req.session.userCase.id === EMPTY) {
        throw new Error('Error in updating case, case id is missing');
      }
      const url: string = config.get(FIS_COS_API_BASE_URL);
      const AdditionalDocuments = req.session['AddtionalCaseDocuments'].map(document => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { url, fileName, documentId, binaryUrl } = document;
        return {
          id: documentId,
          value: {
            documentLink: {
              document_url: url,
              document_filename: fileName,
              document_binary_url: binaryUrl,
            },
          },
        };
      });
      const CaseDocuments = req.session['caseDocuments'].map(document => {
        const { url, fileName, documentId, binaryUrl } = document;
        return {
          id: documentId,
          value: {
            documentLink: {
              document_url: url,
              document_filename: fileName,
              document_binary_url: binaryUrl,
            },
          },
        };
      });

      const data = {
        ...mapCaseData(req),
        applicantAdditionalDocuments: AdditionalDocuments,
        applicantApplicationFormDocuments: CaseDocuments,
      };
      const res: AxiosResponse<CreateCaseResponse> = await Axios.put(
        url + CONTEXT_PATH + FORWARD_SLASH + req.session.userCase.id + UPDATE_API_PATH,
        data,
        {
          params: { event: 'UPDATE' },
        }
      );
      if (res.status === 200) {
        return req.session.userCase;
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
      const url: string = config.get(FIS_COS_API_BASE_URL);
      const headers = { CONTENT_TYPE: APPLICATION_JSON, Authorization: BEARER + SPACE + userDetails.accessToken };
      const res: AxiosResponse<CreateCaseResponse> = await Axios.post(
        url + CONTEXT_PATH + CREATE_API_PATH,
        mapCaseData(req),
        { headers }
      );
      if (res.status === 200) {
        req.session.userCase.id = res.data.id;
        return req.session.userCase;
      } else {
        throw new Error('Error in creating case');
      }
    } catch (err) {
      this.logError(err);
      throw new Error('Error in creating case');
    }
  }

  public async retreiveCCDDef(req: AppRequest): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${req.session.user.accessToken}`,
        ServiceAuthorization:
          'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjY2RfZ3ciLCJleHAiOjE2NTcxMTUxOTV9.6AMggSWfsFn1g4N1Fny1QTstyJaeWWJlXGbilSgf3ZgKlFau_glewhU9HUcstuJW3xyyHsjnP859KfpLqJkscw',
      };
      const res: AxiosResponse<CCDResponse> = await Axios.get(
        'https://ccd-definition-store-prl-ccd-definitions-pr-451.service.core-compute-preview.internal/api/display/challenge-questions/case-type/PRLAPPS/question-groups/PrlChallengeQuestion',
        { headers }
      );
      if (res.status === 200) {
        console.log('hiii');
        console.log(res.data.questions[1].answer_field_type);
        req.session.questions = res.data.questions;
        return req.session.questions;
      } else {
        throw new Error('Error in creating case');
      }
    } catch (err) {
      console.log('fdfafds');
      console.log(err.message);
      this.logError(err);
      throw new Error('Error in creating case1111');
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

type CreateCaseResponse = {
  status: string;
  id: string;
};

type CCDResponse = {
  status: string;
  questions: Question[];
};

type Question = {
  case_type_id: string;
  question_text: string;
  answer_field_type: any;
  answer_field: string;
};

export const mapCaseData = (req: AppRequest): any => {
  const data = {
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
  };
  return data;
};
