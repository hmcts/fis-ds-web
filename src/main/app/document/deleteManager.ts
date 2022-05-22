import { Request, Response } from 'express';

/**
 * @DocumentManager
 *
 * For deleting the documents
 */

export class DocumentDeleteManager {
  async deleteManager(req: Request, res: Response): Promise<void> {
    const QueriedDeleteID = req.query['documentId'];

    const CaseDocuments = req.session['caseDocuments'];
    const FilteredDocuments = CaseDocuments.filter(document => {
      const documentId = document._links.self.href.split('/')[4];
      return documentId !== QueriedDeleteID;
    });

    console.log(FilteredDocuments);
    req.session['caseDocuments'] = [];

    res.redirect('/upload-your-documents');
  }
}
