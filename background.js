let currentDomain = 'www.coozila.com'; /* Default domain */
let searchUrl = `https://${currentDomain}/search`; /* Default URL */

/* Listen for messages from the extension */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateDefaultDomain') {
    currentDomain = message.domain;
    searchUrl = `https://${currentDomain}/search`; /* Update URL based on the new domain */

    /* Update search settings */
    chrome.settings.searchProvider.updateSearchProvider({
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
  console.log('Service worker installed:', details);
});

/* Listen for the activation event */
self.addEventListener('activate', (event) => {
  console.log('Service worker activated:', event);
});

/* Listen for messages from the extension */
self.addEventListener('message', (event) => {
  console.log('Message from extension:', event.data);
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
