export type PageLink = `/${string}`;

export const HOME_URL: PageLink = '/';
/***
 *  these are the oidc urls that allows to navigate to utilities
 *  relation :  @OIDC and @Auth
 *
 */
export const CALLBACK_URL: PageLink = '/receiver';
export const SIGN_IN_URL: PageLink = '/login';
export const SIGN_OUT_URL: PageLink = '/logout';

/***
 *  these are the util urls that allows to navigate to utilities
 *  relation :  @util_urls
 *
 */
export const TIMED_OUT_URL: PageLink = '/timed-out';
export const KEEP_ALIVE_URL: PageLink = '/keep-alive';
export const CSRF_TOKEN_ERROR_URL: PageLink = '/csrf-token-error';

/***
 *  this is the edge case url
 *  relation :  @EdgeCases
 *
 */
export const APPLYING_WITH_URL: PageLink = '/applying-with';
export const EDGE_CASE_URL: PageLink = '/edge-case';
export const FULL_NAME: PageLink = '/full-name';
export const USER_ROLE: PageLink = '/user-role';
export const DATE_OF_BIRTH: PageLink = '/date-of-birth';
export const FIND_ADDRESS: PageLink = '/address/lookup';
export const SELECT_ADDRESS: PageLink = '/address/select';
export const EMAIL_ADDRESS: PageLink = '/email-address';
export const MANUAL_ADDRESS: PageLink = '/address/manual';
export const CONTACT_DETAILS: PageLink = '/contact-details';
export const PAY_YOUR_FEE: PageLink = '/payment/pay-your-fee';
export const UPLOAD_YOUR_DOCUMENTS: PageLink = '/upload-your-documents';
export const ADDITIONAL_DOCUMENTS_UPLOAD: PageLink = '/upload-additional-documents';
// @POST document
export const DOCUMENT_UPLOAD_URL: PageLink = '/document-manager';
export const CONTACT_PREFERENCES: PageLink = '/contact-preferences';
export const CHECK_YOUR_ANSWERS: PageLink = '/check-your-answers';
export const STATEMENT_OF_TRUTH: PageLink = '/statement-of-truth';
export const APPLICATION_SUBMITTED: PageLink = '/application-submitted';
export const COOKIES: PageLink = '/cookies';

/**
 * @ImportantNotice
 *
 * this only one is left for keeping go-back functionality alive please @donot_remove_it
 */
export const CHECK_JURISDICTION: PageLink = '/check-jurisdiction';
