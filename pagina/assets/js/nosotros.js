/* function incluirSeccion(id, archivo) {
  fetch(`/components/${archivo}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  incluirSeccion("header-container", "header.html");
  incluirSeccion("footer-container", "footer.html");

  incluirSeccion("quienes-somos", "quienes-somos.html");
  incluirSeccion("que-trabajamos", "que-trabajamos.html");
  incluirSeccion("mision-vision", "mision-vision.html");
  incluirSeccion("por-que-ridec", "por-que-ridec.html");
  incluirSeccion("mesa-directiva", "mesa-directiva.html");
}); */


/**
 * @file loader.js
 * @description Carga componentes HTML dinámicamente en contenedores específicos.
 * Se ha mejorado para ser reutilizable en cualquier página.
 */

/**
 * Carga un componente HTML desde la ruta especificada y lo inyecta en un elemento del DOM.
 * @param {string} containerId - El ID del elemento contenedor.
 * @param {string} componentPath - La ruta completa al archivo del componente (ej. "/components/header.html").
 * @returns {Promise<boolean>} - Promesa que resuelve a `true` si la carga fue exitosa, `false` si no.
 */
async function loadComponent(containerId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Error al cargar ${componentPath}: ${response.statusText}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
        return true;
    } catch (error) {
        console.error(error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p style="color:red; text-align:center;">No se pudo cargar la sección.</p>`;
        }
        return false;
    }
}

/**
 * Función principal que se ejecuta cuando el DOM está listo.
 * Carga los componentes comunes (header, footer) y el contenido principal específico de la página.
 */
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Cargar componentes comunes
    await loadComponent("footer-container", "/components/footer.html");
    const headerLoaded = await loadComponent("header-container", "/components/header.html");
    
    // 2. Si el header se cargó, inicializar su script de navegación
    if (headerLoaded) {
        initializeHeaderNavigation();
    }
    await loadComponent("main-container", "/components/nosotros-main");

/*     // 3. Cargar el contenido principal específico de la página actual
    const mainContainer = document.getElementById('main-container');
    if (mainContainer && mainContainer.dataset.componentPath) {
        const mainComponentPath = mainContainer.dataset.componentPath;
        await loadComponent('main-container', mainComponentPath);
    } */
});