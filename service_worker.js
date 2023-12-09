// service_worker.js

// Ascultați evenimentul de instalare
self.addEventListener('install', (event) => {
  console.log('Service worker installed:', event);

  // Adaugă o instrucțiune pentru a deschide `newtab.html` la instalare
  event.waitUntil(
    clients.claim()  // Preia controlul asupra tab-urilor existente
      .then(() => self.skipWaiting())  // Așteaptă ca service worker-ul să devină activ imediat
      .then(() => {
        // Deschide `newtab.html`
        return clients.openWindow('newtab.html');
      })
  );
});

// Ascultați evenimentul de activare
self.addEventListener('activate', (event) => {
  console.log('Service worker activated:', event);
});

// Ascultați evenimentul de mesaj de la extensie
self.addEventListener('message', (event) => {
  console.log('Message from extension:', event.data);
});

// background.js (or another background script)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/path/to/your/service-worker.js')
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
