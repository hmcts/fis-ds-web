import axios from 'axios';

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';
import { mockUserCase1 } from '../../../../../test/unit/utils/mockUserCase';
import { TYPE_OF_APPLICATION } from '../../../../app/case/definition';

import { routeGuard } from './routeGuard';
jest.mock('axios');

describe('help with fees > need help with fees > Route Guard', () => {
  let req;
  let res;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });

  describe('get', () => {
    test('should call next', async () => {
      req.session.paymentError = {
        hasError: true,
        errorContext: null,
      };

      await routeGuard.get(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    test('should call next after application free', async () => {
      req.session.usercase = mockUserCase1;
      req.session.userCase.edgeCaseTypeOfApplication = TYPE_OF_APPLICATION.FGM;
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.create = jest.fn(() => mockedAxios);
      mockedAxios.get.mockResolvedValueOnce({ status: '200', data: { feeAmount: '20' } });
      req.session.paymentError = {
        hasError: true,
        errorContext: null,
      };
      await routeGuard.get(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    test('should call next after wit out application free', async () => {
      req.session.usercase = mockUserCase1;
      req.session.userCase.edgeCaseTypeOfApplication = TYPE_OF_APPLICATION.FGM;
      const mockedAxios = axios as jest.Mocked<typeof axios>;
      mockedAxios.create = jest.fn(() => mockedAxios);
      mockedAxios.get.mockResolvedValueOnce({ status: '200' });
      req.session.paymentError = {
        hasError: true,
        errorContext: null,
      };
      await routeGuard.get(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('post', () => {
    test('should delete hwp details if hwfPayementSelection is no', async () => {
      req.session.userCase.feesAppliedDetails = 'Yes';
      req.session.userCase.helpWithFeesReferenceNumber = '123';
      req.body.hwfPaymentSelection = 'No';
      await routeGuard.post(req, res, next);
      expect(req.session.userCase.feesAppliedDetails).toBeUndefined();
      expect(req.session.userCase.helpWithFeesReferenceNumber).toBeUndefined();
      expect(req.session.save).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('should not delete hwp details if hwfPayementSelection is yes', async () => {
      req.session.userCase.feesAppliedDetails = 'Yes';
      req.session.userCase.helpWithFeesReferenceNumber = '123';
      req.body.hwfPaymentSelection = 'Yes';
      await routeGuard.post(req, res, next);
      expect(req.session.userCase.feesAppliedDetails).toBe('Yes');
      expect(req.session.userCase.helpWithFeesReferenceNumber).toBe('123');
      expect(req.session.save).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
