let usuariosGlobales = [];

async function obtenerDatos() {
    try {
        const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
        usuariosGlobales = await respuesta.json();
        
        renderizarDatos(usuariosGlobales);
    } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
    }
}

function renderizarDatos(usuarios) {
    const contenedor = document.querySelector('.card-container');
    const contador = document.getElementById('counter');
    
    contenedor.innerHTML = ''; 
    contador.textContent = `Total: ${usuarios.length}`;

    if (usuarios.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    usuarios.forEach(usuario => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        tarjeta.innerHTML = `
            <h3>${usuario.name}</h3>
            <p><strong>Email:</strong> ${usuario.email}</p>
            <p><strong>Ciudad:</strong> ${usuario.address.city}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
}

const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const textoBusqueda = e.target.value.toLowerCase();
    
    const usuariosFiltrados = usuariosGlobales.filter(usuario => {
        const nombreMatch = usuario.name.toLowerCase().includes(textoBusqueda);
        const ciudadMatch = usuario.address.city.toLowerCase().includes(textoBusqueda);
        return nombreMatch || ciudadMatch;
    });

    renderizarDatos(usuariosFiltrados);
});


obtenerDatos();

obtenerDatos();