import { TranslationFn } from '../../app/controller/GetController';
import { ResourceReader } from '../../modules/resourcereader/ResourceReader';

const resourceLoader = new ResourceReader();
resourceLoader.Loader('timeout');
const Translations = resourceLoader.getFileContents().translations;

const en = {
  ...Translations.en,
};

const cy: typeof en = {
  ...Translations.cy,
};

const languages = {
  en,
  cy,
};

export const generateContent: TranslationFn = content => {
  return languages[content.language];
};
