const { I } = inject();
const ContactNumberDetails = require('../fixtures/content/ContactNumber_content');

module.exports = {
  fields: {
    homenumber: 'input[id$="applicantHomeNumber"]',
    mobilenumber: 'input[id$="applicantPhoneNumber"]'
  },
    EnterHomeAndMobileNo( homeNumber , mobileNumber ) {
        I.waitForText(ContactNumberDetails.pageTitle , 30);
        I.waitForText(ContactNumberDetails.hinttext);
        I.fillField(this.fields.homenumber, homeNumber );
        I.fillField(this.fields.mobilenumber, mobileNumber );
        I.click(ContactNumberDetails.button);
        I.wait(5);
    },
};
