const { I } = inject();
const config = require('../config.js');
module.exports = {
    statementoftruth: 'input[id$="applicantStatementOfTruth"]',
  

async statementOfTruth() {
    await I.waitForText("Proceedings for contempt of court may be brought against anyone who makes, or causes to be made, a false statement verified by a statement of truth without an honest belief in the truth", 30);
    await I.waitForText("This confirms that the information you are submitting is true and accurate to the best of your knowledge. It's known as your 'statement of truth'.", 30);
    await I.waitForText("I believe that the facts stated in this application are true", 30);
    await I.wait(3);
    await I.click(this.statementoftruth);
    await I.wait(3);
    I.click('Continue');
  },
};
