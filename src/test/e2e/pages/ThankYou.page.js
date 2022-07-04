const { I } = inject();
const config = require('../config.js');

module.exports = {

    caseID: '.govuk-panel__body strong',

async applicationsubmission() {
    await I.waitForText("Application Submitted", 30);
    await I.wait(3);
    await I.see('Your reference number is:');
    await I.wait(3);
    await I.see('You have been sent a confirmation by email.');
    console.log(await I.retry(3).grabTextFrom(this.fields.caseID));
  },
};