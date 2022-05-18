const config = require('../config');
const { I } = inject();
module.exports = {

  async seeTheLandingPage() {
    console.log('User using the URL= ' + config.baseUrl);
    await I.amOnPage(config.baseUrl)
    I.wait('2');
    await I.see('Submit an application to HM Courts and Tribunal service');
    I.wait(5);
    I.click('Start now'); 
  },
};