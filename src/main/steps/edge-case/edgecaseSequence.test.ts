import {
  ADDITIONAL_DOCUMENTS_UPLOAD,
  CHECK_YOUR_ANSWERS,
  CONTACT_DETAILS,
  CONTACT_PREFERENCES,
  DATE_OF_BIRTH,
  EMAIL_ADDRESS,
  FIND_ADDRESS,
  FULL_NAME,
  MANUAL_ADDRESS,
  SELECT_ADDRESS,
  STATEMENT_OF_TRUTH,
  UPLOAD_YOUR_DOCUMENTS,
  USER_ROLE,
} from '../urls';

import { edgecaseSequence } from './edgecaseSequence';

describe('Sequence must match respective path', () => {
  test('must match the path', () => {
    expect(edgecaseSequence).toHaveLength(14);

    expect(edgecaseSequence[0].url).toBe(USER_ROLE);
    expect(edgecaseSequence[0].getNextStep({})).toBe(FULL_NAME);

    expect(edgecaseSequence[1].url).toBe(FULL_NAME);
    expect(edgecaseSequence[1].getNextStep({})).toBe(DATE_OF_BIRTH);

    expect(edgecaseSequence[2].url).toBe(DATE_OF_BIRTH);
    expect(edgecaseSequence[2].getNextStep({})).toBe(FIND_ADDRESS);

    expect(edgecaseSequence[3].url).toBe(FIND_ADDRESS);
    expect(edgecaseSequence[3].getNextStep({})).toBe(SELECT_ADDRESS);

    expect(edgecaseSequence[5].url).toBe(MANUAL_ADDRESS);
    expect(edgecaseSequence[5].getNextStep({})).toBe(CONTACT_PREFERENCES);

    expect(edgecaseSequence[6].url).toBe(CONTACT_PREFERENCES);
    expect(edgecaseSequence[6].getNextStep({})).toBe(EMAIL_ADDRESS);

    expect(edgecaseSequence[7].url).toBe(EMAIL_ADDRESS);
    expect(edgecaseSequence[7].getNextStep({})).toBe(CONTACT_DETAILS);

    expect(edgecaseSequence[8].url).toBe(CONTACT_DETAILS);
    expect(edgecaseSequence[8].getNextStep({})).toBe(UPLOAD_YOUR_DOCUMENTS);

    expect(edgecaseSequence[9].url).toBe(UPLOAD_YOUR_DOCUMENTS);
    expect(edgecaseSequence[9].getNextStep({})).toBe(ADDITIONAL_DOCUMENTS_UPLOAD);

    expect(edgecaseSequence[8].url).toBe(CONTACT_DETAILS);
    expect(edgecaseSequence[8].url).toBe(CONTACT_DETAILS);

    expect(edgecaseSequence[9].url).toBe(UPLOAD_YOUR_DOCUMENTS);
    expect(edgecaseSequence[9].getNextStep({})).toBe(ADDITIONAL_DOCUMENTS_UPLOAD);

    expect(edgecaseSequence[10].url).toBe(ADDITIONAL_DOCUMENTS_UPLOAD);
    expect(edgecaseSequence[10].getNextStep({})).toBe(CHECK_YOUR_ANSWERS);

    expect(edgecaseSequence[11].url).toBe(CHECK_YOUR_ANSWERS);
    expect(edgecaseSequence[11].getNextStep({})).toBe(STATEMENT_OF_TRUTH);
  });
});
