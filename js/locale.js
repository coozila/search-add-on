
  // locale.js

// Obține limbajul browser-ului
const browserLanguage = chrome.i18n.getUILanguage();

// Inițializare cu domeniul implicit și limba implicită doar dacă nu au fost setate manual
if (!currentDomain) {
  currentDomain = getDefaultDomain();
}

if (!searchUrl) {
  searchUrl = `https://${currentDomain}/search`; /* Default URL */
}

// Obțineți elementul de selectare și elementele ascunse pentru limbă și locale
const languageSelector = document.getElementById('languageSelector');
const languageInput = document.getElementById('languageInput');
const localeInput = document.getElementById('localeInput');

// Adăugați un eveniment pentru schimbarea limbii în elementul de selectare
languageSelector.addEventListener('change', function() {
  // Actualizați valorile câmpurilor ascunse în funcție de limba selectată
  const selectedLanguage = languageSelector.value;
  languageInput.value = selectedLanguage;

  // Actualizați valoarea implicită a localeInput în funcție de limba selectată
  // Acesta poate fi actualizat în mod corespunzător pe baza logicii aplicației dvs.
  // De exemplu, dacă selectați "All", alegeți o limbă implicită potrivită.
  if (selectedLanguage === 'all') {
    localeInput.value = 'default_locale';
  } else {
    // Alegeți valoarea corespunzătoare limbii selectate
    // Exemplu: pentru engleză, setați la "en"
    localeInput.value = selectedLanguage;
  }
});

document.addEventListener('DOMContentLoaded', function () {
    const searchField = document.getElementById('searchfield');
  
    if (searchField) {
      searchField.addEventListener('focus', clearPlaceholder);
      searchField.addEventListener('input', function () {
        handleAutocomplete(this.value);
      });
    }
});

document.getElementById('languageSelector').addEventListener('change', function () {
  // Obține valoarea selectată (codul limbii)
  var selectedLanguage = this.value;
  
  // Actualizează input-ul ascuns cu valoarea limbii selectate
  document.getElementById('localeInput').value = selectedLanguage;
});