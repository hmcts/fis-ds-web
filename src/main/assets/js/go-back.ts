import { CHECK_JURISDICTION } from '../../steps/urls';

const backLink: HTMLAnchorElement | null = document.querySelector('.govuk-back-link');
if (backLink) {
  backLink.onclick = function (e) {
    e.preventDefault();
    if (document.location.pathname === CHECK_JURISDICTION) {
      document.location.pathname = CHECK_JURISDICTION;
    } else {
      history.go(-1);
    }
  };
}
