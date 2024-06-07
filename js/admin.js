let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [0, 1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [6] },
        { searchable: false, targets: [1] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún producto encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún producto encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
    }
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listProducts();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listProducts = async () => {
    try {
        const response = await fetch("http://localhost:3000/productos"); // Asegúrate de que la URL apunte a tu endpoint backend
        const products = await response.json();

        let content = ``;
        products.forEach((product) => {
            content += `
                <tr>
                    <td>${product.id}</td>
                    <td>${product.title}</td>
                    <td>${product.precio.toFixed(2)}</td>
                    <td><img src="${product.img}" alt="${product.title}" style="width:50px;height:50px;"/></td>
                    <td>${product.stock}</td>
                    <td>${product.deleted ? '<i class="fa-solid fa-times" style="color: red;"></i>' : '<i class="fa-solid fa-check" style="color: green;"></i>'}</td>
                    <td>
                        <button class="btn btn-sm btn-primary edit-button" data-id="${product.id}"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn btn-sm btn-danger delete-button" data-id="${product.id}"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>`;
        });
        document.getElementById('tableBody_users').innerHTML = content;
        addEventListeners();
    } catch (ex) {
        alert(ex);
    }
};

const addEventListeners = () => {
    const editButtons = document.querySelectorAll('.edit-button');
    const deleteButtons = document.querySelectorAll('.delete-button');

    editButtons.forEach(button => {
        button.addEventListener('click', handleEdit);
    });

    deleteButtons.forEach(button => {
        button.addEventListener('click', handleDelete);
    });

    const addProductButton = document.getElementById('addProductButton');
    addProductButton.addEventListener('click', handleAddProduct);
};

const handleEdit = (event) => {
    const id = event.target.closest('button').dataset.id;
    // Aquí puedes abrir un formulario de edición o redirigir a una página de edición
    alert(`Editar producto con ID: ${id}`);
};

const handleDelete = (event) => {
    const id = event.target.closest('button').dataset.id;
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        deleteProduct(id);
    }
};

const deleteProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/productos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Producto eliminado con éxito');
            await initDataTable();
        } else {
            alert('Error al eliminar el producto');
        }
    } catch (ex) {
        alert('Error al eliminar el producto');
    }
};

const handleAddProduct = () => {
    // Aquí puedes mostrar un formulario modal para agregar un nuevo producto
    alert('Agregar nuevo producto');
    window.location.href = 'http://127.0.0.1:5502/pages/creacionProductos.html'; //cambiar al migrar
};

window.addEventListener("load", async () => {
    await initDataTable();
});
