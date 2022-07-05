import { mockRequest } from '../../test/unit/utils/mockRequest';
import { AppRequest } from '../app/controller/AppRequest';

import { APPLYING_WITH_URL } from './urls';

import { getNextStepUrl } from './index';

describe('Steps', () => {
  describe('getNextStep()', () => {
    let mockReq: AppRequest;
    beforeEach(() => {
      mockReq = mockRequest();
    });

    it('moves into a dead end when the response matches', () => {
      mockReq.originalUrl = APPLYING_WITH_URL;
      const data = {};
      const actual = getNextStepUrl(mockReq, data);
      expect(actual).not.toBe('/task-list');
    });
  });
});
