// Cacher le loader une fois la page chargée
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
});

// Fonction de test
function saluer() {
    document.getElementById('message').innerText = "🚀 Application réactive et prête !";
}
