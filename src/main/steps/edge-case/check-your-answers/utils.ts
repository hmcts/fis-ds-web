import { getFormattedDate } from '../../../app/case/answers/formatDate';
import { CaseWithId } from '../../../app/case/case';
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
                  href: changeUrl , //
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
export const applicantSummaryList = (
  { sectionTitles, keys, ...content }: SummaryListContent,
  userCase: Partial<CaseWithId>
): SummaryList | undefined => {

  console.log("usercase in check your answer -->",userCase);
  const sectionTitle = sectionTitles.applicantDetails;
  console.log('Address in util userCase --->', userCase);


  let SummaryData =    [
    {
      key: keys.fullName,
      value: userCase['applicantFirstName'] + ' ' + userCase['applicantLastName'],
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
      value: userCase['emailAddress'],
      changeUrl: Urls['CONTACT_DETAILS'],
    },
    {
      key: keys.namedPersonEmail,
      value: userCase['homePhoneNumber'],
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
    rows: getSectionSummaryList(
   SummaryData,
      content
    ),
  };
};
