// extension_setup.js

const currentDomain = window.location.hostname;
const userLanguage = navigator.language || navigator.userLanguage;

let extensionName, searchUrl, iconPath, updateUrl, description, version;

// Set extension details based on domain and language
if (currentDomain === "www.coozila.com" && userLanguage.startsWith("en")) {
  extensionName = "Coozila!";
  searchUrl = "https://www.coozila.com/search";
  iconPath = "coozila-icon-128.png";
  description = "Coozila! is a privacy-oriented search engine. Visitors are not tracked.";
  version = "1.0";
  updateUrl = "https://addons.coozila.com/chrome-updates.xml";
} else if (currentDomain === "www.coozila.co.uk" && userLanguage.startsWith("en")) {
  extensionName = "Coozila! UK";
  searchUrl = "https://www.coozila.co.uk/search";
  iconPath = "coozila-uk-icon-128.png";
  description = "Coozila! UK is a privacy-oriented search engine. Visitors are not tracked.";
  version = "1.0";
  updateUrl = "https://addons.coozila.com/chrome-updates.xml";
} else if (currentDomain === "www.coozila.it" && userLanguage.startsWith("it")) {
  extensionName = "Coozila Italia";
  searchUrl = "https://www.coozila.it/search";
  iconPath = "coozila-italia-icon-128.png";
  description = "Coozila Italia è un motore di ricerca orientato alla privacy. I visitatori non vengono tracciati.";
  version = "1.0";
  updateUrl = "https://addons.coozila.com/chrome-updates.xml"; // Adjust for Firefox and Opera
} else if (currentDomain === "www.coozila.ro" && userLanguage.startsWith("ro")) {
  extensionName = "Coozila! Romania";
  searchUrl = "https://www.coozila.ro/search";
  iconPath = "coozila-romania-icon-128.png";
  description = "Coozila! Romania este un motor de căutare axat pe confidențialitate. Vizitatorii nu sunt urmăriți.";
  version = "1.0";
  updateUrl = "https://addons.coozila.com/chrome-updates.xml"; // Adjust for Firefox and Opera
} else {
  // Default case or other languages/domains
  extensionName = "Coozila!";
  searchUrl = "https://www.coozila.com/search";
  iconPath = "coozila-icon-128.png";
  description = "Coozila! is a privacy-focused search engine. Visitors are not tracked.";
  version = "1.0";
  updateUrl = "https://addons.coozila.com/chrome-updates.xml"; // Adjust for Firefox and Opera
}

chrome.runtime.onInstalled.addListener(() => {
  // Set extension details directly in manifest
  chrome.runtime.setManifest({
    name: extensionName,
    description: description,
    version: version,
  });

  // Update search settings
  chrome.settings.searchProvider.updateSearchProvider({
    name: extensionName,
    search_url: searchUrl,
    search_form: searchUrl + "?q={searchTerms}",
    search_url_get_params: "q={searchTerms}",
    suggest_url: searchUrl + "/autocompleter?q={searchTerms}",
    suggest_url_get_params: "q={searchTerms}"
  });

  // Set extension icon
  chrome.browserAction.setIcon({
    path: {
      "16": "coozila-icon-16.png",
      "32": "coozila-icon-32.png",
      "48": "coozila-icon-48.png",
      "128": iconPath
    }
  });

  // Update URL for extension updates
  chrome.runtime.setUpdateUrlData({
    "update_url": updateUrl
  });

  // Update search settings
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: currentDomain },
      })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
