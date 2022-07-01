/* Importing the autobind-decorator, the Response object from the express module, the getNextStepUrl
function from the steps module, the CONTACT_DETAILS constant from the urls module, the Case and
CaseWithId interfaces from the case module, the CITIZEN_CREATE and CITIZEN_UPDATE constants from the
definition module, the Form, FormFields and FormFieldsFn interfaces from the Form module, the
ValidationError interface from the validation module, and the AppRequest interface from the
AppRequest module. */
/**
 */
import autobind from 'autobind-decorator';
import { Response } from 'express';

import { getNextStepUrl } from '../../steps';
import { CONTACT_DETAILS, STATEMENT_OF_TRUTH } from '../../steps/urls';
import { Case, CaseWithId } from '../case/case';
import { CITIZEN_CREATE, CITIZEN_UPDATE } from '../case/definition';
import { Form, FormFields, FormFieldsFn } from '../form/Form';
import { ValidationError } from '../form/validation';

import { AppRequest } from './AppRequest';

/* An enum that is used to check if the URL is one of the URLs that should not be saved to the
database. */
enum noHitToSaveAndContinue {
  DATE_OF_BIRTH = '/date-of-birth',
  CONTACT_PREFERENCES = '/contact-preferences',
  EMAIL_ADDRESS = '/email-address',
}

@autobind
/* It's a generic class that extends the AnyObject interface */
export class PostController<T extends AnyObject> {
  constructor(protected readonly fields: FormFields | FormFieldsFn) {}

  /**
   * Parse the form body and decide whether this is a save and sign out, save and continue or session time out
   *
   */
  /**
   * It takes the form data from the request body, and saves it to the session
   * @param req - AppRequest<T>
   * @param {Response} res - Response - the response object
   */
  public async post(req: AppRequest<T>, res: Response): Promise<void> {
    const fields = typeof this.fields === 'function' ? this.fields(req.session.userCase) : this.fields;
    const form = new Form(fields);

    const { saveAndSignOut, saveBeforeSessionTimeout, _csrf, ...formData } = form.getParsedBody(req.body);
    await this.saveAndContinue(req, res, form, formData);
  }

  /**
   * It saves the form data to the session, and if there are no errors, it creates or updates the case
   * @param req - AppRequest<T> - this is the request object that is passed to the controller. It
   * contains the session, the user, the originalUrl, the body, the query, etc.
   * @param {Response} res - Response - this is the response object that will be returned to the user
   * @param {Form} form - Form - the form object that contains the form definition
   * @param formData - The data that the user has entered into the form
   */
  private async saveAndContinue(req: AppRequest<T>, res: Response, form: Form, formData: Partial<Case>): Promise<void> {
    Object.assign(req.session.userCase, formData);
    req.session.errors = form.getErrors(formData);
    this.filterErrorsForSaveAsDraft(req);
    if (req.session?.user && req.session.errors.length === 0) {
      if (!(Object.values(noHitToSaveAndContinue) as string[]).includes(req.originalUrl)) {
        const eventName = this.getEventName(req);
        if (eventName === CITIZEN_CREATE) {
          req.session.userCase = await this.createCase(req);
        } else if (eventName === CITIZEN_UPDATE) {
          req.session.userCase = await this.updateCase(req);
        }
      }
    }
    this.redirect(req, res);
  }

  /**
   * It creates a new case, and if it fails, it adds an error to the session
   * @param req - AppRequest<T>
   * @returns the userCase object.
   */
  async createCase(req: AppRequest<T>): Promise<CaseWithId | PromiseLike<CaseWithId>> {
    try {
      req.session.userCase = await req.locals.api.createCaseNew(req, req.session.user);
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors = req.session.errors || [];
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }
    return req.session.userCase;
  }

  /**
   * It filters out the errors that are not required or not selected
   * @param req - AppRequest<T>
   */

