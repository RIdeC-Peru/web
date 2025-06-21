const bases = {};

async function cargarJSON(nombre) {
  const res = await fetch(`/data/${nombre}.json`);
  return res.json();
}

async function cargarTodosLosDatos() {
  bases.universidades = await cargarJSON("datos-universidades");
  bases.instituciones = await cargarJSON("datos-instituciones");
  bases.grupos = await cargarJSON("datos-grupos");
  bases.miscelaneos = await cargarJSON("datos-miscelaneos");
  bases.personas = await cargarJSON("datos-personas");
}

// Busca una entidad por su tag en todas las bases
function obtenerEntidadPorTag(tag) {
  for (const base of Object.values(bases)) {
    if (tag in base) return base[tag];
  }
  return null;
}

// Construye HTML de tarjetas relacionadas
function crearTarjetas(tags, base) {
  return tags.map(tag => {
    const d = base[tag];
    if (!d) return "";
    return `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front"><h3>${d.nombre}</h3></div>
          <div class="flip-card-back">
            <p>${d.descripcion || "Sin descripción."}</p>
            <a href="ficha-datos.html?tag=${tag}">Ver más</a>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Muestra relaciones directas (entidades referenciadas)
function mostrarReferenciasDirectas(entidad) {
  let html = "";

  const secciones = [
    { campo: "universidad", base: bases.universidades, titulo: "Universidad asociada" },
    { campo: "universidades", base: bases.universidades, titulo: "Universidades asociadas" },
    { campo: "institucion", base: bases.instituciones, titulo: "Institución vinculada" },
    { campo: "instituciones", base: bases.instituciones, titulo: "Instituciones asociadas" },
    { campo: "grupos", base: bases.grupos, titulo: "Grupos relacionados" },
    { campo: "personas", base: bases.personas, titulo: "Personas vinculadas" },
    { campo: "miscelaneos", base: bases.miscelaneos, titulo: "Elementos adicionales" }
  ];

  for (const { campo, base, titulo } of secciones) {
    if (entidad[campo]) {
      const tags = Array.isArray(entidad[campo]) ? entidad[campo] : [entidad[campo]];
      const tarjetas = crearTarjetas(tags, base);
      html += `<section><h2>${titulo}</h2><div class="card-container">${tarjetas}</div></section>`;
    }
  }

  return html;
}

// Busca entidades que hacen referencia al tag actual
function buscarRelacionadosInverso(tagActual, base, campoReferencia, titulo) {
  const relacionados = [];

  for (const [clave, entidad] of Object.entries(base)) {
    const valor = entidad[campoReferencia];
    if (Array.isArray(valor) && valor.includes(tagActual)) {
      relacionados.push(clave);
    } else if (typeof valor === "string" && valor === tagActual) {
      relacionados.push(clave);
    }
  }

  if (relacionados.length === 0) return "";

  const tarjetas = crearTarjetas(relacionados, base);
  return `<section><h2>${titulo}</h2><div class="card-container">${tarjetas}</div></section>`;
}

async function mostrarFicha() {
  await cargarTodosLosDatos();

  const params = new URLSearchParams(window.location.search);
  const tag = params.get("tag");
  const entidad = obtenerEntidadPorTag(tag);
  const contenedor = document.getElementById("contenido");

  if (!entidad) {
    contenedor.innerHTML = "<p>Entidad no encontrada.</p>";
    return;
  }

  let html = `
    <section>
      <h1>${entidad.nombre}</h1>
      <p><strong>Tipo:</strong> ${entidad.tipo}</p>
      <p>${entidad.descripcion || "Sin descripción."}</p>
      ${entidad.enlace ? `<p><a href="${entidad.enlace}" target="_blank">Enlace oficial</a></p>` : ""}
      ${entidad.imagen ? `<img src="${entidad.imagen}" alt="${entidad.nombre}" style="max-width: 300px; margin-top: 20px;" />` : ""}
    </section>
  `;

  html += mostrarReferenciasDirectas(entidad);

  html += buscarRelacionadosInverso(tag, bases.personas, "universidad", "Personas que pertenecen a esta universidad");
  html += buscarRelacionadosInverso(tag, bases.personas, "grupos", "Personas que pertenecen a este grupo");
  html += buscarRelacionadosInverso(tag, bases.grupos, "universidad", "Grupos que pertenecen a esta universidad");
  html += buscarRelacionadosInverso(tag, bases.grupos, "institucion", "Grupos que dependen de esta institución");
  html += buscarRelacionadosInverso(tag, bases.universidades, "instituciones", "Universidades asociadas a esta institución");

  contenedor.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", mostrarFicha);