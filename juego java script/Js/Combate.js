// Variables globales para el combate
let playerPokemon = null;
let enemyPokemon = null;
let isPlayerTurn = true;

// Lista de Pokémon disponibles (corresponde a los de la pantalla de selección)
const pokemonList = {
    "Pikachu": {
        name: "Pikachu",
        level: 56,
        maxHP: 100,
        currentHP: 100,
        type: "Eléctrico",
        moves: ["Ataque Rápido", "Rayo", "Cola Férrea"],
        image: "../assets/img de Batallas/picachu.gif"
    },
    "Charizard": {
        name: "Charizard",
        level: 55,
        maxHP: 182,
        currentHP: 182,
        type: "Fuego/Volador",
        moves: ["Lanzallamas", "Garra Dragón", "Vuelo"],
        image: "../assets/img de Batallas/charizard.gif"
    },
    "Bulbasaur": {
        name: "Bulbasaur",
        level: 45,
        maxHP: 150,
        currentHP: 150,
        type: "Planta/Veneno",
        moves: ["Látigo Cepa", "Bomba Lodo", "Drenadoras"],
        image: "../assets/img de Batallas/Bulbasau.gif"
    },
    "Gengar": {
        name: "Gengar",
        level: 60,
        maxHP: 175,
        currentHP: 175,
        type: "Fantasma/Veneno",
        moves: ["Bola Sombra", "Puño Sombra", "Hipnosis"],
        image: "../assets/img de Batallas/Gengar.gif"
    },
    "Gyarados": {
        name: "Gyarados",
        level: 58,
        maxHP: 230,
        currentHP: 230,
        type: "Agua/Volador",
        moves: ["Hidrobomba", "Hiperrayo", "Cascada"],
        image: "../assets/img de Batallas/Gyarados.webp"
    },
    "Lucario": {
        name: "Lucario",
        level: 55,
        maxHP: 200,
        currentHP: 200,
        type: "Lucha/Acero",
        moves: ["Esfera Aural", "Puño Incremento", "Garra Metal"],
        image: "../assets/img de Batallas/Lucario.gif"
    }
};

// Enemigos posibles
const enemyOptions = ["Gyarados", "Charizard", "Gengar"];

// Función que se ejecuta al cargar la página
function iniciarCombate() {
    // Recuperar el Pokémon seleccionado de localStorage
    const selectedPokemon = localStorage.getItem("selectedPokemon");
    
    // Si no hay Pokémon seleccionado, usar Pikachu por defecto
    playerPokemon = selectedPokemon && pokemonList[selectedPokemon] 
        ? pokemonList[selectedPokemon] 
        : pokemonList["Pikachu"];
    
    // Seleccionar un enemigo al azar
    const randomEnemy = enemyOptions[Math.floor(Math.random() * enemyOptions.length)];
    enemyPokemon = pokemonList[randomEnemy];
    
    // Actualizar la interfaz con los datos de los Pokémon
    actualizarInterfaz();
    
    // Configurar eventos de botones
    configurarBotones();
}

// Actualizar la interfaz con los datos actuales
function actualizarInterfaz() {
    // Actualizar información del jugador
    document.getElementById("playerName").textContent = playerPokemon.name;
    document.getElementById("playerLevel").textContent = `Nv.${playerPokemon.level}`;
    document.getElementById("playerHP").textContent = `${playerPokemon.currentHP}/${playerPokemon.maxHP}`;
    document.getElementById("playerImage").src = playerPokemon.image;
    document.getElementById("playerHealth").style.width = `${(playerPokemon.currentHP / playerPokemon.maxHP) * 100}%`;
    
    // Actualizar información del enemigo
    document.getElementById("enemyName").textContent = enemyPokemon.name;
    document.getElementById("enemyLevel").textContent = `Nv.${enemyPokemon.level}`;
    document.getElementById("enemyHP").textContent = `${enemyPokemon.currentHP}/${enemyPokemon.maxHP}`;
    document.getElementById("enemyImage").src = enemyPokemon.image;
    document.getElementById("enemyHealth").style.width = `${(enemyPokemon.currentHP / enemyPokemon.maxHP) * 100}%`;
    
    // Actualizar nombre en el diálogo
    document.getElementById("activeMonName").textContent = isPlayerTurn ? playerPokemon.name : enemyPokemon.name;
    
    // Actualizar color de la barra de salud basado en HP
    actualizarColorBarrasSalud();
    
    // Actualizar movimientos disponibles en el menú
    actualizarMenuMovimientos();
}

// Actualizar el color de las barras de salud según el porcentaje de HP
function actualizarColorBarrasSalud() {
    // Barra del jugador
    const playerHealthPercent = (playerPokemon.currentHP / playerPokemon.maxHP) * 100;
    const playerHealthBar = document.getElementById("playerHealth");
    
    if (playerHealthPercent <= 20) {
        playerHealthBar.style.backgroundColor = "#ff4d4d"; // Rojo para HP bajo
    } else if (playerHealthPercent <= 50) {
        playerHealthBar.style.backgroundColor = "#ffcc00"; // Amarillo para HP medio
    } else {
        playerHealthBar.style.backgroundColor = "#3c3"; // Verde para HP alto
    }
    
    // Barra del enemigo
    const enemyHealthPercent = (enemyPokemon.currentHP / enemyPokemon.maxHP) * 100;
    const enemyHealthBar = document.getElementById("enemyHealth");
    
    if (enemyHealthPercent <= 20) {
        enemyHealthBar.style.backgroundColor = "#ff4d4d";
    } else if (enemyHealthPercent <= 50) {
        enemyHealthBar.style.backgroundColor = "#ffcc00";
    } else {
        enemyHealthBar.style.backgroundColor = "#3c3";
    }
}

