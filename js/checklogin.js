document.addEventListener('DOMContentLoaded', function() {
    const userLink = document.getElementById('user-link');
    const validUser = JSON.parse(localStorage.getItem('login_success'));

    if (validUser) {
        userLink.href = "/pages/ingreso.html"; // Cambiar el enlace a ingreso.html si el usuario está logueado
    } else {
        userLink.href = "/pages/login.html"; // Mantener el enlace a login.html si el usuario no está logueado
    }
});
