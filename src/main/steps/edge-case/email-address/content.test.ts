import languageAssertions from '../../../../test/unit/utils/languageAssertions';
import { CommonContent } from '../../common/common.content';

import { generateContent } from './content';

jest.mock('../../../app/form/validation');

const EN = 'en';
const enContent = {
  continue: "Continue",
  serviceName: "Email Address",
  label: "What is the email address of the person named on the application",
  hint: "Email Address",
  emailAddress: "Insert email address"
};

const cyContent = {
  continue: "Continue (Welsh)",
  serviceName: "Email Address (Welsh)",
  label: "What is the email address of the person named on the application (Welsh)",
  hint: "Email Address",
  emailAddress: "Insert email address (Welsh)"
};

const commonContent = { language: EN } as CommonContent;
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
describe('Email Address', () => {
  it('should return the correct content for language = en', () => {
    languageAssertions('en', enContent, () => generateContent(commonContent));
  });

  it('should return the correct content for language = cy', () => {
    languageAssertions('cy', cyContent, () => generateContent({ ...commonContent, language: 'cy' }));
  });

});