async function getAll() {
  return browser.cookies.getAll({ domain: '.medium.com' })
}

function removeCookie(cookie) {
  const url = `http${cookie.secure ? 's' : ''}://${cookie.domain}${cookie.path}`;
  chrome.cookies.remove({ url, name: cookie.name });
}

async function removeOnStart() {
  const cookies = await getAll()
  cookies.forEach(removeCookie)
}

removeOnStart()

browser.cookies.onChanged.addListener((info) => {
  if (info.cookie.domain.includes('medium.com') && !info.removed) {
    removeCookie(info.cookie);
  }
});
