// Función para registrar al usuario
function Registro() {
    let nombre = document.getElementById('nombre').value;
    let region = document.getElementById('region').value;
    let usuario = document.getElementById('usuario').value;
    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    if (nombre && region && usuario && correo && clave) {
        let usuarioRegistrado = {
            nombre: nombre,
            region: region,
            usuario: usuario,
            correo: correo,
            clave: clave
        };
        localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));

        alert("Usuario registrado exitosamente");
        document.getElementById('registroForm').reset();
    } else {
        alert("Complete todos los campos");
    }
}
function Loguear() {
    let correoIngresado = document.getElementById("correo").value;
    let claveIngresada = document.getElementById("clave").value;
    if (correoIngresado && claveIngresada) {
        let usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
        if (usuarioGuardado) {
            if (correoIngresado === usuarioGuardado.correo && claveIngresada === usuarioGuardado.clave) {
                alert("Inicio de sesión exitoso");
            } else {
                alert("Correo o contraseña incorrectos");
            }
        } else {
            alert("No hay usuarios registrados");
        }
    } else {
        alert("Por favor ingrese correo y contraseña");
    }
}





// Clase Entrenador
class Entrenador {
    constructor(nombre, region, experiencia = 0, insignias = 0) {
        this.nombre = nombre;
        this.region = region;
        this.experiencia = experiencia;
        this.insignias = insignias;
        this.pokimones = [];
    }

    // Método para capturar un pokimon
    capturarPokimon(pokimon) {
        if (this.pokimones.length < 6) {
            this.pokimones.push(pokimon);
            return `¡${this.nombre} ha capturado a ${pokimon.nombre}!`;
        } else {
            return `¡El equipo de ${this.nombre} está completo! No puede capturar más pokimones.`;
        }
    }

    // Método para entrenar a un pokimon
    entrenarPokimon(pokimon) {
        const index = this.pokimones.findIndex(p => p.nombre === pokimon.nombre);
        if (index !== -1) {
            this.pokimones[index].ataque += 5;
            this.pokimones[index].defensa += 3;
            this.experiencia += 10;
            return `¡${pokimon.nombre} ha sido entrenado! Ataque +5, Defensa +3`;
        } else {
            return `${pokimon.nombre} no está en tu equipo.`;
        }
    }

    // Método para mostrar información del entrenador
    mostrarInfo() {
        return `Entrenador: ${this.nombre}
Región: ${this.region}
Experiencia: ${this.experiencia}
Insignias: ${this.insignias}
Pokimones: ${this.pokimones.map(p => p.nombre).join(', ')}`;
    }
}

// Clase Pokimon
class Pokimon {
    constructor(nombre, tipo, ataque, defensa, habilidad, evolucion = null) {
        this.nombre = nombre;
        this.tipo = tipo;
        this.ataque = ataque;
        this.defensa = defensa;
        this.habilidad = habilidad;
        this.evolucion = evolucion;
        this.salud = 100;
    }

    // Método para usar habilidad
    usarHabilidad() {
        return `¡${this.nombre} usó ${this.habilidad}!`;
    }

    // Método para evolucionar
    evolucionar() {
        if (this.evolucion) {
            return `¡${this.nombre} está evolucionando a ${this.evolucion}!`;
        } else {
            return `${this.nombre} no puede evolucionar más.`;
        }
    }

    // Método para mostrar información del pokimon
    mostrarInfo() {
        return `Nombre: ${this.nombre}
Tipo: ${this.tipo}
Ataque: ${this.ataque}
Defensa: ${this.defensa}
Habilidad: ${this.habilidad}
Evolución: ${this.evolucion || 'No tiene'}
Salud: ${this.salud}`;
    }
}

// Clase Batalla
class Batalla {
    constructor(entrenador1, entrenador2) {
        this.entrenador1 = entrenador1;
        this.entrenador2 = entrenador2;
        this.turno = 1;
        this.log = [];
    }

    // Función de ataque
    ataque(pokimonAtacante, pokimonDefensor) {
        // Cálculo de daño basado en el ataque y tipo
        let poder = pokimonAtacante.ataque;
        
        // Bonificación por tipo (ejemplo simplificado)
        const tablaTipos = {
            'Fuego': { 'Planta': 2, 'Agua': 0.5 },
            'Agua': { 'Fuego': 2, 'Planta': 0.5 },
            'Planta': { 'Agua': 2, 'Fuego': 0.5 },
            'Eléctrico': { 'Agua': 2, 'Tierra': 0 },
            'Tierra': { 'Eléctrico': 2, 'Planta': 0.5 }
        };
        
        // Verificar bonificación de tipo
        if (tablaTipos[pokimonAtacante.tipo] && tablaTipos[pokimonAtacante.tipo][pokimonDefensor.tipo]) {
            poder *= tablaTipos[pokimonAtacante.tipo][pokimonDefensor.tipo];
        }
        
        const mensaje = `${pokimonAtacante.nombre} ataca a ${pokimonDefensor.nombre} con ${pokimonAtacante.habilidad}`;
        this.log.push(mensaje);
        
        return poder;
    }

