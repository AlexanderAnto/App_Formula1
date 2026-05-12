import { initModal } from './aux.js';

let gps = [];
let lugares = [];

function loadLugares() {
    const stored = localStorage.getItem('lugares');
    lugares = stored ? JSON.parse(stored) : [];
    const select = document.getElementById('listlugar');
    select.innerHTML = '<option value="">Seleccione un lugar</option>';
    lugares.forEach(l => {
        const option = document.createElement('option');
        option.value = l.id;
        option.textContent = `${l.pais} - ${l.pista}`;
        select.appendChild(option);
    });
}

function loadData() {
    const stored = localStorage.getItem('gps');
    gps = stored ? JSON.parse(stored) : [];
    renderTable();
}

function saveData() {
    localStorage.setItem('gps', JSON.stringify(gps));
}

function renderTable() {
    const tbody = document.querySelector('#tablaGplist tbody');
    tbody.innerHTML = '';
    gps.forEach(gp => {
        const lugar = lugares.find(l => l.id === gp.lugarId) || { pais: '?', pista: '?' };
        const row = tbody.insertRow();
        row.insertCell(0).textContent = gp.id;
        row.insertCell(1).textContent = `${lugar.pais} - ${lugar.pista}`;
        row.insertCell(2).textContent = gp.fecha;
        row.insertCell(3).textContent = gp.hora;
        const delCell = row.insertCell(4);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteGP(gp.id);
        delCell.appendChild(delBtn);
    });
}

function addGP(lugarId, fecha, hora) {
    const newId = gps.length > 0 ? Math.max(...gps.map(g => g.id)) + 1 : 1;
    gps.push({ id: newId, lugarId, fecha, hora });
    saveData();
    renderTable();
    document.getElementById('gpID').textContent = newId;
}

function deleteGP(id) {
    gps = gps.filter(g => g.id !== id);
    saveData();
    renderTable();
}

document.getElementById('gpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const lugarId = parseInt(document.getElementById('listlugar').value);
    const fecha = document.getElementById('dayEvent').value;
    const hora = document.getElementById('timeEvent').value;
    if (lugarId && fecha && hora) {
        addGP(lugarId, fecha, hora);
        document.getElementById('dayEvent').value = '';
        document.getElementById('timeEvent').value = '';
        document.getElementById('listlugar').value = '';
    } else {
        alert('Complete todos los campos');
    }
});

loadLugares();
loadData();
initModal();