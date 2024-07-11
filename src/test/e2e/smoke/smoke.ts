/* eslint-disable import/order */
import axios from 'axios';
import config from 'config';

jest.retryTimes(20);
jest.setTimeout(15000);

const servicesToCheck = [
  { name: 'Private Law', url: process.env.TEST_URL },
  { name: 'IDAM Web', url: config.get('services.idam.authorizationURL') },
  { name: 'IDAM API', url: config.get('services.idam.tokenURL') },
  { name: 'Auth Provider', url: config.get('services.authProvider.url') },
  { name: 'CCD Data Store', url: config.get('services.case.url') },
  { name: 'COS', url: config.get('services.cos.url') },
  { name: 'Document Management', url: config.get('services.documentManagement.url') },
  {
    name: 'Postcode Lookup',
    url: config.get('services.postcodeLookup.url'),
    healthEndpoint: '/search/places/v1',
    externalService: true,
  },
  { name: 'PCQ', url: config.get('services.equalityAndDiversity.url') },
];