const { I } = inject();
const config = require('../config.js');
module.exports = {
  fields: {
    uploadFileButton: '#file-upload-1',
    uploadProgressBar: '#uploadProgressBar div[aria-hidden="true"]',
    fileUploadedOption: 'button[type="upload document"]',
  },

async uploadDocumentsSection() {
    await I.waitForText("Upload application form", 30);
    await I.attachFile(this.fields.uploadFileButton, config.testPdfFile);
    await I.wait(3);
    I.click('Continue')
  },
};
