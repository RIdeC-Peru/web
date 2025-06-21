function incluirSeccion(id, archivo) {
  fetch(`/components/${archivo}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

function cargarOportunidad(tipo) {
  const ruta = `/components/oportunidades-${tipo}.html`;
  incluirSeccion("oportunidades-dinamico", `oportunidades-${tipo}.html`);
}

document.addEventListener("DOMContentLoaded", () => {
  incluirSeccion("header-container", "header.html");
  incluirSeccion("footer-container", "footer.html");
  incluirSeccion("oportunidades-tabla", "oportunidades-tabla.html");

  // Carga inicial por defecto (opcional)
  cargarOportunidad("becas");
});