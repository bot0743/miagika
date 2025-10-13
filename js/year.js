// Автоматическая замена года в копирайте
document.addEventListener('DOMContentLoaded', function() {
    const copyrightElement = document.querySelector('.copyright p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('{year}', new Date().getFullYear());
    }
});
