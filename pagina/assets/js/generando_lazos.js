function incluirSeccion(id, archivo) {
  fetch(`/components/${archivo}`)
    .then(res => res.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  incluirSeccion("header-container", "header.html");
  incluirSeccion("footer-container", "footer.html");

  incluirSeccion("generando-universidades", "generando-universidades.html");
  incluirSeccion("generando-instituciones", "generando-instituciones.html");
  incluirSeccion("generando-grupos", "generando-grupos.html");
  incluirSeccion("generando-personas", "generando-personas.html");
  incluirSeccion("generando-miscelaneos", "generando-miscelaneos.html");

  Promise.all([
    fetch("/data/datos-universidades.json").then(res => res.json()),
    fetch("/data/datos-instituciones.json").then(res => res.json()),
    fetch("/data/datos-grupos.json").then(res => res.json()),
    fetch("/data/datos-personas.json").then(res => res.json()),
    fetch("/data/datos-miscelaneos.json").then(res => res.json())
  ]).then(([univs, insts, grps, pers, misc]) => {
    crearTarjetas(univs, "universidades");
    crearTarjetas(insts, "instituciones");
    crearTarjetas(grps, "grupos");
    crearTarjetas(pers, "personas");
    crearTarjetas(misc, "miscelaneos");

    // Guardar globalmente para otras funciones como ficha.html
    window.universidades = univs;
    window.instituciones = insts;
    window.grupos = grps;
    window.personas = pers;
    window.miscelaneos = misc;
  });
});

function crearTarjetas(base, destino) {
  const contenedor = document.getElementById(destino);
  if (!contenedor) return;
  Object.entries(base).forEach(([tag, entidad]) => {
    const card = document.createElement("div");
    card.className = "flip-card";
    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front"><h3>${entidad.nombre}</h3></div>
        <div class="flip-card-back">
          <p>${entidad.descripcion || "Sin descripción."}</p>
          <a href="ficha.html?tag=${tag}">Ver más</a>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}