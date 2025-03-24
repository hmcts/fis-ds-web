//import { defaultViewArgs } from '../../../test/unit/utils/defaultViewArgs';
import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
//import { generatePageContent } from '../../steps/common/common.content';
// import { State } from '../case/definition';

import { PcqController } from './controller';

describe('PcqController', () => {
  test('launch', async () => {
    const controller = new PcqController();

    const req = mockRequest();
    const res = mockResponse();
    controller.launch(req, res, 'asd');
    expect(res.redirect).toHaveBeenCalled;
  });
  test('onPcqCompletion', async () => {
    const controller = new PcqController();

    const req = mockRequest();
    const res = mockResponse();
    controller.onPcqCompletion(req, res);
    expect(res.redirect).toHaveBeenCalled;
  });
});
