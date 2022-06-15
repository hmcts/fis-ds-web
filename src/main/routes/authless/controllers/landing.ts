import { Request, Response } from 'express';

import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';
import { SIGN_IN_URL } from '../../../steps/urls';

/*** query params for @edgeCaseType */
const edgeCaseTypeQueryValidations = (req: Request) => {
  if (req.query.hasOwnProperty('edgeCaseType')) {
    /** validation need to be done */
    req.session['edgeCaseType'] = req.query['edgeCaseType'];
  }
};

export const LandingController = (req: Request, res: Response): void => {
  const loginURL = SIGN_IN_URL;
  try {
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

    if (req.query.hasOwnProperty('lang')) {
      if (req.query['lang'] === 'en') {
        SystemContent = en;
        ToggleLanguage = 'cy';
      } else if (req.query['lang'] === 'cy') {
        SystemContent = cy;
        ToggleLanguage = 'en';
      } else {
        console.log({ msg: 'Invalid language - Setting default Langauge to English' });
        SystemContent = en;
        ToggleLanguage = 'cy';
      }
    }

    edgeCaseTypeQueryValidations(req);
    res.render('landing.njk', { loginURL, content: SystemContent, ToggleLanguage });
  } catch (exception) {
    console.log({ msg: 'Exception occured while reading the file' + exception });
    res.render('error');
  }
};
