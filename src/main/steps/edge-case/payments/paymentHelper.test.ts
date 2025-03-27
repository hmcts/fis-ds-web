import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { getServiceAuthToken } from '../../../app/auth/service/get-service-auth-token';

import { PaymentHelper } from './paymentHelper';

jest.mock('../../../app/auth/service/get-service-auth-token');

describe('PaymentHelper', () => {
  const mockToken = 'authToken';
  const errorMessage = 'Service Auth Token Fetch Failed';
  const dummyCaseID = '2122323';
  const req: any = mockRequest({});
  req.locals = { logger: { error: jest.fn() } };
  req.session = {
    user: { accessToken: mockToken },
    userCase: { id: dummyCaseID },
  };
  req.headers = { host: 'localhost:3001' };

  const InstanceOfPaymentHelper = new PaymentHelper();

  beforeEach(() => {
    (getServiceAuthToken as jest.Mock).mockReset();
    (getServiceAuthToken as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });
  });

  test('Should match the output values corresponding to given input', async () => {
    (getServiceAuthToken as jest.Mock).mockResolvedValue('serviceToken');
    const generateMockSystemCredential = await InstanceOfPaymentHelper.SystemCredentailsToApiData(req);

    expect(generateMockSystemCredential.Authorization).toEqual(mockToken);
    expect(generateMockSystemCredential.id).toEqual(dummyCaseID);
  });

  test('Service token fetch failure should trigger error logging', async () => {
    await InstanceOfPaymentHelper.SystemCredentailsToApiData(req);
    expect(req.locals.logger.error).toHaveBeenCalledWith(expect.any(Error));
  });

  test('Shouldn"t match the output values corresponding to given input', async () => {
    (getServiceAuthToken as jest.Mock).mockResolvedValue('serviceToken');
    const generateMockSystemCredential = await InstanceOfPaymentHelper.SystemCredentailsToApiData(req);

    expect(generateMockSystemCredential).not.toEqual({
      Authorization: '',
      ServiceAuthorization: '',
      applicantCaseName: '',
      caseId: '',
      returnUrL: '',
      hwfRefNumber: '',
    });
  });
});
