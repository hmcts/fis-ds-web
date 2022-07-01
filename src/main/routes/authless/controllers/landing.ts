import config from 'config';
import { Request, Response } from 'express';

import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { SIGN_IN_URL, USER_ROLE } from '../../../steps/urls';

/*** query params for @edgeCaseType */
/**
 * This function is used to validate the query params passed in the URL
 * @param {Request} req - Request - the request object
 * @param {Response} res - Response - the response object
 * @param loginURL - The URL to the login page.
 * @param SystemContent - This is the content that is used to render the page.
 * @param ToggleLanguage - This is a boolean value that determines whether the language toggle is
 * displayed on the page.
 */
const edgeCaseTypeQueryValidations = (req: Request, res: Response, loginURL, SystemContent, ToggleLanguage) => {
  /* This is checking if the query param edgecaseType is present in the URL. If it is, it checks if the
value of the query param is present in the config file. If it is, it sets the session variable to
the value of the query param.
If it isn't, it renders the error page. */
  if (req.query.hasOwnProperty('edgecaseType')) {
    /** validation need to be done */
    const ValidqueryParams: [] = config.get('queryParamsforApp.query');
    const ValidQueryinConfig = Object.keys(ValidqueryParams).some(item => req.query['edgecaseType'] === item);
    if (ValidQueryinConfig) {
      const queryElement: any = req.query['edgecaseType'];
      const findRespectiveValueToQuery =
        Object.values(ValidqueryParams)[Object.keys(ValidqueryParams).indexOf(queryElement)];
      /* This is setting the session variable to the value of the query param. */
      req.session['edgecaseType'] = findRespectiveValueToQuery;
      /* This is rendering the landing page. */
      res.render('landing.njk', { loginURL, content: SystemContent, ToggleLanguage });
    } else {
      /* This is rendering the error page. */
      res.render('error.njk');
    }
  } else {
    res.render('landing.njk', { loginURL, content: SystemContent, ToggleLanguage });
  }
};

/**
 * It checks if the user is logged in, if they are, it redirects them to the appropriate page, if they
 * aren't, it loads the landing page
 * @param {Request} req - Request - The request object
 * @param {Response} res - Response - The response object that will be sent to the client.
 */
export const LandingController = (req: Request, res: Response): void => {
  const loginURL = SIGN_IN_URL;
  /* This is checking if the user is logged in. If they are, it redirects them to the USER_ROLE page.
If they aren't, it loads the landing page. */
  if (req.session.hasOwnProperty('user')) {
    /* Redirecting the user to the USER_ROLE page. */
    res.redirect(USER_ROLE);
  } else {
    try {
      /* This is loading the resource file for the landing page. */
      const resourceLoader = new ResourceReader();
      resourceLoader.Loader('landing');
      const Translations = resourceLoader.getFileContents().translations;

      /**
       * @SystemLanguage
       */
      const en = Translations.en;
      const cy = Translations.cy;

      let SystemContent = en;
      let ToggleLanguage = 'cy';

      /* This is checking if the query param lang is present in the URL. If it is, it checks if the
     value of the query param is en or cy. If it is en, it sets the SystemContent to en and
     ToggleLanguage to cy. If it is cy, it sets the SystemContent to cy and ToggleLanguage to en. If
     it is neither, it sets the SystemContent to en and ToggleLanguage to cy. */
      if (req.query.hasOwnProperty('lang')) {
        if (req.query['lang'] === 'en') {
          SystemContent = en;
          ToggleLanguage = 'cy';
        } else if (req.query['lang'] === 'cy') {
          SystemContent = cy;
          ToggleLanguage = 'en';
        } else {
          SystemContent = en;
          ToggleLanguage = 'cy';
        }
      }
      /* This is a function that is used to validate the query params passed in the URL. */
      edgeCaseTypeQueryValidations(req, res, loginURL, SystemContent, ToggleLanguage);
    } catch (exception) {
      res.render('error');
    }
  }
};
