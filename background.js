let currentDomain; /* Default domain */

// Funcție pentru a obține domeniul implicit din messages.json
function getDefaultDomain() {
  const defaultDomainMessage = chrome.i18n.getMessage('defaultDomain');
  if (defaultDomainMessage) {
    return defaultDomainMessage;
  }
  return 'www.coozila.com'; // Dacă nu se găsește mesajul, folosește o valoare implicită
}

// Inițializare cu domeniul implicit
currentDomain = getDefaultDomain();
let searchUrl = `https://${currentDomain}/search`; /* Default URL */

/* Listen for messages from the extension */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateDefaultDomain') {
    currentDomain = message.domain;
    searchUrl = `https://${currentDomain}/search`; /* Update URL based on the new domain */

    /* Update search settings */
    chrome.runtime.updateSearchProvider({
      is_default: true,
      search_url: searchUrl,
      search_form: searchUrl + "?q={searchTerms}",
      search_url_get_params: "q={searchTerms}",
      suggest_url: searchUrl + "/autocompleter?q={searchTerms}",
      suggest_url_get_params: "q={searchTerms}"
    });

    /* Set extension icon */
    chrome.browserAction.setIcon({
      path: {
        "16": "coozila-icon-16.png",
        "32": "coozila-icon-32.png",
        "48": "coozila-icon-48.png",
        "128": "coozila-icon-128.png"
      }
    });

    /* Update URL for extension updates */
    const updateUrl = "https://addons.coozila.com/chrome-updates.xml";
    chrome.runtime.setUpdateUrlData({
      "update_url": updateUrl
    });

    /* Add conditions for the new tab */
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { urlMatches: 'chrome://newtab/' },
        })],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  }
});

/* Listen for the installation event */
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details);
});

/* Listen for the activation event */
chrome.runtime.onStartup.addListener(() => {
  console.log('Extension activated.');
});

/* Listen for messages from the extension */
chrome.runtime.onMessage.addListener((message) => {
  console.log('Message from extension:', message);
});

// Register the service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
      return registration;
    })
    .then((registration) => {
      // Check if there is a waiting service worker
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      // Check if there is a service worker in the 'installing' state
      if (registration.installing) {
        registration.installing.postMessage({ type: 'SKIP_WAITING' });
      }
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
