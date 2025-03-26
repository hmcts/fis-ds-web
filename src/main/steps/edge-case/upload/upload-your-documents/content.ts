import _ from 'lodash';

import { TYPE_OF_APPLICATION } from '../../../../app/case/definition';
import { TranslationFn } from '../../../../app/controller/GetController';
import { FormContent } from '../../../../app/form/Form';
import { interpolate } from '../../../../steps/common/string-parser';
import { applyParms } from '../../../../steps/common/url-parser';
import { loadResources } from '../../../../steps/edge-case/util';
import { UPLOAD_YOUR_DOCUMENTS } from '../../../../steps/urls';

export * from './routeGuard';

export const form: FormContent = {
  fields: {},
  submit: {
    text: l => l.continue,
  },
};

export const generateContent: TranslationFn = content => {
  const resourceLoader = loadResources('upload-your-documents');
  const translations = resourceLoader.getFileContents().translations[content.language];
  const uploadedDocuments = content.userCase?.applicantApplicationFormDocuments?.map(uploadedDocument => {
    return {
      filename: uploadedDocument.document_filename,
      fileremoveUrl: applyParms(UPLOAD_YOUR_DOCUMENTS, {
        removeFileId: _.toString(_.last(uploadedDocument.document_url.split('/'))),
      }),
    };
  });

  const yourConfidentility = interpolate(translations.youNeed3, {
    protected:
      content.userCase?.edgeCaseTypeOfApplication === TYPE_OF_APPLICATION.FGM ||
      content.userCase?.edgeCaseTypeOfApplication === TYPE_OF_APPLICATION.FMPO
        ? translations.youNeed4
        : '',
  });

  return {
    ...translations,
    yourConfidentility,
    edgeCaseTypeOfApplication: content.userCase?.edgeCaseTypeOfApplication,
    isDaCase:
      content.userCase?.edgeCaseTypeOfApplication === TYPE_OF_APPLICATION.FGM ||
      content.userCase?.edgeCaseTypeOfApplication === TYPE_OF_APPLICATION.FMPO,
    form,
    fileUploadConfig: {
      labelText: translations.uploadFileHeading,
      hintText: translations.uplodFileHint,
      uploadButtonText: translations.uploadButton,
      uploadedFilesCaption: translations.filesUploadedLabel,
      removeFileText: translations.delete,
      uploadedFiles: uploadedDocuments,
      summaryText: translations.summaryText,
      uploadRequirement: translations.uploadRequirement,
    },
  };
};
