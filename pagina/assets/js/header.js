/* ==========================================================================
 * JAVASCRIPT - MÓDULO DE NAVEGACIÓN DEL HEADER
 * ==========================================================================
 * Este script gestiona la interactividad del menú de navegación responsive
 * que se encuentra en el <header> del sitio.
 *
 * Se ejecuta después de que el DOM esté completamente cargado para
 * garantizar que todos los elementos HTML estén disponibles.
 * ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Inicializa la funcionalidad del menú de navegación móvil.
     * Busca los elementos necesarios en el DOM y, si existen,
     * asigna los eventos correspondientes.
     */
    const initMobileNavigation = () => {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        // Si el botón o el menú no existen, detenemos la ejecución para evitar errores.
        if (!navToggle || !navMenu) {
            console.warn('Elementos de navegación móvil no encontrados. El script no se ejecutará.');
            return;
        }

        /**
         * Alterna la visibilidad del menú móvil.
         * Cambia las clases y los atributos ARIA para reflejar el estado (abierto/cerrado).
         */
        const toggleMenu = () => {
            navMenu.classList.toggle('is-active');
            navToggle.classList.toggle('is-active');

            // Actualiza aria-expanded para accesibilidad.
            // Si el menú está activo, aria-expanded es 'true', de lo contrario 'false'.
            const isExpanded = navMenu.classList.contains('is-active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        };

        /**
         * Cierra el menú móvil si está abierto.
         * Esta función es reutilizable para diferentes eventos de cierre.
         */
        const closeMenu = () => {
            if (navMenu.classList.contains('is-active')) {
                navMenu.classList.remove('is-active');
                navToggle.classList.remove('is-active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        };

        // --- ASIGNACIÓN DE EVENTOS ---

        // 1. Evento de clic en el botón de hamburguesa.
        navToggle.addEventListener('click', (event) => {
            // Detenemos la propagación para que el evento 'click' en el documento no se dispare inmediatamente.
            event.stopPropagation(); 
            toggleMenu();
        });

        // 2. Evento para cerrar el menú al hacer clic fuera de él.
        document.addEventListener('click', (event) => {
            // Si el clic fue fuera del menú y fuera del botón, ciérralo.
            const isClickInsideMenu = navMenu.contains(event.target);
            
            if (!isClickInsideMenu) {
                closeMenu();
            }
        });

        // 3. (Mejora de Accesibilidad) Evento para cerrar el menú con la tecla "Escape".
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });
    };

    // Iniciar el módulo de navegación.
    initMobileNavigation();

});