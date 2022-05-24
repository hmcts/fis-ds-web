import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../app/case/definition';
import { isFieldFilledIn } from '../../../app/form/validation';
import * as steps from '../../../steps';
import { DATE_OF_BIRTH, FULL_NAME } from '../../urls';

import UserRolePostController from './userRolePostController';

const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('UserRolePostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ errorType: 'required', propertyName: 'applyingForSelf' }];
    const mockForm = {
      fields: {
        applyingForSelf: {
          type: 'radios',
          values: [
            { label: l => l.no, value: YesOrNo.YES },
            { label: l => l.yes, value: YesOrNo.NO },
          ],
          validator: isFieldFilledIn,
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    const controller = new UserRolePostController(mockForm.fields);

    const req = mockRequest({});
    const res = mockResponse();
    await controller.post(req, res);

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(req.path);
    expect(req.session.errors).toEqual(errors);
  });

  test('Should redirect to the date of birth page when yes radio button selected', async () => {
    const mockForm = {
      fields: {
        applyingForSelf: {
          type: 'radios',
          values: [
            { label: l => l.no, value: YesOrNo.YES },
            { label: l => l.yes, value: YesOrNo.NO },
          ],
          validator: isFieldFilledIn,
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    const controller = new UserRolePostController(mockForm.fields);

    const body = { applyingForSelf: 'Yes' };

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(DATE_OF_BIRTH);
  });

  test('Should redirect to full name page when no radio button selected', async () => {
    const mockForm = {
      fields: {
        applyingForSelf: {
          type: 'radios',
          values: [
            { label: l => l.no, value: YesOrNo.YES },
            { label: l => l.yes, value: YesOrNo.NO },
          ],
          validator: isFieldFilledIn,
        },
      },
      submit: {
        text: l => l.continue,
      },
    };
    const controller = new UserRolePostController(mockForm.fields);

    const body = { applyingForSelf: 'No' };

    const req = mockRequest({ body });
    const res = mockResponse();
    await controller.post(req, res);

    expect(getNextStepUrlMock).not.toHaveBeenCalled();
    expect(res.redirect).toBeCalledWith(FULL_NAME);
  });
});
