import axios from 'axios';

import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CaseApi } from '../../../app/case/CaseApi';
import { UpdateCaseResponse } from '../../../app/case/api-utility';
import { PCQProvider } from '../../../modules/pcq';

import { routeGuard } from './routeGuard';

const updateCaserMock = jest.spyOn(CaseApi.prototype, 'updateCase');
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create = jest.fn(() => mockedAxios);

describe('statement of truth > routeGuard', () => {
  test('should call next if applicant statement of truth not present', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const next = jest.fn();
    await routeGuard.post(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should call next if type of application is not FGM/FMPO', async () => {
    const req = mockRequest({
      session: { userCase: { edgeCaseTypeOfApplication: 'DOP' } },
      body: { applicantStatementOfTruth: 'Yes' },
    });
    req.session.userCase.applicantPcqId = '123';
    const res = mockResponse();
    const next = jest.fn();

    await routeGuard.post(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('should call save and redirect to application submitted if type of application is FGM/FMPO', async () => {
    const req = mockRequest({
      session: { userCase: { edgeCaseTypeOfApplication: 'FGM' } },
      body: { applicantStatementOfTruth: 'Yes' },
    });
    const res = mockResponse();
    const next = jest.fn();
    updateCaserMock.mockResolvedValueOnce(req.session.userCase as unknown as UpdateCaseResponse);

    await routeGuard.post(req, res, next);
    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/application-submitted');
  });

  test('should call payment handler if hwf yes', async () => {
    const req = mockRequest({
      session: {
        userCase: { hwfPaymentSelection: 'Yes', helpWithFeesReferenceNumber: '123', edgeCaseTypeOfApplication: 'PO' },
      },
      body: { applicantStatementOfTruth: 'Yes', saveAndContinue: true },
    });
    req.session.userCase.applicantPcqId = '123';
    jest.spyOn(PCQProvider, 'getReturnUrl').mockReturnValue('asd');
    const paymentDetailsRequestBody = {
      payment_reference: 'a',
      date_created: 'b',
      external_reference: 'c',
      next_url: 'd',
      status: 'Success',
      serviceRequestReference: 'e',
    };
    mockedAxios.post.mockResolvedValue({
      data: {
        ...paymentDetailsRequestBody,
      },
    });
    const res = mockResponse();
    const next = jest.fn();
    updateCaserMock.mockResolvedValueOnce(req.session.userCase as unknown as UpdateCaseResponse);

    await routeGuard.post(req, res, next);
    await new Promise(process.nextTick);
    expect(req.session.save).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalled();
  });

  test('should catch and add error if update case fails', async () => {
    const req = mockRequest({
      session: { userCase: { edgeCaseTypeOfApplication: 'FGM' } },
      body: { applicantStatementOfTruth: 'Yes' },
    });
    const res = mockResponse();
    const next = jest.fn();
    req.locals.api.updateCase = jest.fn().mockRejectedValue(new Error('failed to update case'));

    await routeGuard.post(req, res, next);

    expect(req.session.save).toHaveBeenCalled();
    expect(req.session.paymentError).toStrictEqual({ hasError: true, errorContext: 'applicationNotSubmitted' });
    expect(res.redirect).toHaveBeenCalledWith('/statement-of-truth');
  });

  describe('get', () => {
    test('should redirect to type of application if case is submitted', async () => {
      const req = mockRequest({ session: { userCase: { state: 'SUBMITTED_PAID' } } });
      const res = mockResponse();
      const next = jest.fn();
      await routeGuard.get(req, res, next);
      expect(next).not.toHaveBeenCalled();
      expect(res.redirect).toHaveBeenCalledWith('/type-of-application');
    });

    test('should call next if case is not submitted', async () => {
      const req = mockRequest({ session: { userCase: { state: 'AWAITING_SUBMISSION_TO_HMCTS' } } });
      const res = mockResponse();
      const next = jest.fn();
      await routeGuard.get(req, res, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
