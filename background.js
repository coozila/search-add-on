/* background.js */

let currentDomain = 'www.coozila.com'; 
let searchUrl = `https://${currentDomain}/search`;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateDefaultDomain') {
    currentDomain = message.domain;
    searchUrl = `https://${currentDomain}/search`; /* Actualizăm URL-ul în funcție de noul domeniu */

    chrome.settings.searchProvider.updateSearchProvider({
      is_default: true,
      search_url: searchUrl,
      search_form: searchUrl + "?q={searchTerms}",
      search_url_get_params: "q={searchTerms}",
      suggest_url: searchUrl + "/autocompleter?q={searchTerms}",
      suggest_url_get_params: "q={searchTerms}"
    });

    chrome.browserAction.setIcon({
      path: {
        "16": "coozila-icon-16.png",
        "32": "coozila-icon-32.png",
        "48": "coozila-icon-48.png",
        "128": "coozila-icon-128.png"
      }
    });

    const updateUrl = "https://addons.coozila.com/chrome-updates.xml";
    chrome.runtime.setUpdateUrlData({
      "update_url": updateUrl
    });

chrome.declarativeContent.onPageChanged.addRules([
  {
    conditions: [
      new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlMatches: 'chrome://newtab/' },
      }),
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()],
  },
]);