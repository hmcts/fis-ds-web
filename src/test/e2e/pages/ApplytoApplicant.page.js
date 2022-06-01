const { I } = inject();

module.exports = {
  fields: {
    firstnames: 'input[id$="applicantFirstNames"]',
    lastnames: 'input[id$="applicantLastNames"]',
  },

 applicantFullnames() {
    I.waitForText("Who is the person named on this application?");
    I.fillField(this.fields.firstnames, 'Marie');
    I.fillField(this.fields.lastnames, 'Stopes');
    I.wait('2');
    I.click('Continue');
    I.wait('2');
    }
};