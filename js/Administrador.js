import { cambioVentana } from './aux.js';

let admins = [];

function loadData() {
    const stored = localStorage.getItem('administradores');
    admins = stored ? JSON.parse(stored) : [];
    renderTable();
}

function saveData() {
    localStorage.setItem('administradores', JSON.stringify(admins));
}

function renderTable() {
    const tbody = document.querySelector('#adminTable tbody');
    tbody.innerHTML = '';
    admins.forEach(a => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = a.id;
        row.insertCell(1).textContent = a.nombre;
        row.insertCell(2).textContent = a.password;
        const delCell = row.insertCell(3);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteAdmin(a.id);
        delCell.appendChild(delBtn);
    });
}

function addAdmin(nombre, password) {
    const newId = admins.length > 0 ? Math.max(...admins.map(a => a.id)) + 1 : 1;
    admins.push({ id: newId, nombre, password });
    saveData();
    renderTable();
    document.getElementById('adminId').textContent = newId;
}

function deleteAdmin(id) {
    admins = admins.filter(a => a.id !== id);
    saveData();
    renderTable();
}

document.getElementById('adminForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('adminNombre').value.trim();
    const password = document.getElementById('adminPass').value.trim();
    if (nombre && password) {
        addAdmin(nombre, password);
        document.getElementById('adminNombre').value = '';
        document.getElementById('adminPass').value = '';
    }
});

loadData();
initModal();