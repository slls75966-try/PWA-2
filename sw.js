/**
 * SW.JS - Service Worker (Gestion du Cache)
 */

// CHANGEZ LA VERSION ICI À CHAQUE MODIFICATION (ex: v1, v2, v3...)
const cacheName = 'v3.1'; 

const cacheAssets = [
    'index.html',
    'app.js',
    'css/style.css',
    'js/core.js',
    'manifest.json',
    'images/icon.png'
];

// Installation : Téléchargement des fichiers
self.addEventListener('install', e => {
    console.log('SW: Installation...');
    // Force le nouveau SW à prendre le contrôle immédiatement
    self.skipWaiting(); 
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll(cacheAssets);
        })
    );
});

// Activation : Nettoyage des vieux caches
self.addEventListener('activate', e => {
    console.log('SW: Activation et nettoyage...');
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

// Fetch : Stratégie Cache First (Cache en priorité)
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});

// Clic sur notification
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(clients.openWindow('/'));
});
