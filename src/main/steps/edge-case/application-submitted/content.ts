import { TranslationFn } from '../../../app/controller/GetController';
import { ResourceReader } from '../../../modules/resourcereader/ResourceReader';

const APPLICATION_SUBMITTED_TRANSLATION_FILE = 'application-submitted';

export const generateContent: TranslationFn = content => {
  const resourceLoader = new ResourceReader();
  resourceLoader.Loader(APPLICATION_SUBMITTED_TRANSLATION_FILE);
  const Translations = resourceLoader.getFileContents().translations;

  const en = () => {
    console.log('userCase:' + content.userCase?.id);
    const caseId = content.userCase?.id?.toString().replace(/.{4}/g, '$&-').substring(0, 19);
    return {
      ...Translations.en,
      line1: `An email has been sent to ${content.userCase?.applicantEmailAddress} that explains what will happen next.`,
      referenceNumber: `Your reference number is:<br><strong>${caseId}</strong>`,
    };
  };
  const cy = () => {
    const caseId = content.userCase?.id?.toString().replace(/.{4}/g, '$&-').substring(0, 19);
    return {
      ...Translations.cy,
      line1: `An email has been sent to ${content.userCase?.applicantEmailAddress} that explains what will happen next. (in welsh)`,
      referenceNumber: `Your reference number is:<br><strong>${caseId}</strong> (in welsh)`,
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
