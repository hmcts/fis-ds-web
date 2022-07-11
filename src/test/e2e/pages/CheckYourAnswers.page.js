const { I } = inject();
const config = require('../config.js');
const CheckYourAnswersDetails = require('../fixtures/content/CheckYourAnswers_content');

module.exports = {
async checkyouranswers() {
    await I.waitForText(CheckYourAnswersDetails.pagetitle, 30);
    await I.wait(3);
    await I.see(CheckYourAnswersDetails.subtitle);
    await I.wait(3);
    await I.see(CheckYourAnswersDetails.confirmation);
    await I.click(CheckYourAnswersDetails.button);
    await I.wait(5);
},
};