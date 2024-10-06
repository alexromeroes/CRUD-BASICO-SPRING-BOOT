// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crudForm');
    const tableBody = document.querySelector('#crudTable tbody');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('autor').value;
        const email = document.getElementById('titulo').value;

        const response = await fetch('http://127.0.0.1:8080/api/libro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ autor, titulo })
        });

        if (response.ok) {
            loadTable();
            form.reset();
        }
    });

    async function loadTable() {
        const response = await fetch('http://127.0.0.1:8080/api/libros');
        const data = await response.json();
        tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.autor}</td>
                <td>${item.titulo}</td>
                <td>
                    <button onclick="editItem(${item.id})">Editar</button>
                    <button onclick="deleteItem(${item.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editItem = async (id) => {
        // Lógica para editar un ítem
    };

    window.deleteItem = async (id) => {
        const response = await fetch(`http://127.0.0.1:8080/api/libros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadTable();
        }
    };

    loadTable();
});