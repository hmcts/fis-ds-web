const { I } = inject();

module.exports = {
  fields: {
    familyJurisdication: 'input[id$="selectJurisdiction"]',
  },
  async seeTheLandingPage() {
    I.wait('2');
    await I.see('Select Jurisdiction');
    await I.seeElement(this.fields.familyJurisdication);
  },
};