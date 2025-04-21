// Esta función se ejecuta cuando se carga la página
function GetDataUser() {
    // Obtiene los datos del usuario desde el localStorage
    let dataUser = localStorage.getItem("user");
    
    // Verifica si existen datos de usuario
    if(dataUser == null) {
        // Si no hay datos de usuario, muestra una alerta y redirige al login
        alert('No has iniciado sesión');
        window.location.href = "login.html";
    } else {
        // Si hay datos, los convierte de formato JSON a objeto JavaScript
        let userData = JSON.parse(dataUser);
        
        // Actualiza los elementos HTML con los datos del usuario
        document.getElementById("nombrePerfil").textContent = userData.nombre || "Entrenador";
        document.getElementById("regionPerfil").textContent = userData.region || "Desconocida";
        document.getElementById("usuarioPerfil").textContent = userData.usuario || "Usuario";
        
        // Determina el género del entrenador basado en el nombre
        const esFemenino = esNombreFemenino(userData.nombre || "");
        
        // Actualiza la imagen del entrenador según el género
        setTrainerImage(esFemenino);
        
        // Actualiza los Pokémon según el género
        updatePokemonTeam(esFemenino);
        
        // Actualiza el tipo favorito según el género
        if(esFemenino) {
            document.getElementById("tipoFavorito").textContent = "PSÍQUICO";
            // Opcional: agregar clase al elemento principal para cambiar estilos
            document.querySelector('.trainer-card').classList.add('female');
        } else {
            document.getElementById("tipoFavorito").textContent = "ROCA";
        }
        
        // Log de confirmación para depuración
        console.log("Perfil de entrenador cargado correctamente");
    }
}

// Función para determinar si un nombre es femenino
function esNombreFemenino(nombre) {
    // Lista de nombres típicamente femeninos (puedes ampliar esta lista)
    const nombresFemeninos = [
        'ana', 'maría', 'laura', 'sofía', 'lucía', 'carmen', 'andrea', 
        'patricia', 'isabel', 'marta', 'paula', 'elena', 'pilar', 'sara', 
        'cristina', 'julia', 'silvia', 'rosa', 'marina', 'alba', 'claudia', 
        'valentina', 'alejandra', 'natalia', 'diana', 'carolina', 'veronica', 
        'mariana', 'victoria', 'gabriela', 'daniela', 'fernanda', 'adriana', 
        'juana', 'mónica', 'eva', 'rocío', 'alicia', 'susana', 'raquel', 
        'gloria', 'teresa', 'inés', 'emma', 'olga', 'clara', 'esperanza', 
        'maria', 'sofia', 'lucia', 'monica', 'ines'
    ];
    
    // Convierte el nombre a minúsculas para la comparación
    const nombreLower = nombre.toLowerCase();
    
    // Verifica si el nombre está en la lista o contiene alguno de los nombres femeninos
    for (let i = 0; i < nombresFemeninos.length; i++) {
        if (nombreLower.includes(nombresFemeninos[i])) {
            return true;
        }
    }
    
    return false;
}

// Función para actualizar la imagen del entrenador según el género
function setTrainerImage(esFemenino) {
    // Obtiene el elemento de imagen del entrenador
    const trainerImage = document.querySelector('.trainer-image img');
    
    // Establece la ruta de la imagen según el género determinado
    if (esFemenino) {
        trainerImage.src = "../assets/Perfil/entrenadora.gif";
        trainerImage.alt = "Perfil de la Entrenadora";
    } else {
        trainerImage.src = "../assets/Perfil/entrenador2.gif";
        trainerImage.alt = "Perfil del Entrenador";
    }
}

// Función para actualizar el equipo de Pokémon según el género
function updatePokemonTeam(esFemenino) {
    // Define los diferentes equipos de Pokémon según el género
    const pokemonFemenino = [
        "../assets/otros pokimones de la entrenadora/rosita.gif",
        "../assets/otros pokimones de la entrenadora/sylveon.gif",
        "../assets/otros pokimones de la entrenadora/gardevoir.gif",
        "../assets/otros pokimones de la entrenadora/espeon.gif",
        "../assets/otros pokimones de la entrenadora/furipanda.gif",
        "../assets/otros pokimones de la entrenadora/milotic.gif"
    ];
    
    const pokemonMasculino = [
        "../assets/otros pokimones del entrenador/buizel.gif",
        "../assets/otros pokimones del entrenador/tumblr.gif", 
        "../assets/otros pokimones del entrenador/rosa.gif",
        "../assets/otros pokimones del entrenador/mewtwo.gif",
        "../assets/otros pokimones del entrenador/popocho.gif",
        "../assets/otros pokimones del entrenador/giphy.gif"
    ];
    
    // Selecciona el equipo correcto basado en el género
    const pokemonTeam = esFemenino ? pokemonFemenino : pokemonMasculino;
    
    // Obtiene todos los elementos de imágenes de Pokémon
    const pokemonItems = document.querySelectorAll('.other-pokemon-item img');
    
    // Actualiza cada imagen con la correspondiente del equipo seleccionado
    for (let i = 0; i < pokemonItems.length; i++) {
        if (i < pokemonTeam.length) {
            pokemonItems[i].src = pokemonTeam[i];
            pokemonItems[i].alt = `Pokémon ${i+1}`;
        }
    }
}