const listaContactos = JSON.parse(localStorage.getItem('contactos')) || [];
let indiceEdicion = -1; // Variable para rastrear el índice del contacto en edición

function mostrarContactos () {
    const listaElement = document.getElementById('listaContactos');
    listaElement.innerHTML = '';

    listaContactos.forEach((contacto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Nombre: <span id="nombre-contacto-${index}">${contacto.nombre}</span></span>
            <span>Teléfono: <span id="telefono-contacto-${index}">${contacto.telefono}</span></span>
            <button onclick="editarContacto(${index})" class="btn btn-info">Editar</button>
            <button onclick="eliminarContacto(${index})" class="btn btn-danger">Eliminar</button>
        `;
        listaElement.appendChild(li);
    });
}

function agregarContacto () {
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;

    if (nombre && telefono) {
        if (telefono.length === 9) {
            if (indiceEdicion !== -1) {
                listaContactos[indiceEdicion] = { nombre, telefono };
                indiceEdicion = -1;
            } else {
                listaContactos.push({ nombre, telefono });
            }
            localStorage.setItem('contactos', JSON.stringify(listaContactos));
            mostrarContactos();
            document.getElementById('nombre').value = '';
            document.getElementById('telefono').value = '';
        } else {
            alert('Número de teléfono inválido. Debe tener 9 dígitos.');
        }
    }
}


function editarContacto (index) {
    indiceEdicion = index;
    const nombreContactoElement = document.getElementById(`nombre-contacto-${index}`);
    const telefonoContactoElement = document.getElementById(`telefono-contacto-${index}`);
    document.getElementById('nombre').value = nombreContactoElement.textContent;
    document.getElementById('telefono').value = telefonoContactoElement.textContent;
}

function eliminarContacto (index) {
    listaContactos.splice(index, 1);
    localStorage.setItem('contactos', JSON.stringify(listaContactos));
    mostrarContactos();
}

function validarTelefono (input) {
    input.value = input.value.replace(/\D/g, ''); // Reemplazar caracteres no numéricos
}

mostrarContactos();
