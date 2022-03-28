const { I } = inject();

module.exports = {
  fields: {
    adoption: 'input[id$="serviceType"]',
    privatelaw: 'input[id$="serviceType-2"]',
  },

  async seeTheTitleOfThePage() {
    I.wait('2');
    await I.see('Select type of family law you need');
    await I.see('Select either adoption or private law. There are specific examples under each section');
  },

    selectAdoptionService() {
      if(I.click(this.fields.adoption)){  
      I.see('International Adoption');
      I.see('Relinquished adoption');
      I.see('Stepparent Adoption');
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
