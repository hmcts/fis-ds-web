const { I } = inject();
var assert = require('assert');
const ContactPreferenceDetails = require('../fixtures/content/ContactPreferences_content');


module.exports = {
  fields: {
    accountOwner: 'input[id$="contactPreferenceType"]',
    namedPerson: 'input[id$="contactPreferenceType-2"]',
    bothAccountOwnerAndNamedPerson: 'input[id$="contactPreferenceType-3"]'
  },
  async contactPreference() {
    await I.wait(2);
    await I.see(ContactPreferenceDetails.pageTitle);
    await I.see(ContactPreferenceDetails.hintText);
    await I.click(this.fields.bothAccountOwnerAndNamedPerson);
    await I.wait(2);
    await I.click(ContactPreferenceDetails.button);
    await I.wait('4');
  },
};
