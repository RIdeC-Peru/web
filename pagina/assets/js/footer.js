
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       LÓGICA DEL FOOTER
       Funcionalidad para el pie de página.
       ========================================================================== */

    // MÓDULO: Actualización dinámica del año del copyright
    (() => {
        const yearSpan = document.getElementById('current-year');
        if (!yearSpan) return;

        // Establece el año actual para que el copyright no quede desactualizado.
        yearSpan.textContent = new Date().getFullYear();
    })();

});