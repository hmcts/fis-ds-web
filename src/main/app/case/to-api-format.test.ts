const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import { Case } from './case';
import { toApiDate, toApiFormat } from './to-api-format';

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

test('should convert date of birth format to backend api format', async () => {
  const dateFormat = toApiDate({ day: '20', month: '1', year: '2000' });
  expect(dateFormat).toMatch('2000-01-20');
});

test('if date is null then check for empty value', async () => {
  const dateFormat = toApiDate({ day: '', month: '1', year: '2000' });
  expect(dateFormat).toMatch('');
});
