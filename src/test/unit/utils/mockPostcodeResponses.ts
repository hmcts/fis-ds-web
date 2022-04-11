export const validPostcode200Response = {
  header: {
    uri: 'https://api.os.uk/search/places/v1/postcode?postcode=AB1%202CD',
    query: 'postcode=AB1 2CD',
    offset: 0,
    totalresults: 5,
    format: 'JSON',
    dataset: 'DPA',
    lr: 'EN,CY',
    maxresults: 100,
    epoch: '82',
    output_srs: 'EPSG:27700',
  },
  results: [
    {
      DPA: {
        UPRN: '12345',
        UDPRN: '67890',
        ADDRESS: 'BUCKINGHAM PALACE, LONDON, SW1A 1AA',
        ORGANISATION_NAME: 'BUCKINGHAM PALACE',
        POST_TOWN: 'LONDON',
        POSTCODE: 'SW1A 1AA',
        RPC: '1',
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
        STATUS: 'APPROVED',
        LOGICAL_STATUS_CODE: '1',
        CLASSIFICATION_CODE: 'PP',
        CLASSIFICATION_CODE_DESCRIPTION: 'Property Shell',
        LOCAL_CUSTODIAN_CODE: 5990,
        LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'CITY OF WESTMINSTER',
        POSTAL_ADDRESS_CODE: 'D',
        POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
        BLPU_STATE_CODE: '2',
        BLPU_STATE_CODE_DESCRIPTION: 'In use',
        TOPOGRAPHY_LAYER_TOID: 'osgb10000',
        LAST_UPDATE_DATE: '10/02/2016',
        ENTRY_DATE: '27/04/2003',
        BLPU_STATE_DATE: '27/04/2003',
        LANGUAGE: 'EN',
        MATCH: 1.0,
        MATCH_DESCRIPTION: 'EXACT',
      },
    },
    {
      DPA: {
        UPRN: '12345',
        UDPRN: '67890',
        ADDRESS: 'THE STATE APARTMENTS, KENSINGTON PALACE, PALACE GREEN, LONDON, W1 2AB',
        ORGANISATION_NAME: 'THE STATE APARTMENTS',
        BUILDING_NAME: 'KENSINGTON PALACE',
        THOROUGHFARE_NAME: 'PALACE GREEN',
        POST_TOWN: 'LONDON',
        POSTCODE: 'W1 2AB',
        RPC: '2',
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
        STATUS: 'APPROVED',
        LOGICAL_STATUS_CODE: '1',
        CLASSIFICATION_CODE: 'MG',
        CLASSIFICATION_CODE_DESCRIPTION: 'Defence Estates',
        LOCAL_CUSTODIAN_CODE: 5600,
        LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'KENSINGTON AND CHELSEA',
        POSTAL_ADDRESS_CODE: 'D',
        POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
        BLPU_STATE_CODE: null,
        BLPU_STATE_CODE_DESCRIPTION: 'Unknown/Not applicable',
        TOPOGRAPHY_LAYER_TOID: 'osgb10000',
        PARENT_UPRN: '217',
        LAST_UPDATE_DATE: '10/02/2016',
        ENTRY_DATE: '14/12/2000',
        LANGUAGE: 'EN',
        MATCH: 1.0,
        MATCH_DESCRIPTION: 'EXACT',
      },
    },
    {
      DPA: {
        UPRN: '12345',
        UDPRN: '67890',
        ADDRESS: '1, KENSINGTON PALACE GARDENS, LONDON, W1 2AB',
        BUILDING_NUMBER: '1',
        THOROUGHFARE_NAME: 'KENSINGTON PALACE GARDENS',
        POST_TOWN: 'LONDON',
        POSTCODE: 'W1 2AB',
        RPC: '2',
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
        STATUS: 'APPROVED',
        LOGICAL_STATUS_CODE: '1',
        CLASSIFICATION_CODE: 'PP',
        CLASSIFICATION_CODE_DESCRIPTION: 'Property Shell',
        LOCAL_CUSTODIAN_CODE: 5600,
        LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'KENSINGTON AND CHELSEA',
        POSTAL_ADDRESS_CODE: 'D',
        POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
        BLPU_STATE_CODE: null,
        BLPU_STATE_CODE_DESCRIPTION: 'Unknown/Not applicable',
        TOPOGRAPHY_LAYER_TOID: 'osgb10000',
        LAST_UPDATE_DATE: '17/06/2016',
        ENTRY_DATE: '14/12/2000',
        LANGUAGE: 'EN',
        MATCH: 1.0,
        MATCH_DESCRIPTION: 'EXACT',
      },
    },
    {
      DPA: {
        UPRN: '12345',
        UDPRN: '67890',
        ADDRESS: '12345A, CHURCH ROAD, LITTLE BERKHAMSTED, HERTFORD, SG12 3AB',
        BUILDING_NAME: '12345A',
        THOROUGHFARE_NAME: 'CHURCH ROAD',
        DEPENDENT_LOCALITY: 'LITTLE BERKHAMSTED',
        POST_TOWN: 'HERTFORD',
        POSTCODE: 'SG12 3AB',
        RPC: '2',
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
        STATUS: 'APPROVED',
        LOGICAL_STATUS_CODE: '1',
        CLASSIFICATION_CODE: 'RD03',
        CLASSIFICATION_CODE_DESCRIPTION: 'Semi-Detached',
        LOCAL_CUSTODIAN_CODE: 1915,
        LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'EAST HERTFORDSHIRE',
        POSTAL_ADDRESS_CODE: 'D',
        POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
        BLPU_STATE_CODE: '2',
        BLPU_STATE_CODE_DESCRIPTION: 'In use',
        TOPOGRAPHY_LAYER_TOID: 'osgb100000',
        LAST_UPDATE_DATE: '12/11/2018',
        ENTRY_DATE: '24/04/2001',
        BLPU_STATE_DATE: '28/06/2007',
        LANGUAGE: 'EN',
        MATCH: 1,
        MATCH_DESCRIPTION: 'EXACT',
      },
    },
    {
      DPA: {
        UPRN: '12345',
        UDPRN: '67890',
        ADDRESS: 'COMPANY LTD, UNIT 1234, SHINGLE HALL, TRIMMS GREEN, SAWBRIDGEWORTH, CM12 3AB',
        ORGANISATION_NAME: 'COMPANY LTD',
        SUB_BUILDING_NAME: 'UNIT 1234',
        BUILDING_NAME: 'SHINGLE HALL',
        DEPENDENT_LOCALITY: 'TRIMMS GREEN',
        POST_TOWN: 'SAWBRIDGEWORTH',
        POSTCODE: 'CM12 3AB',
        RPC: '2',
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
        STATUS: 'APPROVED',
        LOGICAL_STATUS_CODE: '1',
        CLASSIFICATION_CODE: 'CI03',
        CLASSIFICATION_CODE_DESCRIPTION: 'Workshop / Light Industrial',
        LOCAL_CUSTODIAN_CODE: 1915,
        LOCAL_CUSTODIAN_CODE_DESCRIPTION: 'EAST HERTFORDSHIRE',
        POSTAL_ADDRESS_CODE: 'D',
        POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
        BLPU_STATE_CODE: '2',
        BLPU_STATE_CODE_DESCRIPTION: 'In use',
        TOPOGRAPHY_LAYER_TOID: 'osgb10000',
        PARENT_UPRN: '100',
        LAST_UPDATE_DATE: '10/02/2016',
        ENTRY_DATE: '22/03/2005',
        BLPU_STATE_DATE: '28/04/2008',
        LANGUAGE: 'EN',
        MATCH: 1,
        MATCH_DESCRIPTION: 'EXACT',
      },
    },
    {
      DPA: {
        UPRN: '12345',
        UDPRN: '67890',
        ADDRESS: 'BUILDING NAME, GREAT WOOD, THE RIDGEWAY, NORTHAW, POTTERS BAR, EN1 2AB',
        BUILDING_NAME: 'BUILDING NAME',
        DEPENDENT_THOROUGHFARE_NAME: 'GREAT WOOD',
        THOROUGHFARE_NAME: 'THE RIDGEWAY',
        DEPENDENT_LOCALITY: 'NORTHAW',
        DOUBLE_DEPENDENT_LOCALITY: 'SNOWFIELD',
        POST_TOWN: 'POTTERS BAR',
        POSTCODE: 'EN1 2AB',
        RPC: '1',
        X_COORDINATE: 0,
        Y_COORDINATE: 0,
        STATUS: 'APPROVED',
        LOGICAL_STATUS_CODE: '1',
        CLASSIFICATION_CODE: 'RD02',
        CLASSIFICATION_CODE_DESCRIPTION: 'Detached',
        LOCAL_CUSTODIAN_CODE: 1950,
        POSTAL_ADDRESS_CODE: 'D',
        POSTAL_ADDRESS_CODE_DESCRIPTION: 'A record which is linked to PAF',
        BLPU_STATE_CODE: '2',
        BLPU_STATE_CODE_DESCRIPTION: 'In use',
        TOPOGRAPHY_LAYER_TOID: 'osgb10000',
        PARENT_UPRN: '100',
        LAST_UPDATE_DATE: '10/02/2016',
        ENTRY_DATE: '01/04/1993',
        BLPU_STATE_DATE: '01/04/1993',
        LANGUAGE: 'EN',
        MATCH: 1,
        MATCH_DESCRIPTION: 'EXACT',
      },
    },
  ],
};

export const emptyPostcode200Response = {
  header: {
    uri: 'https://api.os.uk/search/places/v1/postcode?postcode=S12AA',
    query: 'postcode=S12AA',
    offset: 0,
    totalresults: 0,
    format: 'JSON',
    dataset: 'DPA',
    lr: 'EN,CY',
    maxresults: 100,
    epoch: '82',
    output_srs: 'EPSG:27700',
  },
};

export const invalidPostcode400Response = {
  error: {
    statuscode: 400,
    message:
      'Requested postcode must contain a minimum of the sector plus 1 digit of the district e.g. SO1. Requested postcode was invalid',
  },
};

export const invalidPostcodeKey401Response = {
  fault: {
    faultstring: 'Invalid ApiKey',
    detail: {
      errorcode: 'oauth.v2.InvalidApiKey',
    },
  },
};