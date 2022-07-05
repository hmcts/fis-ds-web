const { I } = inject();

module.exports = {
  fields: {
    dss: 'input[id$="serviceType"]',
    privatelaw: 'input[id$="serviceType-2"]',
  },

  async seeTheTitleOfThePage() {
    I.wait('2');
    await I.see('Select type of family law you need');
    await I.see('Select either dss or private law. There are specific examples under each section');
  },

    selectdssService() {
      if(I.click(this.fields.dss)){  
      I.see('International dss');
      I.see('Relinquished dss');
      I.see('Stepparent dss');
      I.see('Parental orders');
    }
      I.click('Continue');
      I.wait(5);
    },
  
    selectPrivateLawService() {
      if (I.click(this.fields.privatelaw)){
      I.see('Female Genital Mutilation Orders(FGM)');
      I.see('Forced Marriage Protection Order(FMPO)');
      I.see('Special Guardianship');
      I.see('Financial Applications');
      I.see('Declaration of parentage');
      }
      I.click('Continue');
      I.wait(5);
    },
};
