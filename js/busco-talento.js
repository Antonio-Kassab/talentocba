const nombreDeLasHabilidades = {
    "teatro-fisico": "Teatro físico",
    "canto": "Canto",
    "danza": "Danza",
    "actuacion-camara": "Actuación frente a cámara",
    "acentos": "Manejo de acentos"
};

const fotoAvatarDefault = "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";

document.addEventListener('DOMContentLoaded', () => {

    const API_URL = "https://my-json-server.typicode.com/Antonio-Kassab/talentocba/talento";
    
    const contenedorActores = document.getElementById('contenedor-actores');
    const selectEdad = document.getElementById('busqueda-edad');
    const selectGenero = document.getElementById('busqueda-genero');

    let todosLosActores = [];
    const filtros = {
        rangoEdad: '', 
        genero: ''     
    };

    const mostrarActores = (actores) => {
        contenedorActores.innerHTML = ''; 

        if (actores.length === 0) {
            contenedorActores.innerHTML = `<p class="no-results">No se encontraron actores con esos filtros.</p>`;
            return;
        }

        actores.forEach((actor) => {
            const article = document.createElement('article');
            article.className = 'actor-card';
            article.setAttribute('role', 'listitem');

            const habilidadesHTML = actor.habilidades.map(habilidad => `<li>${nombreDeLasHabilidades[habilidad] || habilidad}</li>`).join('');

            article.innerHTML = `
                <div class="actor-card__media">
                    <img src="${actor.foto || fotoAvatarDefault}" alt="Foto de ${actor.nombre}">
                </div>
                <div class="actor-card__body">
                    <h3>${actor.nombre}</h3>
                    <p class="actor-meta">${actor.edad} años - ${actor.genero}</p>
                    <ul class="actor-skills">
                        ${habilidadesHTML}
                    </ul>
                <p class="actor-contact">Email: ${actor.email} <br/> Celular: ${actor.celular}</p>
                </div>
            `;
            contenedorActores.appendChild(article);
        });
    };

    fetch(API_URL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            todosLosActores = data;
            mostrarActores(todosLosActores); 
        })
        .catch(error => {
            console.error("Error al conectar con la API:", error);
            contenedorActores.innerHTML = `<p class="error-msg">Error al cargar los perfiles.</p>`;
        });

    const filtrarTalentos = () => {
        const resultadoFiltrado = todosLosActores.filter(actor => {
            
            let edadPedida = true;
            if (filtros.rangoEdad !== '') {
                const [min, max] = filtros.rangoEdad.split('-').map(Number);
                edadPedida = actor.edad >= min && actor.edad <= max;
            }

            const generoPedido = filtros.genero === '' || actor.genero === filtros.genero;

            return edadPedida && generoPedido;
        });

        mostrarActores(resultadoFiltrado);
    };

    selectEdad.addEventListener('change', (e) => {
        filtros.rangoEdad = e.target.value; 
        filtrarTalentos();
    });

    selectGenero.addEventListener('change', (e) => {
        filtros.genero = e.target.value; 
        filtrarTalentos();
    });
});