import { capitalize } from 'lodash';

import { CaseWithId } from '../../app/case/case';
import { Fee } from '../../app/case/definition';
import { Eligibility } from '../../app/controller/AppRequest';
import { PageContent, TranslationFn } from '../../app/controller/GetController';

const en = {
  phase: 'Beta',
  applyForAdoption: 'Apply for a Service',
  applyForDissolution: 'Apply for a Service',
  feedback:
    'This is a new service – your <a class="govuk-link" aria-label="Feedback link, This will open a new tab. You’ll need to return to this tab and continue with your application within 60 mins so you don’t lose your progress." href="#" target="_blank">feedback</a> will help us to improve it.',
  languageToggle: '<a href="?lng=cy" class="govuk-link language">Cymraeg</a>',
  govUk: 'GOV.UK',
  back: 'Back',
  continue: 'Continue',
  next: 'Next',
  change: 'Change',
  upload: 'Upload',
  download: 'Download',
  delete: 'Delete',
  warning: 'Warning',
  required: 'You have not answered the question. You need to select an answer before continuing.',
  notAnswered: 'You have not answered the question.',
  errorSaving: 'Sorry, we’re having technical problems saving your application. Please try again in a few minutes.',
  errorFetchingFee:
    'Sorry, we’re having technical problems getting the fee information for your application. Please try again in a few minutes.',
  errorPaymentRedirect:
    'Sorry, we’re having technical problems redirecting you to payment. Please try again in a few minutes.',
  ogl: 'All content is available under the <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license">Open Government Licence v3.0</a>, except where otherwise stated',
  errorSummaryHeading: 'There is a problem',
  saveAsDraft: 'Save as draft',
  cancel: 'Cancel',
  signOut: 'Sign out',
  signIn: 'Sign in',
  accessibility: 'Accessibility statement',
  cookies: 'Cookies',
  privacyPolicy: 'Privacy policy',
  termsAndConditions: 'Terms and conditions',
  contactUs: 'Contact Us',
  marriage: 'marriage',
  divorce: 'divorce',
  civilPartnership: 'civil partnership',
  endingCivilPartnership: 'ending a civil partnership',
  husband: 'husband',
  wife: 'wife',
  partner: 'partner',
  civilPartner: 'civil partner',
  withHim: 'with him',
  withHer: 'with her',
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dateFormat: {
    day: 'Day',
    month: 'Month',
    year: 'Year',
  },
  yes: 'Yes',
  no: 'No',
  notSure: 'Not sure',
  english: 'English',
  welsh: 'Welsh',
  contactUsForHelp: 'Contact us for help',
  webChat: 'Web chat',
  webChatDetails:
    'All our web chat agents are busy helping other people. Please try again later or contact us using one of the ways below.',
  sendUsAMessage: 'Send us a message',
  sendUsAMessageDetails: 'We aim to get back to you within 5 days.',
  telephone: 'Telephone',
  telephoneNumber: '0300 303 0642',
  telephoneDetails: 'Monday to Friday, 8am to 8pm, Saturday 8am to 2pm.',
  cookiesHeading: 'Cookies on',
  cookiesLine1: 'We use some essential cookies to make this service work.',
  cookiesLine2:
    'We’d also like to use analytics cookies so we can understand how you use the service and make improvements.',
  acceptAnalyticsCookies: 'Accept analytics cookies',
  rejectAnalyticsCookies: 'Reject analytics cookies',
  viewCookies: 'View cookies',
  hideMessage: 'Hide this message',
  changeCookiesHeading: 'Change your cookie settings',
  allowAnalyticsCookies: 'Allow cookies that measure website use?',
  useAnalyticsCookies: 'Use cookies that measure my website use',
  doNotUseAnalyticsCookies: 'Do not use cookies that measure my website use',
  save: 'Save',
  cookiesSaved: 'Your cookie settings were saved',
  additionalCookies:
    'Government services may set additional cookies and, if so, will have their own cookie policy and banner.',
  goToHomepage: 'Go to homepage',
  apmCookiesHeadings: 'Allow cookies that measure website application performance monitoring?',
  useApmCookies: 'Use cookies that measure website application performance monitoring',
  doNotUseApmCookies: 'Do not use cookies that measure website application performance monitoring',
  cookiesAcceptedPart1: 'You’ve accepted additional cookies. You can',
  cookiesAcceptorRejectPart2: 'change your cookie settings',
  cookiesAcceptorRejectPart3: 'at any time.',
  cookiesRejectedPart1: 'You’ve rejected additional cookies. You can',
};

