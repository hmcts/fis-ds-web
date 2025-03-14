import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { CommonContent } from '../../common/common.content';
import { interpolate } from '../../common/string-parser';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const resourceLoader = new ResourceReader();
resourceLoader.Loader('pay-your-fee');
const translations = resourceLoader.getFileContents().translations;
const enContent = translations['en'];
const cyContent = translations['cy'];

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('pay your fee > content', () => {
  const commonContent = {
    language: 'en',
    userCase: {},
    additionalData: { req: { session: { errors: [] } } },
  } as unknown as CommonContent;
  let generatedContent;

  beforeEach(() => {
    generatedContent = generateContent({ ...commonContent, userCase: { id: '123' } });
  });

  test('should return correct english content', () => {
    enContent.errors.paymentError.applicationNotSubmitted = interpolate(
      enContent.errors.paymentError.applicationNotSubmitted,
      { caseId: '123' }
    );
    expect(generatedContent.title).toEqual(enContent.title);
    expect(generatedContent.errors).toEqual(enContent.errors);
  });

  test('should return correct welsh content', () => {
    generatedContent = generateContent({ ...commonContent, language: 'cy', userCase: { id: '123' } });
    cyContent.errors.paymentError.applicationNotSubmitted = interpolate(
      cyContent.errors.paymentError.applicationNotSubmitted,
      { caseId: '123' }
    );
    expect(generatedContent.title).toEqual(cyContent.title);
    expect(generatedContent.errors).toEqual(cyContent.errors);
  });

  test('should contain continue button', () => {
    expect(generatedContent.continue).toEqual(enContent.continue);
  });
});
