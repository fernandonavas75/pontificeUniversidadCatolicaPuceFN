/*
const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value

    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        return alert('El usuario ya esta registado!')
    }

    Users.push({name: name, email: email, password: password})
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro Exitoso!')
    window.location.href = 'login.html'

})
    */
document.querySelector('#signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
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
            window.location.href = 'login.html';
        } else {
            alert(data.error || 'Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error en el registro');
    }
});
