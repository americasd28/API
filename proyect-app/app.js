// Selección de los elementos del DOM
const userContainer = document.getElementById('user-container');
const page1Btn = document.getElementById('page1');
const page2Btn = document.getElementById('page2');

// Función para mostrar un mensaje de carga mientras los datos se obtienen
function showPlaceholder() {
    userContainer.innerHTML = '<p class="placeholder">Cargando usuarios...</p>';
}

// Función para renderizar los usuarios en el contenedor del DOM
function displayUsers(users) {
    userContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar usuarios nuevos
    users.forEach(user => {
        // Crear un nuevo div para cada usuario
        const userDiv = document.createElement('div');
        userDiv.classList.add('user'); // Añadir una clase para estilizar el div

        // Rellenar el div con los datos del usuario
        userDiv.innerHTML = `
            <img src="${user.avatar}" alt="${user.first_name}">
            <p>${user.first_name} ${user.last_name}</p>
            <p>Email: ${user.email}</p>
        `;

        // Agregar el nuevo div al contenedor
        userContainer.appendChild(userDiv);
    });
}

// Función para obtener los usuarios de una página específica usando la API
async function fetchUsers(page) {
    showPlaceholder(); // Mostrar un mensaje de carga mientras se obtienen los datos
    try {
        // Solicitar los usuarios de la página seleccionada (con un retardo de 3 segundos)
        const response = await fetch(`https://reqres.in/api/users?delay=3&page=${page}`);
        const data = await response.json(); // Convertir la respuesta en JSON
        displayUsers(data.data); // Llamar a la función para mostrar los usuarios en el DOM
    } catch (error) {
        // Manejar el error en caso de que falle la solicitud
        userContainer.innerHTML = '<p class="error">Error al cargar los usuarios.</p>';
        console.error(error);
    }
}

// Asignar los botones de paginación para cargar usuarios de diferentes páginas
page1Btn.addEventListener('click', () => fetchUsers(1));
page2Btn.addEventListener('click', () => fetchUsers(2));

// Cargar por defecto la primera página de usuarios al iniciar la aplicación
fetchUsers(1);
