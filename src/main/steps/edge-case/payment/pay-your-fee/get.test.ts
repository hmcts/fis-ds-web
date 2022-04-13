const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

const mockGetFee = jest.fn();
jest.mock('../../../../app/fee/fee-lookup-api', () => ({
  getFee: mockGetFee,
}));

import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { generateContent } from './content';
import FeeGetController from './get';

describe('PayYourFeeGetController', () => {
  const controller = new FeeGetController(__dirname + './template', generateContent);
  const res = mockResponse();

  afterEach(() => {
    mockGetFee.mockClear();
  });

  describe('should get application fee', () => {
    it('should call the fee lookup api for internation adoption', async () => {
      const req = mockRequest({ userCase: { applyingWithAdoption: 'International adoption', serviceType: 'Yes' } });
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'ApplyAdoption');
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
    });

    it('should call the fee lookup api for Relinquished adoption', async () => {
      const req = mockRequest({ userCase: { applyingWithAdoption: 'Relinquished adoption', serviceType: 'Yes' } });
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'ApplyAdoption');
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
    });

    it('should call the fee lookup api for Stepparent adoption', async () => {
      const req = mockRequest({ userCase: { applyingWithAdoption: 'Stepparent adoption', serviceType: 'Yes' } });
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'ApplyAdoption');
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
    });

    it('should call the fee lookup api for parental order adoption', async () => {
      const req = mockRequest({ userCase: { applyingWithAdoption: 'Parental order', serviceType: 'Yes' } });
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'AppnParent');
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
    });

    it('should call the fee lookup api for Financial applications', async () => {
      const req = mockRequest({ userCase: { applyingWithPrivateLaw: 'Financial applications' } });
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'PQR');
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
    });

    it('should call the fee lookup api for Special Guardianship', async () => {
      const req = mockRequest({ userCase: { applyingWithPrivateLaw: 'Special Guardianship' } });
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'SpecialGuardian');
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
    });

    it('should call the fee lookup api for Declaration of parentage', async () => {
      const req = mockRequest({ userCase: { applyingWithPrivateLaw: 'Declaration of parentage' } });
      mockGetFee.mockResolvedValue({ FeeAmount: '4321' });
      await controller.get(req, res);
      expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'Private');
      expect(req.locals.api.triggerEvent).toHaveBeenCalledWith(
        '1234',
        {
          applicationFeeOrderSummary: {
            Fees: [{ id: 'MOCK_V4_UUID', value: { FeeAmount: '4321' } }],
            PaymentReference: '',
            PaymentTotal: '4321',
          },
        },
        'citizen-update-application'
      );
    });

    it('should not call the fee lookup api for Female Genital Mutilation Orders(FGM)', async () => {
      const req = mockRequest({ userCase: { applyingWithPrivateLaw: 'Female Genital Mutilation Orders(FGM)' } });
      await controller.get(req, res);
      expect(mockGetFee).not.toHaveBeenCalled();
    });

    it('should throw error when feel lookup api fails', async () => {
      const req = mockRequest({ userCase: {} });
      mockGetFee.mockReturnValue(undefined);
      try {
        await controller.get(req, res);
      } catch (err) {
        /* eslint-disable jest/no-conditional-expect */
        expect(err).toEqual(new Error('Unable to get fee from fee-register API'));
        expect(mockGetFee).toHaveBeenCalledWith(req.locals.logger, 'ApplyAdoption');
        expect(req.locals.api.triggerEvent).not.toHaveBeenCalledWith();
        /* eslint-enable jest/no-conditional-expect */
      }
    });
  });
});
