// service_worker.js

// Ascultați evenimentul de instalare
self.addEventListener('install', (event) => {
  console.log('Service worker installed:', event);
});

// Ascultați evenimentul de activare
self.addEventListener('activate', (event) => {
  console.log('Service worker activated:', event);
});

// Ascultați evenimentul de mesaj de la extensie
self.addEventListener('message', (event) => {
  console.log('Message from extension:', event.data);
});
