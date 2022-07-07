import autobind from 'autobind-decorator';
import axios, { AxiosInstance } from 'axios';
import config from 'config';
import { Response } from 'express';
import Negotiator from 'negotiator';

import { LanguageToggle } from '../../modules/i18n';
import { CommonContent, Language, generatePageContent } from '../../steps/common/common.content';
import { FIS_COS_API_BASE_URL } from '../../steps/common/constants/apiConstants';
import { TOGGLE_SWITCH } from '../../steps/common/constants/commonConstants';
import * as Urls from '../../steps/urls';
import { ADDITIONAL_DOCUMENTS_UPLOAD, COOKIES, UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';

import { AppRequest } from './AppRequest';

export type PageContent = Record<string, unknown>;
export type TranslationFn = (content: CommonContent) => PageContent;

export type AsyncTranslationFn = any;
@autobind
/* It's a class that is used to render the page content and also to delete documents from the session */
export class GetController {
  constructor(protected readonly view: string, protected readonly content: TranslationFn) {}

  /**
   * This function is used to render the page content and also to delete documents from the session
   * @param {AppRequest} req - AppRequest, res: Response
   * @param {Response} res - Response - the response object
   * @returns The return is a promise that resolves to a void.
   */
  public async get(req: AppRequest, res: Response): Promise<void> {
    console.log('usercase session --->', req.session.userCase);

    this.CookiePrefrencesChanger(req, res);

    if (res.locals.isError || res.headersSent) {
      return;
    }

    const language = this.getPreferredLanguage(req) as Language;
    const addresses = req.session?.addresses;

    const sessionErrors = req.session?.errors || [];
    const FileErrors = req.session.fileErrors || [];
    if (req.session?.errors || req.session.fileErrors) {
      req.session.errors = undefined;
      req.session.fileErrors = [];
    }

    /* Generating the page content for the page. */
    const content = generatePageContent({
      language,
      pageContent: this.content,
      userCase: req.session.userCase,
      userEmail: req.session?.user?.email,
      uploadedDocuments: req.session['caseDocuments'],
      AddDocuments: req.session['AddtionalCaseDocuments'],
      addresses,
    });

    this.documentDeleteManager(req, res);
    const RedirectConditions = {
      /*************************************** query @query  ***************************/
      query: req.query.hasOwnProperty('query'),
      /*************************************** query @documentId  ***************************/
      documentId: req.query.hasOwnProperty('docId'),
      /*************************************** query @documentType  ***************************/
      documentType: req.query.hasOwnProperty('documentType'),
      /*************************************** query @analytics for monitoring and performance ***************************/
      cookieAnalytics: req.query.hasOwnProperty('analytics'),
      /*************************************** query  @apm for monitoring and performance  ***************************/
      cookieAPM: req.query.hasOwnProperty('apm'),
    };

    const cookiesForPrefrences = req.cookies.hasOwnProperty('ds-web-cookie-preferences')
      ? JSON.parse(req.cookies['ds-web-cookie-preferences'])
      : {
          analytics: 'off',
          apm: 'off',
        };

    /* The below code is creating a new object called pageRenderableContents. It is taking the content
object and adding the uploadedDocuments, addtionalDocuments, cookiePrefrences, sessionErrors,
cookieMessage, FileErrors, htmlLang, and isDraft properties to it. */
    let pageRenderableContents = {
      ...content,
      uploadedDocuments: req.session['caseDocuments'],
      addtionalDocuments: req.session['AddtionalCaseDocuments'],
      cookiePrefrences: cookiesForPrefrences,
      sessionErrors,
      cookieMessage: false,
      FileErrors,
      htmlLang: language,
      isDraft: req.session?.userCase?.state ? req.session.userCase.state === '' : true,
    };

    const cookieWithSaveQuery = COOKIES + '?togglesaveCookie=true';
    const checkforCookieUrlAndQuery = req.url === cookieWithSaveQuery;
    /* Checking if the cookieMessage is true and if it is, it will add it to the pageRenderableContents
  object. */
    if (checkforCookieUrlAndQuery) {
      pageRenderableContents = { ...pageRenderableContents, cookieMessage: true };
    }

    const checkConditions = Object.values(RedirectConditions).includes(true);
    if (!checkConditions) {
      res.render(this.view, pageRenderableContents);
    }
  }

  /**
   * If the user has selected a language, use that. If not, use the language saved in the session. If
   * not, use the browser's default language
   * @param {AppRequest} req - AppRequest - This is the request object that is passed to the middleware.
   * @returns The language that the user has selected.
   */
  private getPreferredLanguage(req: AppRequest) {
    // User selected language
    const requestedLanguage = req.query['lng'] as string;
    if (LanguageToggle.supportedLanguages.includes(requestedLanguage)) {
      return requestedLanguage;
    }
    // Saved session language
    if (req.session?.lang) {
      return req.session.lang;
    }
    // Browsers default language
    const negotiator = new Negotiator(req);
    return negotiator.language(LanguageToggle.supportedLanguages) || 'en';
  }

  /**
   * If the returnUrl query parameter is set, and it's a valid URL, then set the returnUrl session
   * variable to the value of the returnUrl query parameter
   * @param {AppRequest} req - AppRequest - this is the request object that is passed to the controller.
   */
  public parseAndSetReturnUrl(req: AppRequest): void {
    if (req.query.returnUrl) {
      if (Object.values(Urls).find(item => item === `${req.query.returnUrl}`)) {
        req.session.returnUrl = `${req.query.returnUrl}`;
      }
    }
  }

  /**
   * It saves the session and then redirects the user to the same page
   * @param {AppRequest} req - AppRequest - This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - The response object from the Express framework.
   * @param {Function} [callback] - A function to call after the session is saved.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  public saveSessionAndRedirect(req: AppRequest, res: Response, callback?: Function): void {
    req.session.save(err => {
      if (err) {
        throw err;
      }
      if (callback) {
        callback();
      } else {
        res.redirect(req.url);
      }
    });
  }
  /**
   *
   * @param {AppRequest} req - AppRequest - This is the request object that is passed to the route
   * handler.
   * @param {Response} res - Response - The response object from the Express framework.
   */

  public CookiePrefrencesChanger = (req: AppRequest, res: Response): void => {
    //?analytics=off&apm=off
    if (req.query.hasOwnProperty('analytics') && req.query.hasOwnProperty('apm')) {
      let cookieExpiryDuration = Number(config.get('cookies.expiryTime'));
      const TimeInADay = 24 * 60 * 60 * 1000;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      cookieExpiryDuration = cookieExpiryDuration * TimeInADay; //cookie time in milliseconds
      const CookiePreferences = {
        analytics: '',
        apm: '',
      };
      if (req.query.hasOwnProperty('analytics')) {
        switch (req.query['analytics']) {
          case TOGGLE_SWITCH.OFF:
            CookiePreferences['analytics'] = TOGGLE_SWITCH.OFF;
            break;

          case TOGGLE_SWITCH.ON:
            CookiePreferences['analytics'] = TOGGLE_SWITCH.ON;
            break;

          default:
            CookiePreferences['analytics'] = TOGGLE_SWITCH.OFF;
        }
      }
      if (req.query.hasOwnProperty('apm')) {
        switch (req.query['apm']) {
          case TOGGLE_SWITCH.OFF:
            CookiePreferences['apm'] = TOGGLE_SWITCH.OFF;
            break;

          case TOGGLE_SWITCH.ON:
            CookiePreferences['apm'] = TOGGLE_SWITCH.ON;
            break;

          default:
            CookiePreferences['apm'] = TOGGLE_SWITCH.OFF;
        }
      }
      const cookieValue = JSON.stringify(CookiePreferences);

      res.cookie('ds-web-cookie-preferences', cookieValue, {
        maxAge: cookieExpiryDuration,
        httpOnly: false,
        encode: String,
      });
      const RedirectURL = COOKIES + '?togglesaveCookie=true';
      res.redirect(RedirectURL);
    }
  };

  /**
   * It deletes a document from the session and from the database
   * @param {AppRequest} req - AppRequest - this is the request object that is passed to the controller.
   * @param {Response} res - Response - The response object
   */
  public async documentDeleteManager(req: AppRequest, res: Response): Promise<void> {
    if (
      req.query.hasOwnProperty('query') &&
      req.query.hasOwnProperty('docId') &&
      req.query.hasOwnProperty('documentType')
    ) {
      const checkForDeleteQuery = req.query['query'] === 'delete';
      if (checkForDeleteQuery) {
        const { documentType } = req.query;
        const { docId } = req.query;
        const Headers = {
          Authorization: `Bearer ${req.session.user['accessToken']}`,
        };
        const DOCUMENT_DELETEMANAGER: AxiosInstance = axios.create({
          baseURL: config.get(FIS_COS_API_BASE_URL),
          headers: { ...Headers },
        });
        /** Switching type of documents */
        /*eslint no-case-declarations: "error"*/
        switch (documentType) {
          case 'applicationform': {
            try {
              const baseURL = `/doc/dss-orhestration/${docId}/delete`;
              await DOCUMENT_DELETEMANAGER.delete(baseURL);
              const sessionObjectOfApplicationDocuments = req.session['caseDocuments'].filter(document => {
                const { documentId } = document;
                return documentId !== docId;
              });
              req.session['caseDocuments'] = sessionObjectOfApplicationDocuments;
              this.saveSessionAndRedirect(req, res, () => {
                res.redirect(UPLOAD_YOUR_DOCUMENTS);
              });
            } catch (error) {
              console.log(error);
            }

            break;
          }

          case 'additional': {
            try {
              const baseURL = `/doc/dss-orhestration/${docId}/delete`;
              await DOCUMENT_DELETEMANAGER.delete(baseURL);
              const sessionObjectOfAdditionalDocuments = req.session['AddtionalCaseDocuments'].filter(document => {
                const { documentId } = document;
                return documentId !== docId;
              });
              req.session['AddtionalCaseDocuments'] = sessionObjectOfAdditionalDocuments;
              this.saveSessionAndRedirect(req, res, () => {
                res.redirect(ADDITIONAL_DOCUMENTS_UPLOAD);
              });
            } catch (error) {
              console.log(error);
            }

            break;
          }
        }
      }
    }
  }
}
