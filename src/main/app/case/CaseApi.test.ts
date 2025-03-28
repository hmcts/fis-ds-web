import axios from 'axios';
import FormData from 'form-data';
import { LoggerInstance } from 'winston';

import { mockUserCase1 } from '../../../test/unit/utils/mockUserCase';

import { CaseApi } from './CaseApi';

jest.mock('axios');
const mockLogger = {
  error: jest.fn().mockImplementation((message: string) => message),
  info: jest.fn().mockImplementation((message: string) => message),
} as unknown as LoggerInstance;

test('Should throw error when case is not created', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockResolvedValue({
    status: '200',
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
  const userCase = mockUserCase1;
  const api = new CaseApi(axios, mockLogger);
  await expect(api.createCase(userCase)).rejects.toThrowError(
    'createCase - error in creating case. case could not be created'
  );
});

test('Should return mapped response when case is created successfully', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const userCase = { ...mockUserCase1, edgeCaseTypeOfApplication: 'FMPO' };

  mockedAxios.post.mockResolvedValue({
    status: 200,
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
  const api = new CaseApi(axios, mockLogger);
  const result = await api.createCase(userCase);
  expect(result).toBeDefined();
});

test('Should return mapped response when case is updated successfully', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const userCase = { ...mockUserCase1, id: '1' };

  mockedAxios.post.mockResolvedValue({
    status: 200,
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
  const api = new CaseApi(axios, mockLogger);
  const result = await api.updateCase(userCase, 'UPDATE_EVENT');
  expect(result).toBeDefined();
});

test('Should return court list when API call is successful', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockData = [{ name: 'Court A' }, { name: 'Court B' }];

  mockedAxios.get.mockResolvedValue({
    status: 200,
    data: mockData,
  });

  const api = new CaseApi(axios, mockLogger);
  const result = await api.getCourtList();
  expect(result).toEqual(mockData);
});

test('Should log error and info when API returns error response', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockRejectedValue({
    response: {
      config: { method: 'GET', url: '/edge-case/court-list' },
      status: 500,
      data: { message: 'Server error' },
    },
  });

  const api = new CaseApi(axios, mockLogger);
  await expect(api.getCourtList()).rejects.toThrow();

  expect(mockLogger.error).toHaveBeenCalledWith('API Error GET /edge-case/court-list 500');
  expect(mockLogger.info).toHaveBeenCalledWith('Response: ', { message: 'Server error' });
});

test('Should log error when API request fails (no response)', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockRejectedValue({
    request: {
      config: { method: 'GET', url: '/edge-case/court-list' },
    },
  });

  const api = new CaseApi(axios, mockLogger);
  await expect(api.getCourtList()).rejects.toThrow();

  expect(mockLogger.error).toHaveBeenCalledWith('API Error GET /edge-case/court-list');
});

test('Should throw error when id is missing', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockResolvedValue({
    status: '200',
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
  const userCase = mockUserCase1;
  const api = new CaseApi(axios, mockLogger);
  await expect(api.updateCase(userCase, 'CITIZEN_SUBMIT')).rejects.toThrowError(
    'updateCase - error in updating case. case could not be updated.'
  );
});

test('Should throw error when court cannot be fetched', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.get.mockRejectedValue({
    config: { method: 'GET', url: 'https://example.com' },
  });
  const api = new CaseApi(axios, mockLogger);
  await expect(api.getCourtList()).rejects.toThrowError('getCourtList - court list could not be fetched.');
});

test('Should upload document and return response', async () => {
  const formData = new FormData();
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const mockResponse = {
    status: 200,
    data: {
      document: { id: 'doc1' },
      status: 'success',
    },
  };

  mockedAxios.post.mockResolvedValue(mockResponse);
  const api = new CaseApi(axios, mockLogger);
  const result = await api.uploadDocument(formData);

  expect(result).toEqual(mockResponse.data);
});

test('Should delete document successfully', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.delete.mockResolvedValue({ status: 200 });

  const api = new CaseApi(axios, mockLogger);
  const result = await api.deleteDocument('doc123');

  expect(result).toBeUndefined();
});

test('Error should be thrown if status code is 404', async () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  mockedAxios.delete.mockResolvedValue({ status: 404 });

  const api = new CaseApi(axios, mockLogger);

  await expect(api.deleteDocument('doc123')).rejects.toThrowError('Document could not be deleted.');
});
