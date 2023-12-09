// content.js

// Your content script logic goes here
// This script will be injected into the specified domains
// Make sure to adjust it based on your specific requirements

console.log("Content script executed on the specified domains.");

// Example: Change the background color of the body to red on www.coozila.com
if (window.location.hostname === "www.coozila.com") {
  document.body.style.backgroundColor = "red";
  console.log("Welcome to Coozila! This is the red version.");
}

// Example: Change the background color of the body to blue on www.coozila.co.uk
if (window.location.hostname === "www.coozila.co.uk") {
  document.body.style.backgroundColor = "blue";
  console.log("Welcome to Coozila UK! This is the blue version.");
}

// Example: Change the background color of the body to green on www.coozila.it
if (window.location.hostname === "www.coozila.it") {
  document.body.style.backgroundColor = "green";
  console.log("Benvenuto su Coozila Italia! This is the green version.");
}

// Example: Change the background color of the body to yellow on www.coozila.ro
if (window.location.hostname === "www.coozila.ro") {
  document.body.style.backgroundColor = "yellow";
  console.log("Bine ați venit la Coozila Romania! This is the yellow version.");
}

// Add similar logic for other domains as needed
