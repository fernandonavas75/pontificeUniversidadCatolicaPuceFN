document.getElementById('addProductForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const precio = parseFloat(document.getElementById('precio').value);
    const img = document.getElementById('img').value;
    const stock = parseInt(document.getElementById('stock').value, 10);
    const deleted = parseInt(document.getElementById('deleted').value, 10);

    const product = {
        title,
        precio,
        img,
        stock,
        deleted
    };

    try {
        const response = await fetch('http://localhost:3000/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            alert('Producto agregado con éxito');
            window.location.href = '/'; // Redirige de vuelta a la página principal o a donde prefieras
        } else {
            alert('Error al agregar el producto');
        }
    } catch (error) {
        console.error('Error al agregar el producto:', error);
        alert('Error al agregar el producto');
    }
});
