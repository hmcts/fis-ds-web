/* eslint-disable @typescript-eslint/no-explicit-any */
const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import axios from 'axios';
import config from 'config';
import { Application } from 'express';

import { mockRequest } from '../../../test/unit/utils/mockRequest';

import { PCQProvider } from './index';

describe('PcqProvider', () => {
  let appRequest;
  jest.mock('axios');
  config.get = jest.fn();
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.create = jest.fn(() => mockedAxios);

  beforeEach(() => {
    appRequest = {
      query: {
        lng: 'en',
      },
      get: jest.fn(),
      post: jest.fn(),
      delete: jest.fn(),
      use: jest.fn(),
      locals: {
        errorHandler: jest.fn(arg => arg),
      },
      session: {
        applicationSettings: {},
        user: {
          accessToken: 'testUserToken',
          email: 'user@gmail.com',
        },
        lang: 'cy',
        save: jest.fn(done => done()),
      },
    } as unknown as Application;
    jest.clearAllMocks();
    jest.spyOn((PCQProvider as any).route, 'enable');
  });

  test('when enabling Pcq module', async () => {
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'true');
    await PCQProvider.enable(appRequest);
    expect((PCQProvider as any).route.enable(appRequest)).toBeCalled;
  });

  test('get PcqId from the request', async () => {
    const pcqId = await PCQProvider.getPcqId(appRequest);
    expect(pcqId).toEqual(appRequest.session.applicationSettings.pcqId);
  });

  test('when initializing the module', async () => {
    const req = mockRequest({
      session: {
        user: {
          accessToken: 'testUserToken',
        },
        applicationSettings: {},
        lang: 'cy',
        save: jest.fn(done => done()),
      },
    });
    req.get = jest.fn();
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'true');
    mockedAxios.create.mockResolvedValueOnce;
    PCQProvider.initialiseLogger(req);
    PCQProvider.log('test', 'test error message');
    expect(req.session.applicationSettings.pcqId).toBe(undefined);
  });

  test('build pcq params from the request for applicant', async () => {
    appRequest.session.userCase = {
      caseTypeOfApplication: 'C100',
    };
    appRequest.url = 'http://localhost:3031/edgeCase';
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'password');
    const params = await PCQProvider.buildRequestParams(appRequest, 'http://localhost:3031');
    expect(params.actor).toEqual('APPLICANT');
  });

  test('build pcq service url', async () => {
    appRequest.session = {
      ...appRequest.session,
      userCase: {
        caseTypeOfApplication: 'C100',
      },
      lang: 'en',
      applicationSettings: {
        pcqId: 'qwer-qwer-qwer-qwert',
      },
    };
    jest.spyOn(config, 'get').mockImplementationOnce(() => 'password');
    appRequest.url = 'http://localhost:3031/tasklistresponse';
    const url = await PCQProvider.getPcqServiceUrl(
      'http://localhost',
      '/service-endpoint',
      appRequest,
      'actor=APPLICANT'
    );
    expect(url).toEqual(
      'http://localhost/service-endpoint?serviceId=prl_ca&actor=APPLICANT&pcqId=MOCK_V4_UUID&partyId=user@gmail.com&returnUrl=actor=APPLICANT&language=en&ccdCaseId=undefined&token=b768000010d95d8814cc797c341dfcd9cdd693088e686ac1890b95c14ce0dd05d2027cf31ccea051a781eef6bdfef898bb08e421a53e5ce9290e5d87f7edf0b8072f047ffb3000551116efa641a0e8ff2b3bb9ef443907a9b5a20d972ccc0831f201308e1cc15bacc0e41a046c2939e9eb3f61e5bef8a46cb6f80a4bf5996034caf7a87d2137b55c2223759563d92b9e498e03491b9600b543b0085065d4c5c16e78'
    );
  });

  test('should return url', async () => {
    appRequest.protocol = 'http';
    appRequest.hostname = 'localhost:3031';
    appRequest.host = 'localhost:3031';
    const url = PCQProvider.getReturnUrl(appRequest, 'asd');
    expect(url).toContain('http://undefinedasd');
  });
});
