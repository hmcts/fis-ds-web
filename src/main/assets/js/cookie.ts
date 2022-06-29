import * as cookieManager from '@hmcts/cookie-manager';

import { qs } from './selectors';

const cookieBanner = qs('#cm-cookie-banner');
const cookieBannerDecision = cookieBanner?.querySelector('.govuk-cookie-banner__decision') as HTMLInputElement;
const cookieBannerConfirmation = cookieBanner?.querySelector('.govuk-cookie-banner__confirmation') as HTMLInputElement;

function getCookie(cname) {
  const cookies = Object.fromEntries(
    document.cookie.split(/; /).map(c => {
      const [key, v] = c.split('=', 2);
      return [key, decodeURIComponent(v)];
    })
  );
  return cookies[cname] || '';
}

function setCookie(key, value, expiry) {
  const expires = new Date();
  expires.setTime(expires.getTime() + expiry * 24 * 60 * 60 * 1000);
  document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function cookieBannerAccept() {
  const confirmationMessage = cookieBannerConfirmation?.querySelector('p') as HTMLInputElement;
  confirmationMessage.innerHTML = 'You’ve accepted additional cookies. ' + confirmationMessage.innerHTML;
  const getCookieFromBrowser = getCookie('ds-web-cookie-preferences');
  setCookie('ds-web-cookie-preferences', getCookieFromBrowser, 365);
}

function cookieBannerReject() {
  const confirmationMessage = cookieBannerConfirmation?.querySelector('p') as HTMLInputElement;
  confirmationMessage.innerHTML = 'You’ve rejected additional cookies. ' + confirmationMessage.innerHTML;
  const rejectedCookies = decodeURIComponent(JSON.stringify({ analytics: 'off', apm: 'off' }));
  setCookie('ds-web-cookie-preferences', rejectedCookies, 365);
}

function cookieBannerSaved() {
  cookieBannerDecision.hidden = true;
  cookieBannerConfirmation.hidden = false;
}

function preferenceFormSaved() {
  const message = qs('.cookie-preference-success') as HTMLInputElement;
  message.style.display = 'block';
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function cookiePreferencesUpdated(cookieStatus) {
  const dataLayer = window.dataLayer || [];
  const dtrum = window.dtrum;

  dataLayer.push({ event: 'Cookie Preferences', cookiePreferences: cookieStatus });

  if (dtrum !== undefined) {
    if (cookieStatus.apm === 'on') {
      dtrum.enable();
      dtrum.enableSessionReplay();
    } else {
      dtrum.disable();
      dtrum.disableSessionReplay();
    }
  }
}

cookieManager.init({
  'user-preference-cookie-name': 'ds-web-cookie-preferences',
  'user-preference-saved-callback': cookiePreferencesUpdated,
  'preference-form-id': 'cm-preference-form',
  'preference-form-saved-callback': preferenceFormSaved,
  'set-checkboxes-in-preference-form': true,
  'cookie-banner-id': 'cm-cookie-banner',
  'cookie-banner-visible-on-page-with-preference-form': false,
  'cookie-banner-reject-callback': cookieBannerReject,
  'cookie-banner-accept-callback': cookieBannerAccept,
  'cookie-banner-saved-callback': cookieBannerSaved,
  'cookie-banner-auto-hide': false,
  'cookie-manifest': [
    {
      'category-name': 'essential',
      optional: false,
      cookies: ['ds-web-cookie-preferences', '_oauth2_proxy', 'ajs_user_id', 'ajs_group_id', 'ajs_anonymous_id'],
    },
    {
      'category-name': 'analytics',
      optional: true,
      cookies: ['_ga', '_gid'],
    },
    {
      'category-name': 'apm',
      optional: true,
      cookies: ['dtCookie', 'dtLatC', 'dtPC', 'dtSa', 'rxVisitor', 'rxvt'],
    },
  ],
});

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    dtrum: DtrumApi;
  }
}

interface DtrumApi {
  enable(): void;
  enableSessionReplay(): void;
  disable(): void;
  disableSessionReplay(): void;
}
