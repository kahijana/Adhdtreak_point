// Service Worker for STREAK PWA
const CACHE_VERSION = 'v2';
const CACHE_NAME = `streak-${CACHE_VERSION}`;

// Static assets to pre-cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-maskable-512.png'
];

// Install event - pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Installation complete, skipping waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME)
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Activation complete, claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache First strategy for static assets
  if (isStaticAsset(url)) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetchAndCache(request);
        })
        .catch(() => {
          // Return offline fallback for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        })
    );
    return;
  }

  // Network First for dynamic content/API calls
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        return fetchAndCache(request, networkResponse.clone());
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Helper: Check if URL is a static asset
function isStaticAsset(url) {
  const pathname = url.pathname;
  return STATIC_ASSETS.some(asset => 
    pathname === asset || pathname.endsWith(asset)
  );
}

// Helper: Fetch and cache response
async function fetchAndCache(request, response = null) {
  try {
    const res = response || await fetch(request);
    if (res && res.status === 200 && res.type === 'basic') {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, res.clone());
    }
    return res;
  } catch (error) {
    console.log('[SW] Fetch failed:', error);
    return null;
  }
}

// Background Sync for pending data writes (optional enhancement)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-streak-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Placeholder for background sync logic
  console.log('[SW] Background sync triggered');
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
