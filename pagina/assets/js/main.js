async function loadComponent(containerId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error al cargar ${filePath}: ${response.statusText}`);
        }
        const html = await response.text();
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
        }
        return true; // Indica que la carga fue exitosa
    } catch (error) {
        console.error(error);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `<p style="color:red; text-align:center;">No se pudo cargar la sección.</p>`;
        }
        return false; // Indica que la carga falló
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Carga los componentes principales en orden
    await loadComponent("main-container", "/components/introduccion.html");
    await loadComponent("footer-container", "/components/footer.html");

    // Carga el header al final y luego inicializa su script
    const headerLoaded = await loadComponent("header-container", "/components/header.html");
    if (headerLoaded) {
        initializeHeaderNavigation();
    }
});