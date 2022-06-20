const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import { Case } from './case';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {
  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      applicant1HelpWithFeesRefNo: '123-ABC',
    } as Partial<Case>);

    expect(apiFormat).not.toMatchObject({
      applicant1HWFReferenceNumber: '123-ABC',
    });
  });
});

describe('toApiDate', () => {
  test('handles invalid data correctly', async () => {
    const date = new Date();
    const parseddate = date.getFullYear + '-' + date.getMonth + '-' + date.getDay;
    const apiFormatDate = toApiDate(parseddate);
    expect(apiFormatDate).not.toEqual('2020-12-12');
  });
});

describe('ToApiConverters', () => {
  test('ToApiConverters - Converting to api data', async () => {
    const toAPIEnteries = fields;
    expect(toAPIEnteries.hasOwnProperty('applicantDateOfBirth')).toBe(true);
  });
});
