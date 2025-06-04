// === Función que devuelve cualquier entidad por su tag ===
function obtenerDatosPorTag(tag) {
  return (
    universidades[tag] ||
    instituciones[tag] ||
    grupos[tag] ||
    miscelaneos[tag] ||
    personas[tag] ||
    null
  );
}

// === Función para buscar entidades que REFERENCIAN a la entidad actual ===
function buscarRelacionadosInverso(tagActual, baseDatos, campoReferencia, titulo) {
  const relacionados = [];

  for (const tag in baseDatos) {
    const entidad = baseDatos[tag];
    const valor = entidad[campoReferencia];

    if (Array.isArray(valor) && valor.includes(tagActual)) {
      relacionados.push(tag);
    } else if (typeof valor === "string" && valor === tagActual) {
      relacionados.push(tag);
    }
  }

  if (relacionados.length === 0) return "";

  const tarjetas = relacionados.map(tag => {
    const d = baseDatos[tag];
    if (!d) return "";
    return `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>${d.nombre}</h3></div>
          <div class="flip-card-back">
            <p>${d.descripcion || "Sin descripción."}</p>
            <a href="ficha.html?tag=${tag}">Ver más</a>
          </div>
        </div>
      </div>
    `;
  }).join("");

  return `<section><h2>${titulo}</h2><div class="card-container">${tarjetas}</div></section>`;
}

// === Función para mostrar referencias DIRECTAS que contiene la entidad actual ===
function mostrarReferenciasDirectas(datos) {
  let html = "";

  const secciones = [
    { campo: "universidad", base: universidades, titulo: "Universidad asociada" },
    { campo: "universidades", base: universidades, titulo: "Universidades asociadas" },
    { campo: "institucion", base: instituciones, titulo: "Institución vinculada" },
    { campo: "instituciones", base: instituciones, titulo: "Instituciones asociadas" },
    { campo: "grupos", base: grupos, titulo: "Grupos relacionados" },
    { campo: "personas", base: personas, titulo: "Personas vinculadas" },
    { campo: "miscelaneos", base: miscelaneos, titulo: "Elementos adicionales" }
  ];

  for (const { campo, base, titulo } of secciones) {
    if (datos[campo]) {
      const tags = Array.isArray(datos[campo]) ? datos[campo] : [datos[campo]];
      const tarjetas = tags.map(tag => {
        const d = base[tag];
        if (!d) return "";
        return `
          <div class="flip-card">
            <div class="flip-card-inner">
              <div class="flip-card-front"><h3>${d.nombre}</h3></div>
              <div class="flip-card-back">
                <p>${d.descripcion || "Sin descripción."}</p>
                <a href="ficha.html?tag=${tag}">Ver más</a>
              </div>
            </div>
          </div>
        `;
      }).join("");

      html += `<section><h2>${titulo}</h2><div class="card-container">${tarjetas}</div></section>`;
    }
  }

  return html;
}

// === Obtener el tag actual desde la URL ===
const params = new URLSearchParams(window.location.search);
const tag = params.get("tag");
const datos = obtenerDatosPorTag(tag);
const contenedor = document.getElementById("contenido");

if (!datos) {
  contenedor.innerHTML = "<p>Entidad no encontrada.</p>";
} else {
  let html = `
    <section>
      <h1>${datos.nombre}</h1>
      <p><strong>Tipo:</strong> ${datos.tipo}</p>
      <p>${datos.descripcion || "Sin descripción."}</p>
      ${datos.enlace ? `<p><a href="${datos.enlace}" target="_blank">Enlace oficial</a></p>` : ""}
      ${datos.imagen ? `<img src="${datos.imagen}" alt="${datos.nombre}" style="max-width: 300px; margin-top: 20px;" />` : ""}
    </section>
  `;

  // === Mostrar relaciones DIRECTAS (a quién referencia esta entidad) ===
  html += mostrarReferenciasDirectas(datos);

  // === Mostrar relaciones INVERSAS (quién referencia a esta entidad) ===
  html += buscarRelacionadosInverso(tag, personas, "universidad", "Personas que pertenecen a esta universidad");
  html += buscarRelacionadosInverso(tag, personas, "grupos", "Personas que pertenecen a este grupo");
  html += buscarRelacionadosInverso(tag, grupos, "universidad", "Grupos que pertenecen a esta universidad");
  html += buscarRelacionadosInverso(tag, grupos, "institucion", "Grupos que dependen de esta institución");
  html += buscarRelacionadosInverso(tag, universidades, "instituciones", "Universidades asociadas a esta institución");

  contenedor.innerHTML = html;
}