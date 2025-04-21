/**
 * Función que maneja el proceso de inicio de sesión
 * Valida las credenciales ingresadas contra los datos almacenados en localStorage
 */
function Loguear() {
    // Obtener valores de los campos de entrada
    let correoIngresado = document.getElementById("correo").value;
    let claveIngresada = document.getElementById("clave").value;
    
    // Verificar que ambos campos tengan contenido
    if (correoIngresado && claveIngresada) {
        // Recuperar datos del usuario del almacenamiento local
        let usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
        
        if (usuarioGuardado) {
            // Verificar si las credenciales coinciden
            if (correoIngresado === usuarioGuardado.correo && claveIngresada === usuarioGuardado.clave) {
                // Credenciales correctas
                alert("Inicio de sesión exitoso");
                
                // Guardar datos de usuario con la clave 'user' para uso en otras páginas
                localStorage.setItem('user', JSON.stringify(usuarioGuardado));
                
                // Redirigir al usuario a la página de perfil de entrenador
                window.location.href = "Entrenador.html";
            } else {
                // Credenciales incorrectas
                alert("Correo o contraseña incorrectos");             
            }
        } else {
            // No hay usuarios registrados en localStorage
            alert("No hay usuarios registrados");
        }
    } else {
        // Campos de entrada vacíos
        alert("Por favor ingrese correo y contraseña");
    }
}