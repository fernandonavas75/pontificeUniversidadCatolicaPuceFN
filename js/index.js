/*
const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

const logout = document.querySelector('#logout')

logout.addEventListener('click', ()=>{
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})
    */
document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcome-message');
    const logoutButton = document.getElementById('logout');

    // Verificar si el token está presente en localStorage
    const token = localStorage.getItem('token');
    console.log('Stored Token:', token); // refactorización //
    if (!token) {
        alert('No estás autenticado. Redirigiendo al login...');
        window.location.href = 'login.html';
    } else {
        // Hacer una solicitud al backend para obtener la información del usuario
        fetch('http://localhost:3000/auth/user-info', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('Token inválido o expirado. Redirigiendo al login...');
                localStorage.removeItem('token');
                window.location.href = 'login.html';
            } else {
                welcomeMessage.textContent = `Hola, ${data.user}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error al obtener la información del usuario. Redirigiendo al login...');
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }

    // Manejar el cierre de sesión
    logoutButton.addEventListener('click', () => {
        alert('Hasta pronto!');
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    });
});
