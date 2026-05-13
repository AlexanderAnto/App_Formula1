// ApiCOntroler.js

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del formulario
    const form = document.getElementById('newUserForm');
    const countriesSelect = document.getElementById('paises');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Contenedor de mensajes
    let messageContainer = document.getElementById('form-message');
    if (!messageContainer) {
        messageContainer = document.createElement('div');
        messageContainer.id = 'form-message';
        messageContainer.style.marginTop = '15px';
        messageContainer.style.padding = '10px';
        messageContainer.style.borderRadius = '5px';
        form.insertAdjacentElement('afterend', messageContainer);
    }

    // --- Clave para localStorage ---
    const STORAGE_KEY = 'usuarios_registrados';

    // --- Cargar países desde API ---
    async function loadCountries() {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
            if (!response.ok) throw new Error('Error al cargar países');
            const countries = await response.json();
            countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name.common;
                option.textContent = country.name.common;
                countriesSelect.appendChild(option);
            });
        } catch (error) {
            console.error(error);
            messageContainer.textContent = 'No se pudieron cargar los países. Recarga la página.';
            messageContainer.style.backgroundColor = '#f8d7da';
            messageContainer.style.color = '#721c24';
        }
    }

    // --- Validaciones ---
    function validatePasswords() {
        const password = passwordInput.value;
        const confirm = confirmPasswordInput.value;
        if (password !== confirm) return 'Las contraseñas no coinciden';
        if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return null;
    }

    function validateTerms() {
        const checkbox = form.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) return 'Debes aceptar los términos y condiciones';
        return null;
    }

    // --- Guardar usuario en localStorage ---
    function saveUserToLocalStorage(userData) {
        // Obtener usuarios existentes (o array vacío)
        let usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        // Agregar nuevo usuario
        usuarios.push(userData);
        // Guardar de nuevo
        localStorage.setItem(STORAGE_KEY, JSON.stringify(usuarios));
    }

    // --- Exportar todos los usuarios a CSV (y descargar archivo) ---
    function exportToCSV() {
        const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        if (usuarios.length === 0) {
            alert('No hay usuarios registrados para exportar.');
            return;
        }

        // Definir columnas (mismo orden que en el formulario)
        const headers = ['Nombre', 'Apellido', 'Email', 'Teléfono', 'Dirección', 'País', 'Contraseña'];
        
        // Crear filas
        const rows = usuarios.map(user => [
            user.name,
            user.apellido,
            user.email,
            user.telefono,
            user.direccion || '',
            user.paises,
            user.password
        ]);

        // Unir todo con saltos de línea y comas (escapar si hay comas internas)
        const escapeCSV = (str) => {
            if (str === undefined || str === null) return '';
            if (str.includes(',') || str.includes('"') || str.includes('\n')) {
                return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
        };

        const csvContent = [
            headers.map(escapeCSV).join(','),
            ...rows.map(row => row.map(escapeCSV).join(','))
        ].join('\n');

        // Descargar archivo
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.setAttribute('download', 'usuarios_registrados.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // --- Opcional: Exportación automática al registrar (comentar si no se desea) ---
    // Para que cada nuevo usuario actualice el archivo CSV automáticamente,
    // bastaría con llamar a exportToCSV() después de saveUserToLocalStorage().
    // Pero cuidado: sobrescribiría el CSV anterior en el disco, pero la mayoría de navegadores
    // pedirán permiso para múltiples descargas. Por eso lo dejo como función separada.

    // --- Botón para exportar CSV manualmente ---
    function addExportButton() {
        const exportBtn = document.createElement('button');
        exportBtn.textContent = 'Exportar usuarios a CSV';
        exportBtn.type = 'button';
        exportBtn.style.marginTop = '10px';
        exportBtn.style.padding = '8px 12px';
        exportBtn.style.cursor = 'pointer';
        exportBtn.addEventListener('click', exportToCSV);
        form.insertAdjacentElement('afterend', exportBtn);
    }

    // --- Manejar envío del formulario (registro local) ---
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        // Limpiar mensaje previo
        messageContainer.textContent = '';
        
        // Validar
        const pwdError = validatePasswords();
        if (pwdError) {
            messageContainer.textContent = pwdError;
            messageContainer.style.backgroundColor = '#f8d7da';
            messageContainer.style.color = '#721c24';
            return;
        }
        
        const termsError = validateTerms();
        if (termsError) {
            messageContainer.textContent = termsError;
            messageContainer.style.backgroundColor = '#f8d7da';
            messageContainer.style.color = '#721c24';
            return;
        }
        
        // Recoger datos
        const formData = new FormData(form);
        const userData = {
            name: formData.get('name'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            telefono: formData.get('telefono'),
            direccion: formData.get('direccion') || '',
            paises: formData.get('paises'),
            password: formData.get('password')
        };
        
        // Guardar en localStorage
        saveUserToLocalStorage(userData);
        
        // Mostrar éxito
        messageContainer.textContent = '¡Usuario registrado correctamente (guardado localmente)!';
        messageContainer.style.backgroundColor = '#d4edda';
        messageContainer.style.color = '#155724';
        
        // Resetear formulario (excepto el select de países, que se resetea a valor vacío)
        form.reset();
        countriesSelect.value = '';
        
        // Opcional: si quieres exportar automáticamente cada vez que se agrega un usuario,
        // descomenta la siguiente línea:
        // exportToCSV();
    });
    
    // --- Inicializar ---
    loadCountries();
    addExportButton();  // Botón para exportar CSV manualmente
});