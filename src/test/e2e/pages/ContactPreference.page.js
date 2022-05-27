const { I } = inject();
var assert = require('assert');

module.exports = {
  fields: {
    accountOwner: 'input[id$="contactPreferenceType"]',
    namedPerson: 'input[id$="contactPreferenceType-2"]',
    bothAccountOwnerAndNamedPerson: 'input[id$="contactPreferenceType-3"]'
  },
  async contactPreference() {
    await I.wait(2);
    await I.see('Who should receive emails about this application?');
    await I.click(this.fields.bothAccountOwnerAndNamedPerson);
    await I.wait(2);
    await I.click('Continue');
    await I.wait('4');
  },
};
