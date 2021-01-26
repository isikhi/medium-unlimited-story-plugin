function removeCookie(cookie) {
  const url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`;
  browser.cookies.remove({ url, name: cookie.name });
}

chrome.cookies.onChanged.addListener((info) => {
  if (info.cookie.domain.includes('medium.com') && !info.cookie.removed) {
    removeCookie(info.cookie);
  }
});
