const v4Mock = jest.fn().mockReturnValue('MOCK_V4_UUID');
jest.mock('uuid', () => ({
  v4: v4Mock,
}));

import { Case, Checkbox } from './case';
import { YesOrNo } from './definition';
import { toApiFormat } from './to-api-format';

describe('to-api-format', () => {

  test('handles invalid data correctly', async () => {
    const apiFormat = toApiFormat({
      applicant1HelpWithFeesRefNo: '123-ABC',
    } as Partial<Case>);

    expect(apiFormat).toMatchObject({
      applicant1HWFReferenceNumber: '',
    });
  });

  test.each([
    {
      applicant1HelpPayingNeeded: YesOrNo.YES,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.YES,
      },
    },
    {
      applicant1HelpPayingNeeded: YesOrNo.NO,
      expected: {
        applicant1HWFNeedHelp: YesOrNo.NO,
        applicant1HWFAppliedForFees: null,
        applicant1HWFReferenceNumber: null,
      },
    },
    {
      applicant1IBelieveApplicationIsTrue: Checkbox.Checked,
      expected: {
        applicant1StatementOfTruth: 'Yes',
      },
    },
    {
      applicant1HasOtherNames: YesOrNo.NO,
      applicant1AdditionalNames: [],
      expected: {
        applicant1AdditionalNames: [],
      },
    },
    {
      applicant1HasOtherNames: YesOrNo.YES,
      applicant1AdditionalNames: undefined,
      expected: {
        applicant1AdditionalNames: [],
      },
    },
    {
      applicant2HasOtherNames: YesOrNo.NO,
      applicant2AdditionalNames: [],
      expected: {
        applicant2AdditionalNames: [],
      },
    },
    {
      applicant2HasOtherNames: YesOrNo.YES,
      applicant2AdditionalNames: undefined,
      expected: {
        applicant2AdditionalNames: [],
      },
    },
    {
      applicant1AdditionalNationalities: undefined,
      expected: {
        applicant1AdditionalNationalities: [],
      },
    },
    {
      applicant2AdditionalNationalities: undefined,
      expected: {
        applicant2AdditionalNationalities: [],
      },
    },
    {
      childrenAdditionalNationalities: undefined,
      expected: {
        childrenAdditionalNationalities: [],
      },
    },
    {
      placementOrders: undefined,
      expected: {
        placementOrders: [],
      },
    },
    {
      siblings: undefined,
      expected: {
        siblings: [],
      },
    },
    {
      siblings: [{ siblingPlacementOrders: undefined }],
      expected: {
        siblings: [{ id: 'MOCK_V4_UUID', value: { siblingPlacementOrders: [] } }],
      },
    },
    {
      adopAgencyOrLAs: undefined,
      expected: {
        adopAgencyOrLAs: [],
      },
    },
  ])('set unreachable answers to null if condition met', ({ expected, ...formData }) => {
    expect(toApiFormat(formData as Partial<Case>)).toMatchObject(expected);
  });
});
