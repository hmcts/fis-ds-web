import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseWithDocuments, CaseWithId } from '../../../app/case/case';
import { getFormattedAddress } from '../../../app/case/formatter/address';
import { PageContent } from '../../../app/controller/GetController';
import * as Urls from '../../../steps/urls';

interface GovUkNunjucksSummary {
  key: {
    text?: string;
    html?: string;
    classes?: string;
  };
  value: {
    text?: string;
    html?: string;
  };
  actions?: {
    items?: [
      {
        href: string;
        text: string;
        visuallyHiddenText: string;
      }
    ];
  };
  classes?: string;
}

interface SummaryListRow {
  key?: string;
  keyHtml?: string;
  value?: string;
  valueHtml?: string;
  changeUrl?: string;
  classes?: string;
}

interface SummaryList {
  title: string;
  rows: GovUkNunjucksSummary[];
}

type SummaryListContent = PageContent & {
  sectionTitles: Record<string, string>;
  keys: Record<string, string>;
  language?: string;
};

const getSectionSummaryList = (rows: SummaryListRow[], content: PageContent): GovUkNunjucksSummary[] => {
  return rows.map(item => {
    const changeUrl = item.changeUrl;
    return {
      key: { ...(item.key ? { text: item.key } : {}), ...(item.keyHtml ? { html: item.keyHtml } : {}) },
      value: { ...(item.value ? { text: item.value } : {}), ...(item.valueHtml ? { html: item.valueHtml } : {}) },
      ...(changeUrl
        ? {
            actions: {
              items: [
                {
                  href: changeUrl, //
                  text: content.change as string,
                  visuallyHiddenText: `${item.key}`,
                },
              ],
            },
          }
        : {}),
      ...(item.classes ? { classes: item.classes } : {}),
    };
  });
};

/* eslint-disable import/namespace */
export const ApplicantSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  console.log('usercase in check your answer -->', userCase);
  const sectionTitle = sectionTitles.applicantDetails;
  console.log('Address in util userCase --->', userCase);

  const UserContactPreferences = function () {
    let perference = '';
    if (userCase['contactPreferenceType'] === 'NAMED_PERSON') {
      perference = 'The person named on this application';
    } else if (userCase['contactPreferenceType'] === 'ACCOUNT_OWNER') {
      perference = 'The account owner';
    } else if (userCase['contactPreferenceType'] === 'BOTH_RECEIVE') {
      perference = 'Both the account owner and the person named on this application';
    } else {
      perference = '';
    }
    return perference;
  };

  const SummaryData = [
    {
      key: keys.fullName,
      value: userCase['applicantFirstNames'] + ' ' + userCase['applicantLastNames'],
      changeUrl: Urls['FULL_NAME'],
    },
    {
      key: keys.dateOfBirth,
      value: getFormattedDate(userCase['applicantDateOfBirth'], content.language),
      changeUrl: Urls['DATE_OF_BIRTH'],
    },
    {
      key: keys.address,
      valueHtml: getFormattedAddress(userCase),
      changeUrl: Urls['MANUAL_ADDRESS'],
    },
    {
      key: keys.recievingEmail,
      value: UserContactPreferences(),
      changeUrl: Urls['CONTACT_PREFERENCES'],
    },
    {
      key: keys.namedPersonEmail,
      value: userCase['emailAddress'],
      changeUrl: Urls['EMAIL_ADDRESS'],
    },
    {
      key: keys.namedPersonMob,
      value: userCase['mobilePhoneNumber'],
      changeUrl: Urls['CONTACT_DETAILS'],
    },
    {
      key: keys.namedPersonTel,
      value: userCase['homePhoneNumber'],
      changeUrl: Urls['CONTACT_DETAILS'],
    },
  ];

  /** Removes entry in @summarydata if user is not a named user */

  return {
    title: sectionTitle,
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const UploadFormSummary = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithDocuments>
): SummaryList | undefined => {
  console.log('usercase in check your answer -->', userCase);
  //  const sectionTitle = sectionTitles.applicantDetails;
  console.log('Address in util userCase --->', userCase);
  // const caseDocs = userCase['uploadedDocuments'] === undefined ? [] : userCase['uploadedDocuments']

  const SummaryData = [
    {
      key: keys.uploadDocuments,
      value: '',
      changeUrl: Urls['UPLOAD_YOUR_DOCUMENTS'],
    },
  ];

  /** Removes entry in @summarydata if user is not a named user */

  return {
    title: 'List of forms uploaded ',
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const UserRole = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {
  const isNamedApplicant =
    userCase['namedApplicant'] === true ? 'Yes' : 'No - I am sending an application for someone else.';

  const SummaryData = [
    {
      key: keys['user-role'],
      value: isNamedApplicant,
      changeUrl: Urls['USER_ROLE'],
    },
  ];

  /** Removes entry in @summarydata if user is not a named user */

  return {
    title: 'Determine User’s Role',
    rows: getSectionSummaryList(SummaryData, content),
  };
};

/* eslint-disable import/namespace */
export const AdditonalFormSummary = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithDocuments>
): SummaryList | undefined => {
  console.log('usercase in check your answer -->', userCase);
  //  const sectionTitle = sectionTitles.applicantDetails;
  console.log('Address in util userCase --->', userCase);

  //const caseDocs = userCase['addtionalDocuments'] === undefined ? [] : userCase['addtionalDocuments']

  const SummaryData = [
    {
      key: keys.additionalDocuments,
      value: '',
      changeUrl: Urls['ADDITIONAL_DOCUMENTS_UPLOAD'],
    },
  ];

  /** Removes entry in @summarydata if user is not a named user */

  return {
    title: 'List of Documents uploaded  ',
    rows: getSectionSummaryList(SummaryData, content),
  };
};
