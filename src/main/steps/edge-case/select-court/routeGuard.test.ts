import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { TYPE_OF_APPLICATION } from '../../../app/case/definition';
import { GENERIC_ERROR_PAGE } from '../../urls';

import { routeGuard } from './routeGuard';
//import { CaseApi } from '../../../app/case/CaseApi';
//import { LoggerInstance } from 'winston';
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('selectcourt Route Guard', () => {
  test('Should not render the page when the guard validation fails', async () => {
    const req = mockRequest({
      session: {
        userCase: {
          edgeCaseTypeOfApplication: TYPE_OF_APPLICATION.FGM,
        },
        locals: {
          api: {
            getCourtList: {},
          },
        },
      },
    });
    const res = mockResponse();
    jest.mock('../../../app/auth/service/get-service-auth-token', () => ({
      getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
    }));
    mockedAxios.get.mockResolvedValueOnce([{ epmsId: 'x', site_name: 'y', court_name: 'z' }]);
    const next = jest.fn();
    await routeGuard.get(req, res, next);

    expect(res.redirect).toHaveBeenCalledWith(GENERIC_ERROR_PAGE);
  });
  //   test('Should render the page when the guard validation passes with out usercase', async () => {
  //     const req = mockRequest({
  //       session: {
  //         userCase: {
  //             edgeCaseTypeOfApplication:TYPE_OF_APPLICATION.FGM
  //         },
  //       },
  //     });
  //     const res = mockResponse();

  // // const mockLogger = {
  // //     error: jest.fn().mockImplementation((message: string) => message),
  // //     info: jest.fn().mockImplementation((message: string) => message),
  // //   } as unknown as LoggerInstance;
  // //     const mockApi = new CaseApi(mockedAxios, mockLogger);
  // //     jest.mock('../../../app/auth/service/get-service-auth-token', () => ({
  // //       getServiceAuthToken: jest.fn(() => 'mock-service-auth-token'),
  // //     }));
  // //     req.locals.api= mockApi;
  //     // mockApi.getCourtList().mockResolvedValueOnce({
  //     //   data: {
  //     //     feeAmount: '232',
  //     //     errorRetrievingResponse: '',
  //     //   },
  //     // });

  //     const updateCaserMock = jest.spyOn(CaseApi.prototype, 'getCourtList');
  //     updateCaserMock.mockResolvedValueOnce([{epmsId: "x",
  //         site_name: "y",
  //         court_name: "z"
  //       }])
  //     const next = jest.fn();
  //     await routeGuard.get(req, res, next);
  //     // expect(req.session.userCase.c100ApplicationFees).toBe('232');
  //     expect(next).toHaveBeenCalled();
  //   });

  test('Should render error page when the guard validation fails', async () => {
    const req = mockRequest();
    const res = mockResponse();
    mockedAxios.get.mockRejectedValueOnce;
    const next = jest.fn();
    await routeGuard.get(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith(GENERIC_ERROR_PAGE);
  });
});
