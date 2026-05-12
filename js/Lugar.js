import { initModal } from './aux.js';

let lugares = [];

function loadData() {
    const stored = localStorage.getItem('lugares');
    lugares = stored ? JSON.parse(stored) : [];
    renderTable();
}

function saveData() {
    localStorage.setItem('lugares', JSON.stringify(lugares));
}

function renderTable() {
    const tbody = document.querySelector('#lugarTable tbody');
    tbody.innerHTML = '';
    lugares.forEach(l => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = l.id;
        row.insertCell(1).textContent = l.pais;
        row.insertCell(2).textContent = l.pista;
        const delCell = row.insertCell(3);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteLugar(l.id);
        delCell.appendChild(delBtn);
    });
}

function addLugar(pais, pista) {
    const newId = lugares.length > 0 ? Math.max(...lugares.map(l => l.id)) + 1 : 1;
    lugares.push({ id: newId, pais, pista });
    saveData();
    renderTable();
    document.getElementById('lugarId').textContent = newId;
}

function deleteLugar(id) {
    lugares = lugares.filter(l => l.id !== id);
    saveData();
    renderTable();
}

document.getElementById('lugarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const pais = document.getElementById('name_pais').value.trim();
    const pista = document.getElementById('PistaEvento').value.trim();
    if (pais && pista) {
        addLugar(pais, pista);
        document.getElementById('name_pais').value = '';
        document.getElementById('PistaEvento').value = '';
    }
});

loadData();
initModal();