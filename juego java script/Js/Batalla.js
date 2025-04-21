// Variables para la selección de Pokémon
let selectedPokemon = null;

// Cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todas las tarjetas de Pokémon
    const pokemonCards = document.querySelectorAll('.pokemon-card');
    
    // Añadir el evento de clic a cada tarjeta
    pokemonCards.forEach(card => {
        card.addEventListener('click', function() {
            // Quitar la clase "selected" de todas las tarjetas
            pokemonCards.forEach(c => c.classList.remove('selected'));
            
            // Añadir la clase "selected" a la tarjeta seleccionada
            this.classList.add('selected');
            
            // Obtener el nombre del Pokémon seleccionado
            selectedPokemon = this.querySelector('.pokemon-name').textContent;
            
            console.log('Pokémon seleccionado:', selectedPokemon);
        });
    });
    
    // Añadir el evento de clic al botón de batalla
    const battleButton = document.querySelector('.btn-battle');
    battleButton.addEventListener('click', function() {
        if (selectedPokemon) {
            // Guardar el Pokémon seleccionado en localStorage
            localStorage.setItem('selectedPokemon', selectedPokemon);
            
            // Navegar a la pantalla de combate
            window.location.href = 'Combate.html';
        } else {
            alert('Por favor, selecciona un Pokémon antes de iniciar la batalla.');
        }
    });
    
    // Añadir el evento de clic al botón de salir
    const exitButton = document.querySelector('.btn-exit');
    exitButton.addEventListener('click', function() {
        // Volver a la pantalla de entrenador
        window.location.href = 'Entrenador.html';
    });
});