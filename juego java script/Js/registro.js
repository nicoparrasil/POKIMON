// Esta función se ejecuta cuando se envía el formulario de registro
function Registro() {
    // Obtiene los valores ingresados por el usuario en el formulario
    let nombre = document.getElementById('nombre').value;
    let region = document.getElementById('region').value;
    let usuario = document.getElementById('usuario').value;
    let correo = document.getElementById('correo').value;
    let clave = document.getElementById('clave').value;
    
    // Verifica que todos los campos estén llenos
    if (nombre && region && usuario && correo && clave) {
        // Crea un objeto con los datos del usuario
        let usuarioRegistrado = {
            nombre: nombre,
            region: region,
            usuario: usuario,
            correo: correo,
            clave: clave
        };
        
        // Guarda el objeto en localStorage como texto JSON
        // Nota: localStorage solo puede almacenar cadenas de texto
        localStorage.setItem('usuario', JSON.stringify(usuarioRegistrado));
        
        // Muestra un mensaje de éxito
        alert("Usuario registrado exitosamente");
        
        // Restablece el formulario a valores vacíos
        document.getElementById('registroForm').reset();
    } else {
        // Si algún campo está vacío, muestra un mensaje de error
        alert("Complete todos los campos");
    }
}