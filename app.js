/**
 * APP.JS - Point d'entrée de la PWA
 */

let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// --- 1. ENREGISTREMENT ET GESTION DES MISES À JOUR ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then(reg => {
            console.log('SW enregistré.');

            // Détecter si une mise à jour est en attente
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    // Si le nouveau SW est installé, on prévient l'utilisateur
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateBar();
                    }
                });
            });
        });
    });
}

// Fonction pour afficher la bannière de mise à jour
function showUpdateBar() {
    const updateBar = document.createElement('div');
    updateBar.id = 'update-banner';
    updateBar.innerHTML = `
        <div style="position:fixed; bottom:0; left:0; width:100%; background:#3498db; color:white; padding:15px; text-align:center; z-index:10000; box-shadow: 0 -2px 10px rgba(0,0,0,0.2);">
            Une nouvelle version est disponible ! 
            <button onclick="window.location.reload()" style="margin-left:15px; padding:5px 15px; background:white; color:#3498db; border:none; border-radius:3px; cursor:pointer; font-weight:bold;">
                Mettre à jour
            </button>
        </div>
    `;
    document.body.appendChild(updateBar);
}

// --- 2. GESTION DE L'INSTALLATION ---
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (installBtn) installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt = null;
    });
});

// --- 3. GESTION DES NOTIFICATIONS ---
function demanderPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                navigator.serviceWorker.ready.then(reg => {
                    reg.showNotification('Notifications Activées !', {
                        body: 'Vous recevrez désormais nos alertes.',
                        icon: 'images/icon.png',
                        vibrate: [100, 50, 100]
                    });
                });
            }
        });
    }
}
