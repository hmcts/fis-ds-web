const { I } = inject();
const config = require('../config.js');
const UploadDocumentsDetails = require('../fixtures/content/UploadDocuments_content');

module.exports = {
  fields: {
    uploadFileButton: '#file-upload-1',
    uploadProgressBar: '#uploadProgressBar div[aria-hidden="true"]',
    fileUploadedOption: 'button[type="upload document"]',
  },

async uploadDocumentsSection() {
    await I.waitForText(UploadDocumentsDetails.pageTitle, 30);
    await I.see(UploadDocumentsDetails.textonpage1);
    await I.see(UploadDocumentsDetails.textonpage2);
    await I.see(UploadDocumentsDetails.textonpage3);
    await I.see(UploadDocumentsDetails.textonpage4);
    await I.see(UploadDocumentsDetails.hinttext);
    await I.wait(3);
    await I.attachFile(this.fields.uploadFileButton, config.testPdfFile);
    await I.wait(3);
    await I.retry(3).waitForElement(this.fields.fileUploadedOption, 30);
    I.click(this.fields.fileUploadedOption)
    await I.wait(4);
    I.click(UploadDocumentsDetails.button)
  },
};
