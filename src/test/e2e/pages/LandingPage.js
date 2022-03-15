const { I } = inject();

module.exports = {
  fields: {
    Jurisdication: 'input[id$="citizenJurisdication"]',
    ApplicationType: 'input[id$="citizenApplicationType"]',
  },
  async seeTheLandingPage() {
    I.wait('2');
    await I.seeElement(this.fields.Jurisdication);
  },
};
