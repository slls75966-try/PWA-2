let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// 1. Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA : Service Worker enregistré avec succès !'))
            .catch(err => console.log('PWA : Erreur d\'enregistrement du SW', err));
    });
}

// 2. Gestion de l'installation (Bouton personnalisé)
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('PWA : Utilisateur a accepté l\'installation');
            }
            deferredPrompt = null;
        });
    });
});

// 3. Gestion des Notifications
function demanderPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notifications autorisées');
                afficherNotificationTest();
            }
        });
    }
}

function afficherNotificationTest() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification('Notifications Activées !', {
                body: 'Votre PWA peut maintenant vous envoyer des alertes.',
                icon: 'images/icon.png',
                vibrate: [100, 50, 100],
                badge: 'images/icon.png'
            });
        });
    }
}
