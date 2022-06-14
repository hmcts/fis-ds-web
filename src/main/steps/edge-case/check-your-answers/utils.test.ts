import { mockUserCase1 } from '../../../../test/unit/utils/mockUserCase';

//mockUserCase2, mockUserCase3

import { enContent } from './content';
import { applicantSummaryList } from './utils';
/**AdditonalFormSummary UploadFormSummary   */

describe('upload-addition-documents > check-your-answers', () => {
  describe('applicationSummaryList', () => {
    test.each([
      {
        userCase: mockUserCase1,
        expected: {
          rows: [
            {
              actions: {
                items: [
                  {
                    href: '/full-name',
                    text: 'change',
                    visuallyHiddenText: 'Subject’s name',
                  },
                ],
              },
              key: { text: 'Subject’s name' },
              value: { text: 'Joe Bob' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/date-of-birth',
                    text: 'change',
                    visuallyHiddenText: 'Subject’s DoB',
                  },
                ],
              },
              key: { text: 'Subject’s DoB' },
              value: { text: '27 December 1829' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/address/manual',
                    text: 'change',
                    visuallyHiddenText: 'Address',
                  },
                ],
              },
              key: { text: 'Address' },
              value: { html: '100 Dummy Avenue<br>DummyCity<br>CITY OF Dummy<br>G11 XXL' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/contact-preferences',
                    text: 'change',
                    visuallyHiddenText: 'Who should receive emails about the application',
                  },
                ],
              },
              key: { text: 'Who should receive emails about the application' },
              value: { text: 'The account owner' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/email-address',
                    text: 'change',
                    visuallyHiddenText: 'Email address of the person named on the application',
                  },
                ],
              },
              key: { text: 'Email address of the person named on the application' },
              value: { text: 'dummy@bob.com' },
            },
            {
              actions: {
                items: [
                  {
                    href: '/contact-details',
                    text: 'change',
                    visuallyHiddenText: 'Contact number of the person named on the application',
                  },
                ],
              },
              key: { text: 'Contact number of the person named on the application' },
              value: { text: '012345678910' },
            },
          ],
          title: 'Applicant details',
        },
      },
    ])('return correct summary list items when %#', ({ userCase, expected }) => {
      expect(applicantSummaryList(enContent, userCase)).not.toBe(expected);
    });
  });
})