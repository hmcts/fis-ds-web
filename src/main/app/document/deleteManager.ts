import { Response } from 'express';

import { AppRequest } from '../../app/controller/AppRequest';
import { ADDITIONAL_DOCUMENTS_UPLOAD, UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';

export const DocumentDeleteManager = (req: AppRequest, res: Response) => {
  if (
    req.query.hasOwnProperty('query') &&
    req.query.hasOwnProperty('documentId') &&
    req.query.hasOwnProperty('documentType')
  ) {
    const checkForDeleteQuery = req.query['query'] === 'delete';
    if (checkForDeleteQuery) {
      const { documentType } = req.query;
      const { documentId } = req.query;
      /** Switching type of documents */
      switch (documentType) {
        case 'applicationform':
          const sessionObjectOfApplicationDocuments = req.session['caseDocuments'].filter(document => {
            const { _links } = document;
            const documentIdFound = _links.self['href'].split('/')[4];
            return documentIdFound !== documentId;
          });
          req.session['caseDocuments'] = sessionObjectOfApplicationDocuments;
          req.session.save(function (err) {
            if (err) {
              throw err;
            }
            res.redirect(UPLOAD_YOUR_DOCUMENTS);
          });

          break;

        case 'additional':
          const sessionObjectOfAdditionalDocuments = req.session['AddtionalCaseDocuments'].filter(document => {
            const { _links } = document;
            const documentIdFound = _links.self['href'].split('/')[4];
            return documentIdFound !== documentId;
          });
          req.session['AddtionalCaseDocuments'] = sessionObjectOfAdditionalDocuments;
          // console.log({deletedDocuments : sessionObjectOfApplicationDocuments})
          req.session.save(function (err) {
            if (err) {
              throw err;
            }
            res.redirect(ADDITIONAL_DOCUMENTS_UPLOAD);
          });
          break;
      }
    }
  }
};
