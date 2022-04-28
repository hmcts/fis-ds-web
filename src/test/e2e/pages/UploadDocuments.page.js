const { I } = inject();
const config = require('../config.js');
module.exports = {
  fields: {
    uploadFileButton: 'input[id$="file-upload-1"]',
    uploadProgressBar: '#uploadProgressBar div[aria-hidden="true"]',
    fileUploadedOption: 'button[type="upload document"]',
  },

async uploadDocumentsSection() {
    await I.waitForText("Upload the child's documents", 30);
    await I.attachFile(this.fields.uploadFileButton, config.testPdfFile);
    await I.wait(3);
    //await I.retry(3).waitForElement(this.fields.uploadProgressBar, 30);
    //await I.wait(3);
    await I.retry(3).waitForElement(this.fields.fileUploadedOption, 30);
    await I.wait(4);
    I.click('Save and continue');
  },
};
