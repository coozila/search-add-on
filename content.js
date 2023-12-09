// content.js

// Your content script logic goes here
// This script will be injected into the specified domains
// Make sure to adjust it based on your specific requirements

console.log("Content script executed on the specified domains.");

// Example: Change the background color of the body to red on www.coozila.com
if (window.location.hostname === "www.coozila.com") {
  document.body.style.backgroundColor = "transparent";
  console.log("Welcome to Coozila! This is the red version.");
}

// Example: Change the background color of the body to blue on www.coozila.co.uk
if (window.location.hostname === "www.coozila.co.uk") {
  document.body.style.backgroundColor = "transparent";
  console.log("Welcome to Coozila UK! This is the blue version.");
}

// Example: Change the background color of the body to green on www.coozila.it
if (window.location.hostname === "www.coozila.it") {
  document.body.style.backgroundColor = "transparent";
  console.log("Benvenuto su Coozila Italia! This is the green version.");
}

// Example: Change the background color of the body to yellow on www.coozila.ro
if (window.location.hostname === "www.coozila.ro") {
  document.body.style.backgroundColor = "transparent";
  console.log("Bine ați venit la Coozila Romania! This is the yellow version.");
}

chrome.runtime.sendMessage({ action: "checkNewTabPage" }, (response) => {
  if (response && response.isNewTabPage) {
    // Sunteți pe pagina noului tab, adăugați caseta de căutare
    const searchContainer = document.createElement("div");
    searchContainer.style.position = "fixed";
    searchContainer.style.top = "50%";
    searchContainer.style.left = "50%";
    searchContainer.style.transform = "translate(-50%, -50%)";
    searchContainer.style.zIndex = "9999";
    searchContainer.innerHTML = `
      <form method="post" action="https://www.coozila.com/">
        <input type="text" name="q" />
        <input type="hidden" name="categories" value="general,social media" />
        <input type="hidden" name="lang" value="all" />
        <input type="hidden" name="locale" value="en" />
        <input type="hidden" name="time_range" value="month" />
      </form>
    `;
    
    document.body.appendChild(searchContainer);
  }
});

