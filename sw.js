/**
 * SW.JS - Service Worker (Gestion du Cache)
 */
const cacheName = 'v1';
const cacheAssets = [
    'index.html',
    'app.js',
    'css/style.css',
    'js/core.js',
    'manifest.json',
    'images/icon.png'
];

// Installation
self.addEventListener('install', e => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(cacheAssets);
        })
    );
});

// Activation (Nettoyage)
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Récupération des fichiers
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
