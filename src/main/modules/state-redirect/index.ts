import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Application, NextFunction, Response } from 'express';

// import { ApplyingWith, State } from '../../app/case/definition';
import { AppRequest } from '../../app/controller/AppRequest';
import {
  // APPLICANT_2,
  //SELECT_JURISDICTION,
  //SERVICE_TYPE,
  //DATE_OF_BIRTH,
  // APPLICATION_SUBMITTED,
  PAYMENT_CALLBACK_URL,
  PAY_AND_SUBMIT,
  PAY_YOUR_FEE,
  PageLink,
  // TASK_LIST_URL,
  CITIZEN_HOME_URL,
} from '../../steps/urls';

/**
 * Adds the state redirect middleware to redirect when application is in certain states
 */
export class StateRedirectMiddleware {
  public enableFor(app: Application): void {
    const { errorHandler } = app.locals;
    dayjs.extend(customParseFormat);

    app.use(
      errorHandler(async (req: AppRequest, res: Response, next: NextFunction) => {
        // if (req.session.userCase?.applyingWith === ApplyingWith.ALONE && req.path.startsWith(APPLICANT_2)) {
        //   return res.redirect(TASK_LIST_URL);
        // }

        if (
          // [State.Submitted, State.AwaitingDocuments, State.AwaitingHWFDecision].includes(req.session.userCase?.state) &&
          req.path !== CITIZEN_HOME_URL
        ) {
          return res.redirect(CITIZEN_HOME_URL);
        }

        if (
          // req.session.userCase?.state !== State.AwaitingPayment ||
          [PAY_YOUR_FEE, PAY_AND_SUBMIT, PAYMENT_CALLBACK_URL].includes(req.path as PageLink)
        ) {
          return next();
        }

        return next();
      })
    );
  }
}