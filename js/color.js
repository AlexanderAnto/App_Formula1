import { initModal } from './aux.js';

// Gestión de colores con localStorage
let colores = [];

function loadData() {
    const stored = localStorage.getItem('colores');
    colores = stored ? JSON.parse(stored) : [];
    renderTable();
}

function saveData() {
    localStorage.setItem('colores', JSON.stringify(colores));
}

function renderTable() {
    const tbody = document.querySelector('#colorTable tbody');
    tbody.innerHTML = '';
    colores.forEach(color => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = color.id;
        const colorCell = row.insertCell(1);
        colorCell.innerHTML = `<div style="background-color:${color.nombre}; width:40px; height:20px; border-radius:5px; margin:auto;"></div> ${color.nombre}`;
        const delCell = row.insertCell(2);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteColor(color.id);
        delCell.appendChild(delBtn);
    });
}

function addColor(nombre) {
    const newId = colores.length > 0 ? Math.max(...colores.map(c => c.id)) + 1 : 1;
    colores.push({ id: newId, nombre });
    saveData();
    renderTable();
}

function deleteColor(id) {
    colores = colores.filter(c => c.id !== id);
    saveData();
    renderTable();
}

document.getElementById('colorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('colorInput');
    const nombre = input.value.trim();
    if (nombre) {
        addColor(nombre);
        input.value = '';
        document.getElementById('colorId').textContent = ''; // opcional
    }
});

loadData();
initModal();