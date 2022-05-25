import { Response } from 'express';

// import { Case } from '../../app/case/case';
// import { State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
// import { Form, FormFields } from '../../app/form/Form';
// import { form as applicant1FirstQuestionForm } from '../applicant1/applying-with/content';
import {
  USER_ROLE,
  //CITIZEN_HOME_URL,
} from '../urls';

export class HomeGetController {
  public get(req: AppRequest, res: Response): void {
    // if (req.session.userCase.divorceOrDissolution !== res.locals.serviceType) {
    //   throw new Error('Invalid case type');
    // }
    // const firstQuestionForm = getApplicantFirstQuestionForm();
    const isFirstQuestionComplete = true;

    res.redirect(applicant1RedirectPageSwitch(isFirstQuestionComplete));
  }
}

const applicant1RedirectPageSwitch = (isFirstQuestionComplete: boolean) => {
  return isFirstQuestionComplete ? USER_ROLE : USER_ROLE;
};

// const getApplicantFirstQuestionForm = () => {
//   return new Form(<FormFields>applicant1FirstQuestionForm.fields);
// };
