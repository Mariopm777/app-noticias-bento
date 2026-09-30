// Base de datos simulada (Mini CMS)
const baseNoticias = [
    { 
        id: 1, 
        titulo: "El impacto de la Inteligencia Artificial en el 2026", 
        img: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        desc: "Descubre cómo las nuevas tecnologías están remodelando la manera en que trabajamos y aprendemos en el día a día." 
    },
    { 
        id: 2, 
        titulo: "Tecnología: Nuevo avance en microchips", 
        img: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", 
        desc: "La nueva generación de procesadores cuánticos ya está aquí." 
    },
    { 
        id: 3, 
        titulo: "Turismo Local: Destinos escondidos", 
        img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", 
        desc: "Lugares hermosos que no sabías que tenías a la vuelta de la esquina." 
    },
    { 
        id: 4, 
        titulo: "Novedades Educativas post-pandemia", 
        img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", 
        desc: "Cómo el aprendizaje mixto se ha convertido en el estándar global." 
    }
];

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Si estamos en la página de favoritos, ejecutamos la función para pintarlos
    const contenedorFavoritos = document.getElementById('lista-favoritos');
    if (contenedorFavoritos) {
        renderizarFavoritos(contenedorFavoritos);
    }
});

// Función para agregar al LocalStorage
function guardarFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos_noticias')) || [];
    
    if (!favoritos.includes(id)) {
        favoritos.push(id);
        localStorage.setItem('favoritos_noticias', JSON.stringify(favoritos));
        alert('♥ ¡Noticia agregada a tus favoritos correctamente!');
    } else {
        alert('Esta noticia ya está en tu lista de favoritos.');
    }
}

// Función para remover del LocalStorage y recargar la vista
function quitarFavorito(id) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos_noticias')) || [];
    favoritos = favoritos.filter(favId => favId !== id);
    localStorage.setItem('favoritos_noticias', JSON.stringify(favoritos));
    
    // Recargar la vista de favoritos
    const contenedor = document.getElementById('lista-favoritos');
    if (contenedor) {
        renderizarFavoritos(contenedor);
    }
}

// Función que lee el LocalStorage, busca los datos y los pinta en el HTML
function renderizarFavoritos(contenedor) {
    contenedor.innerHTML = ''; // Limpiamos el contenedor
    let favoritosIds = JSON.parse(localStorage.getItem('favoritos_noticias')) || [];

    if (favoritosIds.length === 0) {
        contenedor.innerHTML = '<div class="empty-msg">No tienes ninguna noticia guardada en favoritos todavía. Explora el Home y guarda algunas.</div>';
        return;
    }

    // Filtramos la base de datos para obtener solo las noticias que coincidan con los IDs guardados
    let noticiasGuardadas = baseNoticias.filter(noticia => favoritosIds.includes(noticia.id));

    // Pintamos cada tarjeta
    noticiasGuardadas.forEach(noticia => {
        const card = document.createElement('div');
        card.className = 'bento-card';
        card.innerHTML = `
            <img src="${noticia.img}" alt="${noticia.titulo}" class="card-img">
            <h3>${noticia.titulo}</h3>
            <p style="color:#555; font-size:0.9rem; margin-bottom:15px;">${noticia.desc}</p>
            <div class="actions">
                <a href="detalle.html" class="btn-black small">Ver noticia</a>
                <button class="btn-outline small" onclick="quitarFavorito(${noticia.id})">❌ Quitar</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// Función para el formulario de contacto
function enviarFormulario(event) {
    event.preventDefault(); 
    alert('Mensaje enviado exitosamente. Nos contactaremos pronto.');
    event.target.reset(); // Limpia los inputs estilo Material Design
}
