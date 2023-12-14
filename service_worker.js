// Listen for the installation event
self.addEventListener('install', (event) => {
  console.log('Service worker installed:', event);
});

// Listen for the activation event
self.addEventListener('activate', (event) => {
  console.log('Service worker activated:', event);
});

// Listen for messages from the extension
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
