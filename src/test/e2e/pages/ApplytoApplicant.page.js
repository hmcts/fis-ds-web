const { I } = inject();

module.exports = {
  fields: {
    firstnames: 'input[id$="applicant1FirstNames"]',
    lastnames: 'input[id$="applicant1LastNames"]',
  },

 applicantFullnames() {
    I.waitForText("What's your full name?");
    I.fillField(this.fields.firstnames, 'Marie');
    I.fillField(this.fields.lastnames, 'Stopes');
    I.wait('2');
    I.click('Save and continue');
    I.wait('2');
    }
};