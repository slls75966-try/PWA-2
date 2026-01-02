// Cacher le loader une fois la page chargée
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 500);
});

// 2. Fonction de test simple
function saluer() {
    const messageElement = document.getElementById('message');
    messageElement.innerHTML = "✨ L'application répond parfaitement !";
    messageElement.style.color = "#27ae60";
}
