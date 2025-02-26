import { mockRequest } from '../../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../../test/unit/utils/mockResponse';
import { CreateCaseResponse, UpdateCaseResponse } from '../../../app/case/api-utility';
import { YesOrNo } from '../../../app/case/definition';
import { FormContent } from '../../../app/form/Form';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';
import ContactDetailsPostController from './postController';

describe('ContactDetailsPostController Post Controller', () => {
  const commonContent = {
    language: 'en',
    userCase: {
      id: '7483640e-0817-4ddc-b709-6723f7925474',
      firstName: 'Bob',
      lastName: 'Silly',
      contactDetails: {
        donKnowEmailAddress: YesOrNo.NO,
        emailAddress: '',
        telephoneNumber: '',
        donKnowTelephoneNumber: YesOrNo.NO,
      },
    },
    additionalData: {
      req: {},
    },
  } as unknown as CommonContent;

  test('Should navigate to the next page when there are no errors when continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should update case when save and continue button is clicked', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        lang: language,
        userCase: {
          ...commonContent.userCase,
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
  });

  test('Should clean email address and telephone number when dont know is yes', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        saveAndContinue: true,
        donKnowEmailAddress: ['', 'Yes'],
        donKnowTelephoneNumber: ['', 'Yes'],
        emailAddress: 'test@test.com',
        telephoneNumber: '012345678',
      },
      session: {
        lang: language,
        userCase: {
          firstName: 'Bob',
          lastName: 'Silly',
          contactDetails: {
            donKnowEmailAddress: YesOrNo.NO,
            emailAddress: 'test@test.com',
            telephoneNumber: '012345678',
            donKnowTelephoneNumber: YesOrNo.NO,
          },
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual({
      applicantPhoneNumber: undefined,
      firstName: 'Bob',
      lastName: 'Silly',
      contactDetails: {
        donKnowEmailAddress: 'No',
        donKnowTelephoneNumber: 'No',
        emailAddress: 'test@test.com',
        telephoneNumber: '012345678',
      },
    });
  });

  test('save and continue undefind', async () => {
    const mockFormContent = {
      fields: {},
    } as unknown as FormContent;
    const controller = new ContactDetailsPostController(mockFormContent.fields);
    const language = 'en';
    const req = mockRequest({
      body: {
        saveAndContinue: undefined,
        donKnowEmailAddress: ['', 'Yes'],
        donKnowTelephoneNumber: ['', 'Yes'],
        emailAddress: 'test@test.com',
        telephoneNumber: '012345678',
      },
      session: {
        lang: language,
        userCase: {
          firstName: 'Bob',
          lastName: 'Silly',
          contactDetails: {
            donKnowEmailAddress: YesOrNo.NO,
            emailAddress: 'test@test.com',
            telephoneNumber: '012345678',
            donKnowTelephoneNumber: YesOrNo.NO,
          },
        },
      },
    });
    const res = mockResponse();
    generateContent(commonContent);
    await controller.post(req, res);

    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.userCase).toStrictEqual({
      firstName: 'Bob',
      lastName: 'Silly',
      contactDetails: {
        donKnowEmailAddress: 'No',
        donKnowTelephoneNumber: 'No',
        emailAddress: 'test@test.com',
        telephoneNumber: '012345678',
      },
    });
  });

  test('should create and update case', async () => {
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        userCase: {
          edgeCaseTypeOfApplication: 'FMPO',
          applicantFirstName: 'test',
          applicantLastName: 'last',
        },
      },
    });
    const res = mockResponse();
    req.locals.api.createCase = jest.fn().mockResolvedValue({
      ...req.session.userCase,
    } as unknown as CreateCaseResponse);
    req.locals.api.updateCase = jest.fn().mockResolvedValue({
      ...req.session.userCase,
    } as unknown as UpdateCaseResponse);

    const controller = new ContactDetailsPostController({});
    await controller.post(req, res);

    expect(req.session.applicationSettings.isCaseCreated).toBe(true);
    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([]);
  });

  test('should update case', async () => {
    const req = mockRequest({
      body: {
        saveAndContinue: true,
      },
      session: {
        applicationSettings: {
          isCaseCreated: true,
        },
        userCase: {
          edgeCaseTypeOfApplication: 'FMPO',
          applicantFirstName: 'test',
          applicantLastName: 'last',
          id: '123',
        },
      },
    });
    const res = mockResponse();
    req.locals.api.updateCase = jest.fn().mockResolvedValue({
      ...req.session.userCase,
    } as unknown as UpdateCaseResponse);

    const controller = new ContactDetailsPostController({});
    await controller.post(req, res);

    expect(req.session.applicationSettings.isCaseCreated).toBe(true);
    expect(res.redirect).toHaveBeenCalled();
    expect(req.session.errors).toStrictEqual([]);
  });
});
