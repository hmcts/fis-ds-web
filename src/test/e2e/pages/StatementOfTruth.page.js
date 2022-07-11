const { I } = inject();
const config = require('../config.js');
const StatementOfTruthDetails = require('../fixtures/content/StatementOfTruth_content');

module.exports = {
    statementoftruth: 'input[id$="applicantStatementOfTruth"]',
  

async statementOfTruth() {
    await I.waitForText(StatementOfTruthDetails.contentL1);
    await I.waitForText(StatementOfTruthDetails.contentL2);
    await I.waitForText(StatementOfTruthDetails.contentL3);
    await I.wait(3);
    await I.click(this.statementoftruth);
    await I.wait(3);
    I.click(StatementOfTruthDetails.button);
  },
};
