let deferredPrompt;
const installBtn = document.getElementById('installBtn');

// 1. Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('SW enregistré !'))
            .catch(err => console.log('Erreur SW:', err));
    });
}

// 2. Capture de l'événement d'installation
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';

    installBtn.addEventListener('click', () => {
        installBtn.style.display = 'none';
        deferredPrompt.prompt();
    });
});
