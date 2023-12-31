// autocomplete.js

let currentDomain;

// Ascultă mesajele de la extensie pentru a actualiza domeniul curent
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateDefaultDomain') {
    currentDomain = message.domain;
  }
});

// Obține valoarea implicită din fișierul de limbă la instalare
chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.getMessages(['defaultDomain'], (result) => {
    currentDomain = result.defaultDomain.message;

    // După ce domeniul implicit este obținut, adaugă evenimentul DOMContentLoaded
    addEventListeners();
  });
});

// Adaugă ascultătorii de evenimente după ce domeniul implicit este obținut
function addEventListeners() {
  document.addEventListener('DOMContentLoaded', function () {
    const searchQueryInput = document.getElementById('searchfield');

    if (searchQueryInput) {
      searchQueryInput.addEventListener('input', function () {
        handleAutocomplete(this.value);
      });
    }
  });
}

function handleAutocomplete(userInput) {
  // Asigură-te că domeniul curent este utilizat pentru a construi URL-ul de autocompletare
  const autocompleteUrl = `https://${currentDomain}/autocompleter?q=${userInput}`;
  
  // Realizează apelul către API-ul de autocompletare
  fetch(autocompleteUrl)
    .then(response => response.json())
    .then(data => {
      // Implementează logica de actualizare a UI-ului cu sugestiile de autocompletare
      console.log('Autocomplete suggestions:', data);
    })
    .catch(error => {
      console.error('Autocomplete request failed:', error);
    });
}
