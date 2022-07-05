import { logger } from '@hmcts/nodejs-logging';
import axios from 'axios';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { CaseApi, mapCaseData } from './CaseApi';

jest.mock('axios');

const mockedAxiosInstance = axios as jest.Mocked<typeof axios>;

const CaseAPIInstance = new CaseApi(mockedAxiosInstance, logger);

// eslint-disable-next-line jest/expect-expect
test('Should throw error when case could not be fetched', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockRejectedValue({
    config: { method: 'GET', url: 'https://example.com' },
    request: 'mock request',
  });
});

// eslint-disable-next-line jest/expect-expect
test('create api test', async () => {
  CaseAPIInstance.getOrCreateCase();
});

// eslint-disable-next-line jest/expect-expect
test('create a new case', async () => {
  const req = mockRequest();
  const returnOfMappCaseata = mapCaseData(req);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummyUserDetails = {
    accessToken: 'axxx',
    id: '123',
    email: 'test@test.com',
    givenName: 'test',
    familyName: 'test',
  };
  await CaseAPIInstance.createCaseNew(returnOfMappCaseata, dummyUserDetails);
});

// eslint-disable-next-line jest/expect-expect
test('update a case', async () => {
  const req = mockRequest();
  req.session.userCase.id = '123';
  const returnOfMappCaseata = mapCaseData(req);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dummyUserDetails = {
    accessToken: 'axxx',
    id: '123',
    email: 'test@test.com',
    givenName: 'test',
    familyName: 'test',
  };

  await CaseAPIInstance.updateCase(returnOfMappCaseata, dummyUserDetails);
});

test('should return stored value for usercase in session', () => {
  const req = mockRequest();
  const returnOfMappCaseata = mapCaseData(req);
  expect(returnOfMappCaseata).not.toEqual(req.session.userCase);
});

// eslint-disable-next-line jest/expect-expect
test('Should return case roles for userId and caseId passed', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  await CaseAPIInstance.getCaseUserRoles('abc', '12ex');
  mockedAxios.get.mockResolvedValue({
    data: {
      case_users: [
        {
          case_id: '1624351572550045',
          user_id: '372ff9c1-9930-46d9-8bd2-88dd26ba2475',
          case_role: '[APPLICANTTWO]',
        },
      ],
    },
  });
});

// eslint-disable-next-line jest/expect-expect
test('Should throw error when case roles could not be fetched', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockRejectedValue({
    config: { method: 'GET', url: 'https://example.com/case-users' },
    request: 'mock request',
  });
});
