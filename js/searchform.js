// searchform.js

document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchform');
    const searchQueryInput = document.getElementById('searchfield');
    const domainSelector = document.getElementById('domainSelector');
  
    if (searchForm && searchQueryInput && domainSelector) {
      searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        handleSearchFormSubmission();
      });
  
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
  
  function handleSearchFormSubmission() {
    const searchQuery = document.getElementById('searchfield').value;
    console.log('Search query submitted:', searchQuery);
    // Restul logicii...
  }
  
  function handleAutocomplete(userInput) {
    // Implementează logica pentru autocompletare
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
 
