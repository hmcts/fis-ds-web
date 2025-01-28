import axios from 'axios';
import config from 'config';
import { LoggerInstance } from 'winston';

import { getServiceAuthToken } from '../../../app/auth/service/get-service-auth-token';
import { UserDetails } from '../../../app/controller/AppRequest';
import { TYPE_OF_APPLICATION } from '../../../app/case/definition';
import { getEnumKeyByValue } from '../util';

export const getApplicationFee = async (
  userDetails: UserDetails,
  applicationType: string | undefined,
  logger: LoggerInstance
): Promise<FeesResponse | void> => {
  try {
    const app_type = getEnumKeyByValue(TYPE_OF_APPLICATION, applicationType);
    console.log(app_type);
    const url: string = config.get('services.cos.url') + `/fees-and-payment-apis/${app_type}`;
    const response = await axios.get<FeesResponse>(url, {
      headers: {
        Authorization: 'Bearer ' + userDetails.accessToken,
        serviceAuthorization: 'Bearer ' + getServiceAuthToken(),
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200 || !response.data?.errorRetrievingResponse) {
      return response.data;
    }
  } catch (err) {
    logger.error(err.message);
    throw new Error('Error occured, fee could not be fetched. - getApplicationFee');
  }
};

export interface FeesResponse {
  feeAmount: string;
  errorRetrievingResponse: string;
}
