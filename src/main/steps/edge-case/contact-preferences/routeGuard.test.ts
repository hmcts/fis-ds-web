import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { ContactPreference } from '../../../app/case/definition';

import { routeGuard } from './routeGuard';

describe('contact preferences > routeGuard', () => {
  test('should set email address when account owner selected', () => {
    const req = mockRequest({
      session: {
        user: {
          email: 'test@test.com',
        },
        userCase: {
          applicantEmailAddress: '',
        },
      },
    });
    req.body = {
      contactPreferenceType: 'ACCOUNT_OWNER' as ContactPreference,
    };
    const res = mockResponse();
    const next = jest.fn();

    routeGuard.post(req, res, next);
    expect(req.session.userCase.applicantEmailAddress).toBe('test@test.com');
  });

  test('should not set email address when account owner not selected', () => {
    const req = mockRequest({
      session: {
        user: {
          email: 'test@test.com',
        },
        userCase: {
          applicantEmailAddress: '',
        },
      },
    });
    const res = mockResponse();
    const next = jest.fn();

    routeGuard.post(req, res, next);
    expect(req.session.userCase.applicantEmailAddress).toBe('');
  });
});
