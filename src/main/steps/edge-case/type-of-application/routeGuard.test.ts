import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { mockUserCase1 } from '../../../../test/unit/utils/mockUserCase';
import { TYPE_OF_APPLICATION } from '../../../app/case/definition';

import { routeGuard } from './routeGuard';
describe('type of application > routeGuard', () => {
  let req;
  let res;
  const next = jest.fn();

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    jest.clearAllMocks();
  });
  test('get should call next', async () => {
    routeGuard.post(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  test('get should call next with type of application', async () => {
    req.session.userCase = mockUserCase1;
    req.session.userCase.id = '1';
    req.body.edgeCaseTypeOfApplication = TYPE_OF_APPLICATION.FGM;
    req.session.userCase.edgeCaseTypeOfApplication = TYPE_OF_APPLICATION.FMPO;
    routeGuard.post(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.session.userCase.edgeCaseTypeOfApplication).toEqual('FGM');
  });

  test('get should call next with type of application and update details for CA case', async () => {
    req.session.userCase = mockUserCase1;
    req.session.userCase.id = '1';
    req.body.edgeCaseTypeOfApplication = TYPE_OF_APPLICATION.DECLARATION_OF_PARENTAGE;
    req.session.userCase.edgeCaseTypeOfApplication = TYPE_OF_APPLICATION.FMPO;
    routeGuard.post(req, res, next);
    expect(req.session.userCase.whomYouAreApplying).toEqual('self');
    expect(req.session.userCase.applicantFirstName).toEqual('First name');
    expect(req.session.userCase.applicantLastName).toEqual('Last name');
    expect(req.session.userCase.applicantEmailAddress).toEqual('test@example.com');
    expect(req.session.userCase.edgeCaseTypeOfApplication).toEqual('DOP');

    expect(next).toHaveBeenCalled();
  });
});
