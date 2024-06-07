/*
const loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const validUser = Users.find(user => user.email === email && user.password === password)
    if(!validUser){
        return alert('Usuario y/o contraseña incorrectos!')
    }
    alert(`Bienvenido ${validUser.name}`)
    localStorage.setItem('login_success', JSON.stringify(validUser))
    window.location.href = 'ingreso.html'

})
*/

document.querySelector('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: email, // Usar email como user
                password: password
            })
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            localStorage.setItem('token', data.token);
            window.location.href = 'ingreso.html';
        } else {
            alert(data.message || 'Error en el login');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el login');
    }
});
