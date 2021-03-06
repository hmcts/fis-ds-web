const { I } = inject();
const config = require('../../config');

module.exports = {
  fields: {
    jurisdiction: '#cc-jurisdiction',
    caseType: '#cc-case-type',
    event: '#cc-event',
    outsourcingLAs: '#outsourcingLAs',
  },
  enterCaseNamePage: {
    caseName: '#caseName',
  },
  startButton: 'Start',
  continueButton: 'Continue',

  async populateForm(caseName) {
    // wait until the dropdown is populated
    I.waitForElement(`${this.fields.jurisdiction} > option[value="${config.definition.jurisdiction}"]`, 30);
    I.selectOption(this.fields.jurisdiction, config.definition.jurisdictionFullDesc);
    I.waitForElement(`${this.fields.caseType} > option[value="${config.definition.caseType}"]`, 30);
    I.selectOption(this.fields.caseType, config.definition.caseTypeFullDesc);
    I.waitForElement(`${this.fields.event} > option[value="openCase"]`, 30);
    I.selectOption(this.fields.event, 'Start application', 30);
    await I.retryUntilExists(() => I.goToNextPage(this.startButton), this.enterCaseNamePage.caseName);
    this.enterCaseName(caseName);
  },
  enterCaseName(caseName = 'Barnet Council v Smith') {
    I.waitForElement(this.enterCaseNamePage.caseName, 5);
    I.fillField(this.enterCaseNamePage.caseName, caseName);
  },
};
