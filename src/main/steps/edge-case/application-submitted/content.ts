import { TranslationFn } from '../../../app/controller/GetController';
import { loadResources } from '../util';

const APPLICATION_SUBMITTED_TRANSLATION_FILE = 'application-submitted';

export const generateContent: TranslationFn = content => {
  const resourceLoader = loadResources(APPLICATION_SUBMITTED_TRANSLATION_FILE);
  const translations = resourceLoader.getFileContents().translations[content.language];

  return {
    ...translations,
    caseId: content.userCase?.id?.toString().replace(/.{4}/g, '$& - ').substring(0, 25),
  };
};
