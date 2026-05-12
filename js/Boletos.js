import { initModal } from './aux.js';

let boletos = [];
let colores = [];
let gradas = [];
let gps = [];

function loadDependencies() {
    // Cargar colores
    const storedColors = localStorage.getItem('colores');
    colores = storedColors ? JSON.parse(storedColors) : [];
    const colorSelect = document.getElementById('selectcolor');
    colorSelect.innerHTML = '<option value="">Seleccione un color</option>';
    colores.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.textContent = c.nombre;
        colorSelect.appendChild(opt);
    });

    // Cargar gradas
    const storedGradas = localStorage.getItem('gradas');
    gradas = storedGradas ? JSON.parse(storedGradas) : [];
    const gradaSelect = document.getElementById('selectgrada');
    gradaSelect.innerHTML = '<option value="">Seleccione una grada</option>';
    gradas.forEach(g => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = g.nombre;
        gradaSelect.appendChild(opt);
    });

    // Cargar GP
    const storedGPs = localStorage.getItem('gps');
    gps = storedGPs ? JSON.parse(storedGPs) : [];
    const gpSelect = document.getElementById('selectgp');
    gpSelect.innerHTML = '<option value="">Seleccione un GP</option>';
    gps.forEach(gp => {
        const opt = document.createElement('option');
        opt.value = gp.id;
        opt.textContent = `GP #${gp.id} - ${gp.fecha}`;
        gpSelect.appendChild(opt);
    });
}

function loadData() {
    const stored = localStorage.getItem('boletos');
    boletos = stored ? JSON.parse(stored) : [];
    renderTable();
}

function saveData() {
    localStorage.setItem('boletos', JSON.stringify(boletos));
}

function renderTable() {
    const tbody = document.querySelector('#boletoTable tbody');
    tbody.innerHTML = '';
    boletos.forEach(b => {
        const color = colores.find(c => c.id === b.colorId) || { nombre: '?' };
        const grada = gradas.find(g => g.id === b.gradaId) || { nombre: '?' };
        const gp = gps.find(g => g.id === b.gpId) || { id: '?' };
        const row = tbody.insertRow();
        row.insertCell(0).textContent = b.id;
        row.insertCell(1).textContent = b.precio;
        row.insertCell(2).textContent = color.nombre;
        row.insertCell(3).textContent = grada.nombre;
        row.insertCell(4).textContent = `GP #${gp.id}`;
        const delCell = row.insertCell(5);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Eliminar';
        delBtn.className = 'delete-btn';
        delBtn.onclick = () => deleteBoleto(b.id);
        delCell.appendChild(delBtn);
    });
}

function addBoleto(precio, colorId, gradaId, gpId) {
    const newId = boletos.length > 0 ? Math.max(...boletos.map(b => b.id)) + 1 : 1;
    boletos.push({ id: newId, precio, colorId, gradaId, gpId });
    saveData();
    renderTable();
    document.getElementById('boletoId').textContent = newId;
}

function deleteBoleto(id) {
    boletos = boletos.filter(b => b.id !== id);
    saveData();
    renderTable();
}

document.getElementById('boletoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const precio = parseFloat(document.getElementById('boletoPrecio').value);
    const colorId = parseInt(document.getElementById('selectcolor').value);
    const gradaId = parseInt(document.getElementById('selectgrada').value);
    const gpId = parseInt(document.getElementById('selectgp').value);
    if (precio && colorId && gradaId && gpId) {
        addBoleto(precio, colorId, gradaId, gpId);
        document.getElementById('boletoPrecio').value = '';
        document.getElementById('selectcolor').value = '';
        document.getElementById('selectgrada').value = '';
        document.getElementById('selectgp').value = '';
    } else {
        alert('Complete todos los campos');
    }
});

loadDependencies();
loadData();
initModal();