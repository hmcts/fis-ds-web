const { I } = inject();
const ApplicantNameDetails = require('../fixtures/content/ApplicantName_content');

module.exports = {
  fields: {
    firstnames: 'input[id$="applicantFirstName"]',
    lastnames: 'input[id$="applicantLastName"]',
  },

 applicantFullnames() {
    I.waitForText(ApplicantNameDetails.pageTitle);
    I.waitForText(ApplicantNameDetails.hintText);
    I.fillField(this.fields.firstnames, ApplicantNameDetails.firstnames);
    I.fillField(this.fields.lastnames, ApplicantNameDetails.lastnames);
    I.wait('2');
    I.click(ApplicantNameDetails.button);
    I.wait('2');
    }
};