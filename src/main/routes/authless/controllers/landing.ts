import FileSystem from 'fs/promises';
import pathGuide from 'path';

import { Request, Response } from 'express';
import ymlTranspiler from 'js-yaml';

import { SIGN_IN_URL } from '../../../steps/urls';

export const LandingController = async (req: Request, res: Response): Promise<void> => {
  const loginURL = SIGN_IN_URL;
  try {
    const ymlContentLoader = ymlTranspiler.load(
      await FileSystem.readFile(pathGuide.resolve(__dirname, '../../../resources/landing/translation.yml'), {
        encoding: 'utf-8',
      })
    );

    /**
     * @SystemLanguage
     */
    const en = ymlContentLoader.en;
    const cy = ymlContentLoader.cy;

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

    res.render('landing.njk', { loginURL, content: SystemContent, ToggleLanguage });
  } catch (exception) {
    console.log({ msg: 'Exception occured while reading the file' + exception });
    res.render('error');
  }
};