const cy: typeof en = {
  phase: 'Beta',
  applyForAdoption: 'Gwneud cais am wasanaeth',
  applyForDissolution: 'Gwneud cais am wasanaeth',
  feedback:
    'Mae hwn yn wasanaeth newydd - bydd <a class="govuk-link" aria-label="Dolen i roi adborth. Bydd yn agor mewn tab newydd. Bydd arnoch angen dychwelyd i’r tab hwn a pharhau â’ch cais o fewn 60 munud fel na fyddwch yn colli’r hyn rydych wedi’i wneud yn barod." href="#" target="_blank">adborth</a> eich adborth yn ein helpu ni i\'w wella',
  languageToggle: '<a href="?lng=en" class="govuk-link language">English</a>',
  govUk: 'GOV.UK',
  back: 'Yn ôl',
  continue: 'Parhau',
  change: 'Newid',
  upload: 'Uwchlwytho',
  download: 'Llwytho i lawr',
  delete: 'Dileu',
  warning: 'Rhybudd',
  required: 'Nid ydych wedi ateb y cwestiwn. Rhaid ichi ddewis ateb cyn symud ymlaen.',
  notAnswered: 'Nid ydych wedi ateb y cwestiwn.',
  errorSaving:
    "Mae'n ddrwg gennym, rydym yn cael problemau technegol wrth geisio cadw eich cais. Rhowch gynnig arall arni mewn ychydig funudau.",
  errorPaymentRedirect:
    'Mae’n ddrwg gennym, rydym yn cael problemau technegol wrth geisio eich ailgyfeirio i’r dudalen dalu. Rhowch gynnig arall arni ymhen ychydig o funudau.',
  errorFetchingFee:
    'Mae’n ddrwg gennym, rydym yn cael problemau technegol yn cael gafael ar wybodaeth y ffi ar gyfer eich cais. Rhowch gynnig arall arni ymhen ychydig o funudau.',
  ogl: 'Mae’r holl gynnwys ar gael o dan <a class="govuk-link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" rel="license" >Drwydded Agored y Llywodraeth f3.0</a>, oni nodir fel arall',
  errorSummaryHeading: 'Mae yna broblem',
  saveAsDraft: 'Cadw fel drafft',
  signOut: 'Allgofnodi',
  signIn: 'Mewngofnodi',
  accessibility: 'Datganiad hygyrchedd',
  cookies: 'Cwcis',
  privacyPolicy: 'Polisi preifatrwydd',
  termsAndConditions: 'Telerau ac amodau',
  contactUs: 'Cysylltwch â ni',
  marriage: 'priodas',
  divorce: 'ysgariad',
  endingCivilPartnership: 'dod â phartneriaeth sifil i ben',
  civilPartnership: 'partneriaeth sifil',
  husband: 'gŵr',
  wife: 'gwraig',
  partner: 'partner',
  civilPartner: 'partner sifil',
  withHim: 'gydag ef',
  withHer: 'gyda hi',
  months: [
    'Ionawr',
    'Chwefror',
    'Mawrth',
    'Ebrill',
    'Mai',
    'Mehefin',
    'Gorffennaf',
    'Awst',
    'Medi',
    'Hydref',
    'Tachwedd',
    'Rhagfyr',
  ],
  dateFormat: {
    day: 'Diwrnod',
    month: 'Mis',
    year: 'Blwyddyn',
  },
  yes: 'Ydw',
  no: 'Nac ydw',
  notSure: 'Ddim yn siŵr',
  english: 'Saesneg',
  welsh: 'Cymraeg',
  contactUsForHelp: 'Cysylltwch â ni am gymorth',
  webChat: 'Sgwrsio dros y we',
  webChatDetails:
    "Mae ein holl asiantau sgwrsio dros y we yn brysur yn helpu pobl eraill. Dewch yn ôl nes ymlaen neu cysylltwch â ni trwy un o'r dulliau uchod.",
  sendUsAMessage: 'Anfonwch neges atom',
  sendUsAMessageDetails: 'Byddwn yn ymdrechu i ymateb o fewn 5 diwrnod.',
  telephone: 'Ffoniwch',
  telephoneNumber: '0300 303 5171',
  telephoneDetails: 'Dydd Llun i ddydd Gwener, 8am i 8pm, Dydd Sadwrn 8am i 2pm.',
  changeCookiesHeading: 'Newid eich gosodiadau cwcis',
  allowAnalyticsCookies: 'Caniatáu cwcis sy’n mesur y defnydd o’r wefan?',
  useAnalyticsCookies: 'Defnyddio cwcis sy’n mesur fy nefnydd i o’r wefan',
  doNotUseAnalyticsCookies: 'Peidio â defnyddio cwcis sy’n mesur fy nefnydd i o’r wefan',
  save: 'Cadw',
  cookiesSaved: 'Arbedwyd eich gosodiadau cwcis',
  additionalCookies:
    "Gall gwasanaethau'r llywodraeth osod cwcis ychwanegol ac, os felly, bydd ganddyn nhw eu polisi a'u baner cwcis eu hunain.",
  goToHomepage: 'Ewch i’r dudalen hafan',
  apmCookiesHeadings: "Caniatáu cwcis sy'n mesur y broses o fonitro perfformiad gwefannau?",
  useApmCookies: "Defnyddio cwcis sy'n mesur monitro perfformiad ceisiadau gwefan",
  doNotUseApmCookies: "Peidiwch â defnyddio cwcis sy'n mesur monitro perfformiad ceisiadau gwefannau",
  cookiesAcceptedPart1: 'Rydych wedi derbyn cwcis ychwanegol. Gallwch',
  cookiesAcceptorRejectPart2: 'newid eich gosodiadau cwcis',
  cookiesAcceptorRejectPart3: 'ar unrhyw bryd.',
  cookiesHeading: 'Cwcis ar',
  cookiesLine1: 'Rydym yn defnyddio rhai cwcis hanfodol i wneud i’r gwasanaeth hwn weithio.',
  cookiesLine2:
    'Hoffwn hefyd ddefnyddio cwcis dadansoddol fel y gallwn ddeall sut rydych chi’n defnyddio’r gwasanaeth ac i wneud gwelliannau.',
  acceptAnalyticsCookies: 'Derbyn cwcis dadansoddol',
  rejectAnalyticsCookies: 'Gwrthod cwcis dadansoddol',
  viewCookies: 'Gweld cwcis',
  hideMessage: 'Cuddio’r neges hon',
  cookiesRejectedPart1: 'Rydych wedi gwrthod cwcis ychwanegol. Gallwch',
  next: 'Nesaf',
  cancel: 'Canslo',
};

export const generatePageContent = ({
  language,
  pageContent,
  userCase,
  uploadedDocuments,
  addDocuments,
  userEmail,
  addresses = [],
  additionalData,
  fee,
}: {
  language: Language;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  uploadedDocuments?: any;
  addDocuments?: any;
  userEmail?: string;
  addresses?: [];
  additionalData?: CommonContentAdditionalData;
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
    addDocuments,
    userEmail,
    contactEmail,
    addresses,
    additionalData,
    // eligibility,
    fee,
  };

  if (pageContent) {
    Object.assign(content, pageContent(content));
  }

  return content;
};

const getServiceName = (translations: typeof en): string => {
  return capitalize(translations.applyForAdoption);
};

export type CommonContent = typeof en & {
  language: Language;
  serviceName: string;
  pageContent?: TranslationFn;
  userCase?: Partial<CaseWithId>;
  uploadedDocuments?: any;
  addDocuments?: any;
  userEmail?: string;
  contactEmail?: string;
  referenceNumber?: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  addresses?: any[];
  eligibility?: Eligibility;
  additionalData?: CommonContentAdditionalData;
  fee?: Fee;
};

export type CommonContentAdditionalData = {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type Language = 'en' | 'cy';
