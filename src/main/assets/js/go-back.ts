import {
  CHECK_JURISDICTION,
  JURISDICTION_CONNECTION_SUMMARY,
  JURISDICTION_INTERSTITIAL_URL,
  JURISDICTION_MAY_NOT_BE_ABLE_TO,
  WHERE_YOUR_LIVES_ARE_BASED_URL,
} from '../../steps/urls';

const backLink: HTMLAnchorElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    if (document.location.pathname === JURISDICTION_INTERSTITIAL_URL) {
      document.location.pathname = CHECK_JURISDICTION;
    } else if (
      document.location.pathname === JURISDICTION_MAY_NOT_BE_ABLE_TO ||
      document.location.pathname === JURISDICTION_CONNECTION_SUMMARY
    ) {
      document.location.pathname = WHERE_YOUR_LIVES_ARE_BASED_URL;
    } else {
      history.go(-1);
    }
  };
}