// Actualizar menú de movimientos con los ataques del Pokémon activo
function actualizarMenuMovimientos() {
    const movimientos = playerPokemon.moves;
    
    // Asignar cada movimiento a su botón
    for (let i = 0; i < 3; i++) {
        if (i < movimientos.length) {
            document.getElementById(`move${i+1}`).textContent = movimientos[i];
            document.getElementById(`move${i+1}`).style.display = "block";
        } else {
            document.getElementById(`move${i+1}`).style.display = "none";
        }
    }
}

// Configurar eventos de botones
function configurarBotones() {
    // Botón de luchar
    document.getElementById("btnFight").addEventListener("click", () => {
        // Mostrar menú de movimientos y ocultar botones principales
        document.querySelector(".action-buttons").style.display = "none";
        document.getElementById("movesMenu").style.display = "grid";
        document.getElementById("dialogText").textContent = "¡Elige un movimiento!";
    });
    
    // Botones de movimientos
    for (let i = 1; i <= 3; i++) {
        document.getElementById(`move${i}`).addEventListener("click", () => {
            realizarAtaque(i - 1); // Índice 0-based para el array de movimientos
        });
    }
    
    // Botón "Volver" en el menú de movimientos
    document.getElementById("move4").addEventListener("click", () => {
        // Volver a mostrar botones principales y ocultar menú de movimientos
        document.querySelector(".action-buttons").style.display = "grid";
        document.getElementById("movesMenu").style.display = "none";
        document.getElementById("dialogText").textContent = `¿Qué hará ${playerPokemon.name}?`;
    });
    
    // Botón de mochila
    document.getElementById("btnBag").addEventListener("click", () => {
        document.getElementById("dialogText").textContent = "¡No tienes objetos en la mochila!";
    });
    
    // Botón de pokémon
    document.getElementById("btnPokemon").addEventListener("click", () => {
        document.getElementById("dialogText").textContent = "¡No tienes más Pokémon disponibles!";
    });
    
    // Botón de huir
    document.getElementById("btnRun").addEventListener("click", () => {
        document.getElementById("dialogText").textContent = "¡Has escapado con éxito!";
        setTimeout(() => {
            window.location.href = "Batalla.html"; // Volver a la pantalla de selección
        }, 1500);
    });
}

// Realizar un ataque
function realizarAtaque(moveIndex) {
    if (!isPlayerTurn) return; // Si no es turno del jugador, no hacer nada
    
    // Obtener el nombre del movimiento
    const movimiento = playerPokemon.moves[moveIndex];
    
    // Calcular daño (simplificado)
    const daño = Math.floor(Math.random() * 20) + 10;
    
    // Mostrar mensaje de ataque
    document.getElementById("dialogText").textContent = `¡${playerPokemon.name} usó ${movimiento}!`;
    
    // Aplicar daño al enemigo después de un breve retraso
    setTimeout(() => {
        // Reducir HP del enemigo
        enemyPokemon.currentHP = Math.max(0, enemyPokemon.currentHP - daño);
        
        // Actualizar interfaz
        actualizarInterfaz();
        
        // Mostrar mensaje de daño
        document.getElementById("dialogText").textContent = `¡Le ha causado ${daño} puntos de daño!`;
        
        // Comprobar si el enemigo fue derrotado
        if (enemyPokemon.currentHP <= 0) {
            setTimeout(() => {
                document.getElementById("dialogText").textContent = `¡${enemyPokemon.name} ha sido derrotado!`;
                
                // Volver a la pantalla de selección después de unos segundos
                setTimeout(() => {
                    window.location.href = "Batalla.html";
                }, 2000);
            }, 1500);
        } else {
            // Si el enemigo sigue con vida, es su turno de atacar
            setTimeout(() => {
                turnoEnemigo();
            }, 1500);
        }
    }, 1000);
    
    // Ocultar menú de movimientos y mostrar botones principales
    document.querySelector(".action-buttons").style.display = "grid";
    document.getElementById("movesMenu").style.display = "none";
}

// Turno del enemigo
function turnoEnemigo() {
    isPlayerTurn = false;
    actualizarInterfaz();
    
    // Seleccionar un movimiento aleatorio
    const moveIndex = Math.floor(Math.random() * enemyPokemon.moves.length);
    const movimiento = enemyPokemon.moves[moveIndex];
    
    // Mostrar mensaje de ataque
    document.getElementById("dialogText").textContent = `¡${enemyPokemon.name} usó ${movimiento}!`;
    
    // Calcular daño (simplificado)
    const daño = Math.floor(Math.random() * 15) + 5;
    
    // Aplicar daño al jugador después de un breve retraso
    setTimeout(() => {
        // Reducir HP del jugador
        playerPokemon.currentHP = Math.max(0, playerPokemon.currentHP - daño);
        
        // Actualizar interfaz
        actualizarInterfaz();
        
        // Mostrar mensaje de daño
        document.getElementById("dialogText").textContent = `¡Te ha causado ${daño} puntos de daño!`;
        
        // Comprobar si el jugador fue derrotado
        if (playerPokemon.currentHP <= 0) {
            setTimeout(() => {
                document.getElementById("dialogText").textContent = `¡${playerPokemon.name} ha sido derrotado!`;
                
                // Volver a la pantalla de selección después de unos segundos
                setTimeout(() => {
                    window.location.href = "Batalla.html";
                }, 2000);
            }, 1500);
        } else {
            // Si el jugador sigue con vida, volver a su turno
            setTimeout(() => {
                isPlayerTurn = true;
                actualizarInterfaz();
                document.getElementById("dialogText").textContent = `¿Qué hará ${playerPokemon.name}?`;
            }, 1500);
        }
    }, 1000);
}