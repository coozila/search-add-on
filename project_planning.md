# Project Planning - Coozila! Chrome Search Extension

## 1. `manifest.json`
### Required Variables:
- `name`: Extension name (dynamic based on domain and language)
- `description`: Extension description (dynamic based on domain and language)
- `version`: Extension version (dynamic based on domain and language)
- Other details required for the manifest (icons, permissions, etc.)

## 2. `background.js`
### Required Variables:
- `currentDomain`: Current website domain
- `searchUrl`: Search URL (dynamic based on domain and language)
- Other variables required for extension logic

### Functions:
1. `updateDefaultDomain(domain)`: Function to send a message to `background.js` to update the default domain
2. `chrome.runtime.onInstalled.addListener()`: Listen for the installation event and update extension details, search settings, and icon.
3. Other functions required for extension logic.

## 3. `extension_setup.js`
### Required Variables:
- Variables for extension details (name, description, version, etc.) based on domain and language.

### Functions:
1. `chrome.runtime.onInstalled.addListener()`: Set extension details, search settings, and icon based on domain and language.

## 4. `newtab.html`
- New tab action page, including the search form and necessary styles.

## 5. `option.html`
- Extension options page where users can choose the default search engine.

## 6. `service_worker.js`
### Functions:
1. Listen for the installation event and open `newtab.html` on installation.
2. Listen for the activation event.
3. Listen for events/messages from the extension.

## 7. `planner.MD`
### Detailed Work Plan:
1. **manifest.json:**
    - Define necessary variables.
    - Configure the manifest file with correct and updated information.

2. **background.js:**
    - Define necessary variables.
    - Implement functions for extension logic.
    - Ensure correct interaction with other components.

3. **extension_setup.js:**
    - Define necessary variables.
    - Implement functions to configure the extension based on domain and language.

4. **newtab.html:**
    - Create necessary content for the new tab page, including the search form and associated styles.

5. **option.html:**
    - Create an options page where the user can select the default search engine.

6. **service_worker.js:**
    - Implement necessary functions for handling installation, activation, and extension messages.

7. **General Documentation:**
    - Write detailed documentation for each file and function.
    - Ensure that each functionality is explained and justified.

Feel free to modify or expand as needed. If you have specific requirements or adjustments, please specify.
