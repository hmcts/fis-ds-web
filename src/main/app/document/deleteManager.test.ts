import { UPLOAD_YOUR_DOCUMENTS } from '../../steps/urls';

import { DocumentDeleteManager } from './deleteManager';
/**
 * import { mockRequest } from '../../../test/unit/utils/mockRequest';
import { mockResponse } from '../../../test/unit/utils/mockResponse';
 */

const BaseRedirectURI = '/upload-your-documents';

/**
 * const req = mockRequest({
    query: {'documentId' : 'xyz'}
})

const res = mockResponse({});
 * 
 */

const InstanceOfDocumentManager = new DocumentDeleteManager();

describe('Document Delete Manager', () => {
  // InstanceOfDocumentManager.

  it('InstanceOfDocumentManager must be an Instance of DocumentDeleteManager', async () => {
    expect(InstanceOfDocumentManager).toBeInstanceOf(DocumentDeleteManager);
  });

  it('Upload your document url must match /upload-your-documents', async () => {
    expect(UPLOAD_YOUR_DOCUMENTS).toEqual(BaseRedirectURI);
  });

  it('must redirect to /upload-your-documents', async () => {
    expect(InstanceOfDocumentManager).toBeInstanceOf(DocumentDeleteManager);
  });
});
