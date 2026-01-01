const cacheName = 'v1.0';
const cacheAssets = [
    'index.html',
    'app.js',
    'css/style.css',
    'js/core.js',
    'manifest.json',
    'images/icon.png'
];

// Installation : Mise en cache des fichiers
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Mise en cache des fichiers...');
            return cache.addAll(cacheAssets);
        })
    );
});

// Stratégie : Répondre avec le cache, sinon chercher sur le réseau
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
