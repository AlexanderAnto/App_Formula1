import { initModal } from './aux.js';

let gradas = [];

function loadData() {
    const stored = localStorage.getItem('gradas');
    gradas = stored ? JSON.parse(stored) : [];
    renderTable();
    updateIdField();
}

function saveData() {
    localStorage.setItem('gradas', JSON.stringify(gradas));
}

function renderTable() {
    const tbody = document.querySelector('#gradaTable tbody');
    tbody.innerHTML = '';
    gradas.forEach(g => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = g.id;
        row.insertCell(1).textContent = g.nombre;
        const delCell = row.insertCell(2);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteGrada(g.id);
        delCell.appendChild(delBtn);
    });
}

function updateIdField() {
    const nextId = gradas.length > 0 ? Math.max(...gradas.map(g => g.id)) + 1 : 1;
    document.getElementById('gradaId').value = nextId;
}

function addGrada(nombre) {
    const newId = gradas.length > 0 ? Math.max(...gradas.map(g => g.id)) + 1 : 1;
    gradas.push({ id: newId, nombre });
    saveData();
    renderTable();
    updateIdField();
    document.getElementById('name_grada').value = '';
}

function deleteGrada(id) {
    gradas = gradas.filter(g => g.id !== id);
    saveData();
    renderTable();
    updateIdField();
}

document.getElementById('gradaForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('name_grada').value.trim();
    if (nombre) addGrada(nombre);
});

loadData();
initModal();