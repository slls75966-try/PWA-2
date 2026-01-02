// 1. Nom du cache et fichiers à mettre en cache
const cacheName = 'v1'; // Changez ceci en 'v2', 'v3', etc. pour forcer la mise à jour
const cacheAssets = [
    'index.html',
    'app.js',
    'css/style.css',
    'js/core.js',
    'manifest.json',
    'images/icon.png'
];

// 2. Événement d'installation : Mise en cache des fichiers
self.addEventListener('install', e => {
    console.log('Service Worker: Installation...');
    self.skipWaiting(); // Force le nouveau SW à s'activer sans attendre
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log('Service Worker: Mise en cache des fichiers actuels');
            return cache.addAll(cacheAssets);
        })
    );
});

// 3. Événement d'activation : Nettoyage des anciens caches
self.addEventListener('activate', e => {
    console.log('Service Worker: Activation et nettoyage...');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Suppression du vieux cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 4. Stratégie de réseau : Récupération depuis le cache
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            // Retourne le fichier du cache s'il existe, sinon fait une requête réseau
            return response || fetch(e.request);
        })
    );
});

// 5. Gestion des notifications (clic sur la notification)
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(
        clients.openWindow('/') // Ouvre votre application lors du clic
    );
});
