/* eslint-disable @typescript-eslint/no-shadow */
import Axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

/* Importing the constants from the apiConstants file. */
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

import { CaseAssignedUserRoles } from './case-roles';
import { YesOrNo, getOrCreateCaseType } from './definition';
import { toApiDate } from './to-api-format';

/* It's a class that contains a bunch of static methods that make HTTP requests to the Case API. */
export class CaseApi {
  /**
   * It creates a new instance of the class.
   * @param {AxiosInstance} axios - AxiosInstance - This is the axios instance that we created in the
   * previous step.
   * @param {LoggerInstance} logger - LoggerInstance - This is the logger instance that we created in the
   * previous step.
   */
  constructor(private readonly axios: AxiosInstance, private readonly logger: LoggerInstance) {}

  /**
   * "Get the case, or create it if it doesn't exist."
   *
   * The function is asynchronous, so it returns a promise. The promise resolves to an object with two
   * properties: id and state
   * @returns An object with an id and state property.
   */

  public getOrCreateCase(): getOrCreateCaseType {
    return { id: '' };
  }

  /**
   * It updates the case in the CCD database
   * @param {AppRequest} req - AppRequest - This is the request object that is passed to the controller.
   * @param {UserDetails} userDetails - UserDetails
   * @returns The case id
   */
  public async updateCase(req: AppRequest, userDetails: UserDetails): Promise<any> {
    /* Setting the headers for the PUT request. */
    Axios.defaults.headers.put[CONTENT_TYPE] = APPLICATION_JSON;
    Axios.defaults.headers.put[AUTHORIZATION] = BEARER + SPACE + userDetails.accessToken;
    try {
      /* Checking if the case id is missing. If it is missing, it throws an error. */
      if (req.session.userCase.id === EMPTY) {
        throw new Error('Error in updating case, case id is missing');
      }
      const url: string = config.get(FIS_COS_API_BASE_URL);
      /* Mapping the session data to the API data structure. */
      const AdditionalDocuments = req.session['AddtionalCaseDocuments'].map(document => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        /* Destructuring the document object. */
        const { url, fileName, documentId, binaryUrl } = document;
        /* Returning an object with the following properties:
       id
       value
       documentLink
       document_url
       document_filename
       document_binary_url */
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
      /* Mapping the session data to the API data structure. */
      const CaseDocuments = req.session['caseDocuments'].map(document => {
        /* Destructuring the document object. */
        const { url, fileName, documentId, binaryUrl } = document;
        /* Returning an object with the following properties:
        id
        value
        documentLink
        document_url
        document_filename
        document_binary_url */
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

      /* Creating a new object with the properties of the mapCaseData object and the
     AdditionalDocuments and CaseDocuments objects. */
      const data = {
        ...mapCaseData(req),
        applicantAdditionalDocuments: AdditionalDocuments,
        applicantApplicationFormDocuments: CaseDocuments,
      };
      /* Making a PUT request to the API. */
      const res: AxiosResponse<CreateCaseResponse> = await Axios.put(
        url + CONTEXT_PATH + FORWARD_SLASH + req.session.userCase.id + UPDATE_API_PATH,
        data,
        {
          params: { event: 'UPDATE' },
        }
      );
      if (res.status === 200) {
        /* Returning the userCase object from the session. */
        return req.session.userCase;
      } else {
        throw new Error('Error in updating case');
      }
    } catch (err) {
      this.logError(err);
    }
  }

  /**
   * It takes in a request object, a userDetails object, and returns a promise of any type
   * @param {AppRequest} req - AppRequest - This is the request object that is passed to the controller.
   * @param {UserDetails} userDetails - UserDetails - This is the user details object that is returned
   * from the authentication service.
   * @returns The case id is being returned.
   */
  public async createCaseNew(req: AppRequest, userDetails: UserDetails): Promise<any> {
    try {
      /* Getting the base URL of the API from the config file. */
      const url: string = config.get(FIS_COS_API_BASE_URL);
      const headers = { CONTENT_TYPE: APPLICATION_JSON, Authorization: BEARER + SPACE + userDetails.accessToken };
      const res: AxiosResponse<CreateCaseResponse> = await Axios.post(
        url + CONTEXT_PATH + CREATE_API_PATH,
        /* Mapping the session data to the API data structure. */
        mapCaseData(req),
        { headers }
      );
      /* Checking the status of the response. If the status is 200, it is setting the case id in the
     session. */
      if (res.status === 200) {
        req.session.userCase.id = res.data.id;
        return req.session.userCase;
      } else {
        throw new Error('Error in creating case');
      }
    } catch (err) {
      /* Logging the error and throwing an error. */
      this.logError(err);
    }
  }

  /**
   * It fetches the roles of a user in a case
   * @param {string} caseId - The ID of the case you want to get the user roles for.
   * @param {string} userId - The user's ID
   * @returns The response is an array of CaseAssignedUserRoles.
   */

  public async getCaseUserRoles(caseId: string, userId: string): Promise<CaseAssignedUserRoles> {
    /* Fetching the roles of a user in a case. */
    try {
      const response = await this.axios.get<CaseAssignedUserRoles>(`case-users?case_ids=${caseId}&user_ids=${userId}`);
      return response.data;
    } catch (err) {
      this.logError(err);
      return err;
    }
  }

  /* Logging the error. */

  private logError(error: AxiosError) {
    if (error.response) {
      this.logger.error(`API Error ${error.config.method} ${error.config.url} ${error.response.status}`);
      this.logger.info('Response: ', error.response.data);
    } else if (error.request) {
      // this.logger.error(`API Error ${error.config.method} ${error.config.url}`);
    } else {
      // this.logger.error('API Error', error.message);
    }
  }
}

/**
 * It creates an instance of the CaseApi class, which is a wrapper around the Axios library
 * @param {UserDetails} userDetails - UserDetails - this is the user details object that is returned
 * from the authentication service.
 * @param {LoggerInstance} logger - LoggerInstance - this is the logger instance that is used to log
 * messages to the console.
 * @returns A CaseApi object
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

interface CreateCaseResponse {
  status: string;
  id: string;
}

/**
 * It takes the session data and maps it to the API data structure
 * @param {AppRequest} req - AppRequest - this is the request object that is passed to the controller.
 * @returns An object with the following properties:
 * namedApplicant
 * caseTypeOfApplication
 * applicantFirstName
 * applicantLastName
 * applicantDateOfBirth
 * applicantContactPreference
 * applicantEmailAddress
 * applicantPhoneNumber
 * applicantHomeNumber
 * applicantAddress1
 * applicantAddress2
 * applicantAddressTown
 * app
 */
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
