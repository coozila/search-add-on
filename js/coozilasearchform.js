// coozilasearchform.js

document.addEventListener('DOMContentLoaded', function () {
  const searchQueryInput = document.getElementById('searchfield');
  const domainSelector = document.getElementById('domainSelector');

  if (searchQueryInput && domainSelector) {
    searchQueryInput.addEventListener('focus', function () {
      clearPlaceholder();
    });

    searchQueryInput.addEventListener('input', function () {
      handleAutocomplete(this.value);
    });

    domainSelector.addEventListener('change', function () {
      updateDefaultDomain();
    });

    populateDomainOptions();
  }
});

function clearPlaceholder() {
  // Implementează logica pentru a șterge placeholder-ul
  // Exemplu: document.getElementById('searchfield').placeholder = '';
}

function handleAutocomplete(userInput) {
  // Implementează logica pentru autocomplete
  console.log('User input:', userInput);
  // Restul logicii...
}

function updateDefaultDomain() {
  const selectedDomain = document.getElementById('domainSelector').value;
  chrome.runtime.sendMessage({ action: 'updateDefaultDomain', domain: selectedDomain });
}

function populateDomainOptions() {
  const selectElement = document.getElementById('domainSelector');

  // Adaugă opțiuni la elementul select
  for (const lang in domains) {
    const optionElement = document.createElement('option');
    optionElement.value = domains[lang];
    optionElement.text = lang;
    selectElement.appendChild(optionElement);
  }
}