    // Función de defensa
    defensa(pokimonDefensor, poderAtaque) {
        // Cálculo de daño recibido basado en la defensa
        const reduccion = pokimonDefensor.defensa / 10;
        const dañoRecibido = Math.max(1, poderAtaque - reduccion);
        
        // Actualizar salud
        pokimonDefensor.salud = Math.max(0, pokimonDefensor.salud - dañoRecibido);
        
        const mensaje = `${pokimonDefensor.nombre} se defiende y recibe ${dañoRecibido.toFixed(1)} de daño. Salud restante: ${pokimonDefensor.salud.toFixed(1)}`;
        this.log.push(mensaje);
        
        return dañoRecibido;
    }

    // Simular un turno de batalla
    simularTurno(pokimon1, pokimon2) {
        if (this.turno % 2 === 1) {
            // Turno impar: ataca pokimon1
            const poder = this.ataque(pokimon1, pokimon2);
            this.defensa(pokimon2, poder);
        } else {
            // Turno par: ataca pokimon2
            const poder = this.ataque(pokimon2, pokimon1);
            this.defensa(pokimon1, poder);
        }
        
        this.turno++;
        
        // Verificar si la batalla ha terminado
        if (pokimon1.salud <= 0) {
            this.log.push(`¡${pokimon2.nombre} ha ganado la batalla!`);
            return false;
        } else if (pokimon2.salud <= 0) {
            this.log.push(`¡${pokimon1.nombre} ha ganado la batalla!`);
            return false;
        }
        
        return true; // La batalla continúa
    }

    // Obtener el registro de la batalla
    obtenerLog() {
        return this.log.join('\n');
    }
}

// Arreglo de Pokimones disponibles
const pokimonesDisponibles = [
    new Pokimon("Fuegosito", "Fuego", 65, 40, "Llamarada", "Volcansito"),
    new Pokimon("Acuamin", "Agua", 55, 55, "Chorro de Agua", "Tsunamax"),
    new Pokimon("Plantara", "Planta", 50, 60, "Látigo Cepa", "Arbolito"),
    new Pokimon("Rayochu", "Eléctrico", 70, 35, "Impactrueno", "Tormentachu"),
    new Pokimon("Terradon", "Tierra", 45, 75, "Terremoto", "Montañon")
];

// Función para inicializar el juego
function iniciarJuego() {
    // Recuperar usuario del localStorage
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    
    if (usuarioGuardado) {
        // Crear entrenador con los datos del usuario
        const jugador = new Entrenador(usuarioGuardado.nombre, usuarioGuardado.region);
        
        // Asignar un pokimon inicial aleatorio
        const pokimonInicial = pokimonesDisponibles[Math.floor(Math.random() * pokimonesDisponibles.length)];
        jugador.capturarPokimon(pokimonInicial);
        
        // Guardar el entrenador en localStorage
        localStorage.setItem('entrenador', JSON.stringify(jugador));
        
        return `¡Bienvenido ${jugador.nombre}! Tu Pokimon inicial es ${pokimonInicial.nombre}`;
    } else {
        return "No hay usuario registrado. Por favor, regístrate primero.";
    }
}

// Función para actualizar el perfil del entrenador en la página
function actualizarPerfilEntrenador() {
    const entrenadorGuardado = JSON.parse(localStorage.getItem('entrenador'));
    
    if (entrenadorGuardado && document.getElementById('perfilEntrenador')) {
        const entrenador = new Entrenador(
            entrenadorGuardado.nombre,
            entrenadorGuardado.region,
            entrenadorGuardado.experiencia,
            entrenadorGuardado.insignias
        );
        
        // Reconstruir los objetos Pokimon
        entrenadorGuardado.pokimones.forEach(p => {
            const pokimon = new Pokimon(p.nombre, p.tipo, p.ataque, p.defensa, p.habilidad, p.evolucion);
            pokimon.salud = p.salud;
            entrenador.pokimones.push(pokimon);
        });
        
        document.getElementById('perfilEntrenador').innerHTML = entrenador.mostrarInfo().replace(/\n/g, '<br>');
    }
}

// Función para mostrar el perfil de un pokimon
function mostrarPokimon(nombre) {
    const entrenadorGuardado = JSON.parse(localStorage.getItem('entrenador'));
    
    if (entrenadorGuardado) {
        const pokimon = entrenadorGuardado.pokimones.find(p => p.nombre === nombre);
        
        if (pokimon && document.getElementById('detallePokimon')) {
            const pokimonObj = new Pokimon(
                pokimon.nombre,
                pokimon.tipo,
                pokimon.ataque,
                pokimon.defensa,
                pokimon.habilidad,
                pokimon.evolucion
            );
            pokimonObj.salud = pokimon.salud;
            
            document.getElementById('detallePokimon').innerHTML = pokimonObj.mostrarInfo().replace(/\n/g, '<br>');
        }
    }
}

// Escuchar el evento DOMContentLoaded para inicializar funciones cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si estamos en la página de opciones
    if (window.location.href.includes('opciones.html')) {
        actualizarPerfilEntrenador();
        
        // Añadir el botón para iniciar juego si no existe
        if (!document.getElementById('iniciarJuego')) {
            const botonIniciar = document.createElement('button');
            botonIniciar.id = 'iniciarJuego';
            botonIniciar.textContent = 'Iniciar Juego';
            botonIniciar.className = 'btn btn-lg btn-outline-dark';
            botonIniciar.onclick = function() {
                alert(iniciarJuego());
                actualizarPerfilEntrenador();
            };
            
            // Añadir el botón a la página
            document.querySelector('.d-grid').appendChild(botonIniciar);
        }
    }
});