import Axios, { AxiosError, AxiosInstance,AxiosResponse } from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../auth/service/get-service-auth-token';
import { AppRequest, UserDetails } from '../controller/AppRequest';

import { Case, CaseWithId } from './case';
import { CaseAssignedUserRoles } from './case-roles';
import { CaseData } from './definition';
import { toApiFormat,toApiDate } from './to-api-format';

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
  public async getOrCreateCaseNew(
    req: AppRequest,
    userDetails: UserDetails,
    formData: Partial<Case>
  ): Promise<CaseWithId> {
    return this.createCaseNew(req, userDetails, formData);
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

  public async createCaseNew(req: AppRequest, userDetails: UserDetails, formData: Partial<Case>): Promise<any> {
    //***** this part need to be implemented on creating a new case  */

    //console.log("/////////formData:",formData);
  
  //console.log("token => "+token+", event => "+event+", data => "+data);
    try {
      // const requestData : CaseWithId =req.session.userCase;
      const url: string = config.get('services.createcase.url');
      const headers = { 'Content-Type': 'application/json', 'Authorization':'Bearer ' + userDetails.accessToken };
      const data= {
        applicantFirstName:req.session.userCase.applicantFirstName,
        applicantLastName: req.session.userCase.applicantLastName,
        applicantDateOfBirth: toApiDate(req.session.userCase.applicantDateOfBirth),
        applicantEmailAddress:req.session.userCase.applicantEmailAddress,
        applicantPhoneNumber: req.session.userCase.applicantPhoneNumber,
        applicantHomeNumber:req.session.userCase.applicantHomeNumber,
        applicantAddress1: req.session.userCase.applicantAddress1,
        applicantAddress2: req.session.userCase.applicantAddress2,
        applicantAddressTown: req.session.userCase.applicantAddressTown,
        applicantAddressCountry:req.session.userCase.applicantAddressCountry,
        applicantAddressPostCode:req.session.userCase.applicantAddressPostcode
          
      };
      console.log('url:' ,url)
      console.log('headers:',headers)
      console.log("Data: ",data)
       const response: AxiosResponse<createCaseResponse> = await Axios.post(url,data,{headers});
       console.log('Response::::::/n',response)
       return {id:response.data}
        console.log('Response::::::/n',response.status)
      }
     catch (err) {
      console.log("error in creating case")
      console.log(err)  
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
      baseURL: config.get('services.createcase.url'),
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
  results: {
    status:string,
    id:number
  
  }[];
}


