// domain.js
const domains = {
    "USA": { country: "USA", language: "en", domain: "www.coozila.com" },
    "France": { country: "France", language: "fr", domain: "www.coozila.fr" },
    "Germany": { country: "Germany", language: "de", domain: "www.coozila.de" },
    "Italy": { country: "Italy", language: "it", domain: "www.coozila.it" },
    "Romania": { country: "Romania", language: "ro", domain: "www.coozila.ro" },
    "United Kingdom": { country: "United Kingdom", language: "en-gb", domain: "www.coozila.co.uk" },
    // alte limbi și domenii aici...
  };
  
  let currentDomain;
  
  // Ascultă mesajele de la extensie pentru a actualiza domeniul curent
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateDefaultDomain') {
      currentDomain = message.domain;
    }
  });
  
  // Obține valoarea implicită din fișierul de limbă
  chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.getMessages(['defaultDomain'], (result) => {
      currentDomain = result.defaultDomain.message;
    });
  });
  