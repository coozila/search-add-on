// options.js

// Obțineți limbajul browser-ului
const browserLanguage = chrome.i18n.getUILanguage();

// Definește variabila domains în funcție de limbă
let domains = {
  "en": "www.coozila.com",
  "en-gb": "www.coozila.co.uk",
  "it": "www.coozila.it",
  "ro": "www.coozila.ro",
  // Alte limbi și domenii
};

// Verifică dacă limbajul browser-ului există în domenii
const currentDomain = domains.hasOwnProperty(browserLanguage) ? domains[browserLanguage] : domains["en"];

// Trimite mesaj la background.js pentru a actualiza domeniul implicit
chrome.runtime.sendMessage({ action: 'updateDefaultDomain', domain: currentDomain });
