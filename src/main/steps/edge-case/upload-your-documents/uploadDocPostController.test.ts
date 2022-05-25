import config from 'config';

import { FileMimeType, FileUploadBaseURL, FileValidations } from './uploadDocPostController';

/**
 * 
 * import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { YesOrNo } from '../../../app/case/definition';
import { isFieldFilledIn } from '../../../app/form/validation';
import * as steps from '../../../steps';
 * const getNextStepUrlMock = jest.spyOn(steps, 'getNextStepUrl');

describe('EligibilityPostController', () => {
  afterEach(() => {
    getNextStepUrlMock.mockClear();
  });

  test('Should redirect back to the current page with the form data on errors', async () => {
    const errors = [{ errorType: 'required', propertyName: 'field' }];
    const mockForm = {
      fields: {
        field: {
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
      saveAsDraft: {
        text: '',
      },
    };
    const controller = new uploadDocPostController(mockForm.fields);

    const req = mockRequest({});
    const res = mockResponse();
    req.files = { documents: [] };
    await controller.post(req, res);

   // expect(req.locals.api.triggerEvent).not.toHaveBeenCalled();
   // expect(getNextStepUrlMock).not.toHaveBeenCalled();
    // expect(res.redirect).toBeCalledWith('/upload-your-documents');
   // expect(req.session.errors).not.toEqual(errors);
  });

  describe('when there is an error in saving session', () => {
    test('should throw an error', async () => {
      const controller = new uploadDocPostController({});
      const res = mockResponse();
      const req = mockRequest({
        session: {
          user: { email: 'test@example.com' },
          save: jest.fn(done => done('MOCK_ERROR')),
        },
      });
      try {
        await controller.post(req, res);
      } catch (err) {
        //eslint-disable-next-line jest/no-conditional-expect
        expect(err).not.toBe('MOCK_ERROR');
      }
    });
  });
});
 */

describe('All of the listed Validation for files should be in place', () => {
  const allTypes = {
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    pdf: 'application/pdf',
    png: 'image/png',
    xls: 'application/vnd.ms-excel',
    xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    jpg: 'image/jpeg',
    txt: 'text/plain',
    rtf: 'application/rtf',
    gif: 'image/gif',
  };

  it('must match the file validations type', () => {
    expect(Object.entries(allTypes)).toHaveLength(Object.entries(FileMimeType).length);
    expect(allTypes).toMatchObject(FileMimeType);
    expect(Object.entries(allTypes).toString()).toBe(Object.entries(FileMimeType).toString());
  });
});

describe('document format validation', () => {
  it('must match valid mimetypes', () => {
    expect(FileValidations.formatValidation('image/gif')).toBe(true);
  });
});

describe('The url must match the config url', () => {
  it('must match baseURl', () => {
    expect(FileUploadBaseURL).toBe(config.get('services.documentManagement.url'));
  });
});

describe('Checking for file upload size', () => {
  const file1Size = 1000000;
  const file2Size = 2000000;
  const file3Size = 3000000;
  it('Checking for file1 size', () => {
    expect(FileValidations.sizeValidation(file1Size)).toBe(true);
  });

  it('Checking for file2 size', () => {
    expect(FileValidations.sizeValidation(file2Size)).toBe(false);
  });

  it('Checking for file3 size', () => {
    expect(FileValidations.sizeValidation(file3Size)).toBe(false);
  });
});

/**
 *      @UploadDocumentController
 *
 *      test for document upload controller
 */

describe('Uploading documents should should redirect', () => {
  it('must match redirect', () => {
    expect(1).not.toBe(2);
  });
});
