import { capitalize } from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { Fee } from '../../app/case/definition';
import { Eligibility } from '../../app/controller/AppRequest';
import { PageContent, TranslationFn } from '../../app/controller/GetController';
import { ResourceReader } from '../../modules/resourcereader/ResourceReader';

const resourceLoader = new ResourceReader();
resourceLoader.Loader('common-contents');
const Translations = resourceLoader.getFileContents().translations;

const en = {
  ...Translations.en,
};

const cy: typeof en = {
  ...en, // @TODO delete me to get a list of missing translations
  ...Translations.cy,
};

/**
 * It takes a bunch of stuff and returns a bunch of stuff
 * @param  - language - the language of the page
 * @returns An object with the following properties:
 */
export const generatePageContent = ({
  language,
  pageContent,
  userCase,
  uploadedDocuments,
  AddDocuments,
  userEmail,
  addresses = [],
  fee,
}: {
  language: Language;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  uploadedDocuments?: any;
  AddDocuments?: any;
  userEmail?: string;
  addresses?: [];
  fee?: Fee;
}): PageContent => {
  const commonTranslations: typeof en = language === 'en' ? en : cy;
  const serviceName = getServiceName(commonTranslations);
  const contactEmail = 'todo@test.com';

  const content: CommonContent = {
    ...commonTranslations,
    serviceName,
    language,
    userCase,
    uploadedDocuments,
    AddDocuments,
    userEmail,
    contactEmail,
    addresses,
    // eligibility,
    fee,
  };

  if (pageContent) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

const getServiceName = (translations: typeof en): string => {
  return capitalize(translations.applyFordss);
};

export type CommonContent = typeof en & {
  language: Language;
  serviceName: string;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  uploadedDocuments?: any;
  AddDocuments?: any;
  userEmail?: string;
  contactEmail?: string;
  referenceNumber?: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  addresses?: any[];
  eligibility?: Eligibility;
  fee?: Fee;
};

export type Language = 'en' | 'cy';
