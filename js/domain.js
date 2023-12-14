// domain.js

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
