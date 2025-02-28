import { mockRequest } from '../../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../../test/unit/utils/mockResponse';

import { routeGuard } from './routeGuard';

jest.mock('axios');

describe('pay your fee > routeGuard', () => {
  let req;
  let res;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    req.session.errors = [];
    res = mockResponse();
    jest.clearAllMocks();
  });

  test('post should call next if cancel not present', async () => {
    req.body.feesAppliedDetails = 'Yes';
    req.body.helpWithFeesReferenceNumber = 'HWF-123-456';
    await routeGuard.post(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.errors).toEqual([]);
    expect(req.session.userCase).toEqual({
      id: '1234',
      feesAppliedDetails: 'Yes',
      helpWithFeesReferenceNumber: 'HWF-123-456',
    });
  });

  test('post should redirect to sign out url if cancel present and fees applied details is no', async () => {
    req.body.cancel = 'cancel';
    req.body.feesAppliedDetails = 'No';
    await routeGuard.post(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/logout');
    expect(req.session.errors).toEqual([]);
  });

  test('post should add error and redirect to same page if cancel and fees applied details is yes', async () => {
    req.body.cancel = 'cancel';
    req.body.feesAppliedDetails = 'Yes';
    await routeGuard.post(req, res, next);
    expect(res.redirect).toHaveBeenCalledWith('/help-with-fees/fees-applied');
    expect(req.session.errors).toEqual([
      {
        errorType: 'invalid',
        propertyName: 'main-form-submit',
      },
    ]);
  });
});
