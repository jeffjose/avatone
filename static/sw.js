// Avatone Service Worker - Super aggressive caching for avatars
const CACHE_NAME = 'avatone-v1';
const AVATAR_CACHE = 'avatone-avatars-v1';

// Cache avatar responses for offline use and instant loading
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Only cache GET requests to our avatar endpoints
  if (event.request.method === 'GET' && 
      url.pathname.startsWith('/avatar/')) {
    
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch and cache
        return fetch(event.request).then((response) => {
          // Don't cache error responses
          if (!response || response.status !== 200) {
            return response;
          }
          
          // Clone the response since it can only be consumed once
          const responseToCache = response.clone();
          
          caches.open(AVATAR_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return response;
        });
      })
    );
  }
});

// Clean up old caches on activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== AVATAR_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});