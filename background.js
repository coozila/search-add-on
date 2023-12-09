/* background.js */

let currentDomain = 'www.coozila.com'; /* Domeniul implicit */
let searchUrl = `https://${currentDomain}/search`; /* URL-ul implicit */

/* Ascultăm mesajele de la opțiunile de extensie */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateDefaultDomain') {
    currentDomain = message.domain;
    searchUrl = `https://${currentDomain}/search`; /* Actualizăm URL-ul în funcție de noul domeniu */

    /* Actualizare setări de căutare */
    chrome.settings.searchProvider.updateSearchProvider({
      is_default: true,
      search_url: searchUrl,
      search_form: searchUrl + "?q={searchTerms}",
      search_url_get_params: "q={searchTerms}",
      suggest_url: searchUrl + "/autocompleter?q={searchTerms}",
      suggest_url_get_params: "q={searchTerms}"
    });

    /* Setare iconiță extensie */
    chrome.browserAction.setIcon({
      path: {
        "16": "coozila-icon-16.png",
        "32": "coozila-icon-32.png",
        "48": "coozila-icon-48.png",
        "128": "coozila-icon-128.png"
      }
    });

    /* Actualizare URL pentru actualizări extensie */
    const updateUrl = "https://addons.coozila.com/chrome-updates.xml";
    chrome.runtime.setUpdateUrlData({
      "update_url": updateUrl
    });

    /* Adaugă condiții pentru noul tab */
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlMatches: 'chrome://newtab/' },
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    });
  }
});

/* Ascultați evenimentul de instalare */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Service worker installed:', details);

  /* Preia controlul asupra tab-urilor existente și așteaptă ca service worker-ul să devină activ imediat */
  clients.claim().then(() => {
    self.skipWaiting();
  });
});

/* Ascultați evenimentul de activare */
self.addEventListener('activate', (event) => {
  console.log('Service worker activated:', event);
});

/* Ascultați evenimentul de mesaj de la extensie */
self.addEventListener('message', (event) => {
  console.log('Message from extension:', event.data);
});

/* Înregistrează service worker-ul */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('background.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
