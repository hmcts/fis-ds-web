import { CaseData } from './definition';
import { fromApiFormat } from './from-api-format';

describe('from-api-format', () => {
  const results: Partial<Record<keyof CaseData, string | any | null>> = {};

  test('should convert results from api to adoption-web format', async () => {
    const adoptionFormat = fromApiFormat({
      applicant1AdditionalNames: [
        { id: 'MOCK_ID', value: { firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' } },
      ],
      applicant2AdditionalNames: [
        { id: 'MOCK_ID', value: { firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' } },
      ],
      applicant1AdditionalNationalities: [{ id: 'MOCK_ID', value: { country: 'MOCK_COUNTRY' } }],
      applicant2AdditionalNationalities: [{ id: 'MOCK_ID', value: { country: 'MOCK_COUNTRY' } }],
      childrenAdditionalNationalities: [{ id: 'MOCK_ID', value: { country: 'MOCK_COUNTRY' } }],
      placementOrders: [
        {
          id: 'MOCK_ID',
          value: {
            placementOrderId: 'MOCK_ID',
            placementOrderType: 'MOCK_TYPE',
            placementOrderNumber: 'MOCK_NUMBER',
            placementOrderCourt: 'MOCK_COURT',
            placementOrderDate: '2021-01-05',
          },
        },
      ],
      siblings: [
        {
          id: 'MOCK_SIBLING_ID',
          value: {
            siblingId: 'MOCK_SIBLING_ID',
            siblingFirstName: 'MOCK_FIRST_NAMES',
            siblingLastNames: 'MOCK_LAST_NAMES',
            siblingPlacementOrders: [
              {
                id: 'MOCK_PLACEMENT_ORDER_ID',
                value: {
                  placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
                  placementOrderType: 'MOCK_TYPE',
                  placementOrderNumber: 'MOCK_NUMBER',
                },
              },
            ],
          },
        },
      ],
      adopAgencyOrLAs: [
        {
          id: 'MOCK_ID',
          value: {
            adopAgencyOrLaId: 'MOCK_ID',
            adopAgencyOrLaName: 'MOCK_NAME',
            adopAgencyOrLaPhoneNumber: 'MOCK_PHONE_NUMBER',
            adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME',
            adopAgencyOrLaContactEmail: 'MOCK_CONTACT_EMAIL',
          },
        },
      ],
      applicantDateOfBirth: '2000-01-20',
      dateChildMovedIn: '2021-01-01',
      applicant2DateOfBirth: '',
      childrenDateOfBirth: '2020-01-05',
      applicant1StatementOfTruth: 'No',
      applicant2StatementOfTruth: '',
    } as unknown as CaseData);

    expect(adoptionFormat).toStrictEqual({
      dateChildMovedIn: { day: '1', month: '1', year: '2021' },
      applicant1AdditionalNames: [{ id: 'MOCK_ID', firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' }],
      applicant2AdditionalNames: [{ id: 'MOCK_ID', firstNames: 'MOCK_FIRST_NAMES', lastNames: 'MOCK_LAST_NAMES' }],
      applicant1AdditionalNationalities: ['MOCK_COUNTRY'],
      applicant2AdditionalNationalities: ['MOCK_COUNTRY'],
      childrenAdditionalNationalities: ['MOCK_COUNTRY'],
      applicantDateOfBirth: { day: '20', month: '1', year: '2000' },
      applicant2DateOfBirth: undefined,
      childrenDateOfBirth: { day: '5', month: '1', year: '2020' },
      placementOrders: [
        {
          placementOrderId: 'MOCK_ID',
          placementOrderType: 'MOCK_TYPE',
          placementOrderNumber: 'MOCK_NUMBER',
          placementOrderCourt: 'MOCK_COURT',
          placementOrderDate: { day: '5', month: '1', year: '2021' },
        },
      ],
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingFirstName: 'MOCK_FIRST_NAMES',
          siblingLastNames: 'MOCK_LAST_NAMES',
          siblingPlacementOrders: [
            {
              placementOrderId: 'MOCK_PLACEMENT_ORDER_ID',
              placementOrderType: 'MOCK_TYPE',
              placementOrderNumber: 'MOCK_NUMBER',
            },
          ],
        },
      ],
      adopAgencyOrLAs: [
        {
          adopAgencyOrLaId: 'MOCK_ID',
          adopAgencyOrLaName: 'MOCK_NAME',
          adopAgencyOrLaPhoneNumber: 'MOCK_PHONE_NUMBER',
          adopAgencyOrLaContactName: 'MOCK_CONTACT_NAME',
          adopAgencyOrLaContactEmail: 'MOCK_CONTACT_EMAIL',
        },
      ],
      applicant1IBelieveApplicationIsTrue: '',
      applicant2IBelieveApplicationIsTrue: undefined,
    });
  });

  test('should convert results from api to adoption-web format when sibling has no placementOrders', async () => {
    const adoptionFormat = fromApiFormat({
      siblings: [
        {
          id: 'MOCK_SIBLING_ID',
          value: {
            siblingId: 'MOCK_SIBLING_ID',
            siblingFirstName: 'MOCK_FIRST_NAMES',
            siblingLastNames: 'MOCK_LAST_NAMES',
            siblingPlacementOrders: undefined,
          },
        },
      ],
    } as unknown as CaseData);

    expect(adoptionFormat).toStrictEqual({
      siblings: [
        {
          siblingId: 'MOCK_SIBLING_ID',
          siblingFirstName: 'MOCK_FIRST_NAMES',
          siblingLastNames: 'MOCK_LAST_NAMES',
          siblingPlacementOrders: [],
        },
      ],
    });
  });

  test('ignores empty addresses', async () => {
    const nfdivFormat = fromApiFormat({
      marriageDate: undefined,
      dateSubmitted: '2021-01-01',
    } as unknown as CaseData);

    expect(nfdivFormat).toStrictEqual({
      dateSubmitted: new Date('2021-01-01'),
    });
  });

  describe('converting your address between UK and international', () => {
    test('converts to an international format', () => {
      const nfdivFormat = fromApiFormat({
        ...results,
        applicant1HomeAddress: {
          AddressLine1: 'Line 1',
          AddressLine2: 'Line 2',
          AddressLine3: 'Line 3',
          PostTown: 'Town',
          County: 'State',
          PostCode: 'Zip code',
          Country: 'Country',
        },
      } as unknown as CaseData);

      expect(nfdivFormat).toMatchObject({});
    });
  });
});
