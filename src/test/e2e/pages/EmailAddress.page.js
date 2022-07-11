const { I } = inject();
const EmailAdsressDetails = require('../fixtures/content/EmailAddress_content');

module.exports = {
  fields: {
    emailaddress: '#applicantEmailAddress',
  },
  async emailAddress() {
    await I.wait(2);
    await I.see(EmailAdsressDetails.pageTitle);
    await I.see(EmailAdsressDetails.hintText);
    I.fillField(this.fields.emailaddress, EmailAdsressDetails.emailaddress);
    await I.wait(2);
    await I.click(EmailAdsressDetails.button);
  },
};
