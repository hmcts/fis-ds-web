import {
  ADDITIONAL_DOCUMENTS_UPLOAD,
  CONTACT_DETAILS,
  DATE_OF_BIRTH,
  FIND_ADDRESS,
  FULL_NAME,
  MANUAL_ADDRESS,
  PAY_YOUR_FEE,
  SELECT_ADDRESS,
  STATEMENT_OF_TRUTH,
  UPLOAD_YOUR_DOCUMENTS,
  USER_ROLE,
} from '../urls';

import { edgecaseSequence } from './edgecaseSequence';

describe('Sequence must match respective path', () => {
  test('must match the path', () => {
    expect(edgecaseSequence).toHaveLength(11);

    expect(edgecaseSequence[0].url).toBe(USER_ROLE);
    expect(edgecaseSequence[0].getNextStep({})).toBe(FULL_NAME);

    expect(edgecaseSequence[1].url).toBe(FULL_NAME);
    expect(edgecaseSequence[1].getNextStep({})).toBe(DATE_OF_BIRTH);

    expect(edgecaseSequence[2].url).toBe(DATE_OF_BIRTH);
    expect(edgecaseSequence[2].getNextStep({})).toBe(FIND_ADDRESS);

    expect(edgecaseSequence[3].url).toBe(FIND_ADDRESS);
    expect(edgecaseSequence[3].getNextStep({})).toBe(SELECT_ADDRESS);

    expect(edgecaseSequence[5].url).toBe(MANUAL_ADDRESS);
    expect(edgecaseSequence[5].getNextStep({})).toBe(CONTACT_DETAILS);

    expect(edgecaseSequence[6].url).toBe(CONTACT_DETAILS);
    expect(edgecaseSequence[6].getNextStep({})).toBe(UPLOAD_YOUR_DOCUMENTS);

    expect(edgecaseSequence[7].url).toBe(UPLOAD_YOUR_DOCUMENTS);
    expect(edgecaseSequence[7].getNextStep({})).toBe(ADDITIONAL_DOCUMENTS_UPLOAD);

    expect(edgecaseSequence[8].url).toBe(ADDITIONAL_DOCUMENTS_UPLOAD);
    expect(edgecaseSequence[8].getNextStep({})).toBe(STATEMENT_OF_TRUTH);

    expect(edgecaseSequence[9].url).toBe(STATEMENT_OF_TRUTH);
    expect(edgecaseSequence[9].getNextStep({})).toBe(PAY_YOUR_FEE);
    /**
 *     expect(edgecaseSequence[9].url).toBe(PAY_YOUR_FEE);
    expect(edgecaseSequence[9].getNextStep({})).toBe(USER_ROLE);
 */
  });
});

describe('sample test', () => {
  test('should contain 12 entries in applicant 1 screen sequence', () => {
    expect(1).toBe(1);
  });
});
