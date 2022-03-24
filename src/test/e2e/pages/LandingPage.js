const { I } = inject();

module.exports = {
  fields: {
    family: 'input[id$="selectJurisdiction"]',
    tribunals: 'input[id$="selectJurisdiction-2"]',
  },

  async seeTheLandingPage() {
    I.wait('2');
    await I.see('Select Jurisdiction');
  },

    selectjurisdictionasfamily() {
      I.click(this.fields.family);
      I.click('Continue');
      I.wait(5);
    },
  
    selectjurisdictionastribunals() {
      I.click(this.fields.tribunals);
      I.click('Continue');
      I.wait(5);
  },
};
