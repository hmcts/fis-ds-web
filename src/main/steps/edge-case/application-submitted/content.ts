import { TranslationFn } from '../../../app/controller/GetController';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

const APPLICATION_SUBMITTED_TRANSLATION_FILE = 'application-submitted';

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader(APPLICATION_SUBMITTED_TRANSLATION_FILE);
  const Translations = resourceLoader.getFileContents().translations;

  const en = () => {
    const caseId = content.userCase?.id?.toString().replace(/.{4}/g, '$& - ').substring(0, 25);
    return {
      ...Translations.en,
      referenceNumber: `<font size="5">Your reference number is:</font><br><strong>${caseId}</strong>`,
    };
  };
  const cy = () => {
    const caseId = content.userCase?.id?.toString().replace(/.{4}/g, '$&-').substring(0, 19);
    return {
      ...Translations.cy,
      referenceNumber: `<font size="5">Your reference number is: (in welsh)</font><br><strong>${caseId}</strong>`,
    };
  };

  const languages = {
    en,
    cy,
  };

  const translations = languages[content.language]();
  return {
    ...translations,
  };
};