  protected filterErrorsForSaveAsDraft(req: AppRequest<T>): void {
    if (req.body.saveAsDraft) {
      // skip empty field errors in case of save as draft
      req.session.errors = req.session.errors!.filter(
        item => item.errorType !== ValidationError.REQUIRED && item.errorType !== ValidationError.NOT_SELECTED // &&
        //item.errorType !== ValidationError.NOT_UPLOADED
      );
    }
  }

  /**
   * It takes a request, a form data object, and an event name, and then it tries to trigger an event on
   * the case, and if it fails, it adds an error to the session
   * @param req - AppRequest<T> - this is the request object that is passed to the controller. It
   * contains the session, the locals and the body.
   * @param formData - The data that is being submitted from the form
   * @param {string} eventName - The name of the event to trigger.
   * @returns The userCase is being returned.
   */
  protected async save(req: AppRequest<T>, formData: Partial<Case>, eventName: string): Promise<CaseWithId> {
    try {
      console.log('Update Existing Case');
      req.session.userCase = await req.locals.api.triggerEvent(req.session.userCase.id, formData, eventName);
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors = req.session.errors || [];
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }
    return req.session.userCase;
  }

  /**
   * It updates the case in the database and returns the updated case
   * @param req - AppRequest<T>
   * @returns The userCase is being returned.
   */
  protected async updateCase(req: AppRequest<T>): Promise<CaseWithId> {
    try {
      console.log('Update Existing Case');
      req.session.userCase = await req.locals.api.updateCase(req, req.session.user);
    } catch (err) {
      req.locals.logger.error('Error saving', err);
      req.session.errors = req.session.errors || [];
      req.session.errors.push({ errorType: 'errorSaving', propertyName: '*' });
    }
    return req.session.userCase;
  }

  /**
   * It saves the session, then redirects to the next step
   * @param req - AppRequest<T> - this is the request object that is passed to the controller. It is an
   * extension of the Express Request object.
   * @param {Response} res - Response - this is the response object that is passed to the controller
   * method.
   * @param {string} [nextUrl] - The URL to redirect to. If not provided, the next step in the journey
   * will be used.
   */
  public redirect(req: AppRequest<T>, res: Response, nextUrl?: string): void {
    if (!nextUrl) {
      nextUrl = req.session.errors?.length ? req.url : getNextStepUrl(req, req.session.userCase);
    }

    req.session.save(err => {
      if (err) {
        throw err;
      }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      res.redirect(nextUrl!);
    });
  }

  // method to check if there is a returnUrl in session and
  // it is one of the allowed redirects from current page
  public checkReturnUrlAndRedirect(req: AppRequest<T>, res: Response, allowedReturnUrls: string[]): void {
    const returnUrl = req.session.returnUrl;
    if (returnUrl && allowedReturnUrls.includes(returnUrl)) {
      req.session.returnUrl = undefined;
      this.redirect(req, res, returnUrl);
    } else {
      this.redirect(req, res);
    }
  }

  //eslint-disable-next-line @typescript-eslint/no-unused-vars

  /**
   * If the URL is the contact details page and the form is blank, return the event name for creating a
   * new citizen. Otherwise, return the event name for updating an existing citizen
   * @param {AppRequest} req - AppRequest - this is the request object that is passed to the controller.
   * @returns The event name
   */
  public getEventName(req: AppRequest): string {
    let eventName;
    if (req.originalUrl === CONTACT_DETAILS && this.isBlank(req)) {
      eventName = CITIZEN_CREATE;
    } else if (req.originalUrl === CONTACT_DETAILS || req.originalUrl === STATEMENT_OF_TRUTH) {
      eventName = CITIZEN_UPDATE;
    }
    return eventName;
  }
  /**
   * If the case id is null, undefined, or an empty string, return true
   * @param req - AppRequest<Partial<Case>>
   * @returns The return value is a boolean.
   */

  private isBlank(req: AppRequest<Partial<Case>>) {
    console.log('inside isBlank() case id is => ' + req.session.userCase.id);
    if (req.session.userCase.id === null || req.session.userCase.id === undefined || req.session.userCase.id === '') {
      return true;
    }
  }
}

export type AnyObject = Record<string, unknown>;
