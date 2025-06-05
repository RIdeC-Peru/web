// Menu responsive - Toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu-list');

menuToggle.addEventListener('click', () => {
  menuList.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', menuList.classList.contains('open'));
});

// Cierra el menú al hacer click fuera - responsive
document.addEventListener('click', (e) => {
  if (
    !menuList.contains(e.target) &&
    !menuToggle.contains(e.target) &&
    menuList.classList.contains('open')
  ) {
    menuList.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});



// Carrusel de próximos eventos
const carrusel = document.getElementById('carrusel');
const banners = document.querySelectorAll('.banner');
const prevBtn = document.querySelector('.carrusel-btn.prev');
const nextBtn = document.querySelector('.carrusel-btn.next');

let currentBanner = 0;
let totalBanners = banners.length;

// Función para actualizar el carrusel
function actualizarCarrusel() {
  carrusel.style.transform = `translateX(-${currentBanner * 100}%)`;
}

// Botones de navegación de banner
nextBtn.addEventListener('click', () => {
  currentBanner = (currentBanner + 1) % totalBanners;
  actualizarCarrusel();
  resetAutoplay();
});

prevBtn.addEventListener('click', () => {
  currentBanner = (currentBanner - 1 + totalBanners) % totalBanners;
  actualizarCarrusel();
  resetAutoplay();
});

// animación de banner 5.5 segundos
let autoplay = setInterval(() => {
  currentBanner = (currentBanner + 1) % totalBanners;
  actualizarCarrusel();
}, 5500);

function resetAutoplay() {
  clearInterval(autoplay);
  autoplay = setInterval(() => {
    currentBanner = (currentBanner + 1) % totalBanners;
    actualizarCarrusel();
  }, 5500);
}

// =========================
// Eventos anteriores - para actualizar
const eventosAnteriores = [
  {
    titulo: "Generando Lazos",
    fecha: "23 de septiembre de 2023",
    anio: "2023",
    img: "images/eventos/01.jpg",
    descripcion: "Un evento anual dedicado a explorar los últimos avances en diversas disciplinas científicas.",
    link: "#"
  },
  {
    titulo: "Explorando Ciencias",
    fecha: "10 de agosto de 2023",
    anio: "2023",
    img: "images/eventos/02.jpg",
    descripcion: "Un evento anual dedicado a explorar los últimos avances en diversas disciplinas científicas.",
    link: "#"
  },
  {
    titulo: "Generando Lazos",
    fecha: "5 de octubre de 2022",
    anio: "2022",
    img: "images/eventos/03.png",
    descripcion: "Conferencia para fortalecer la colaboración en futuros proyectos científicos.",
    link: "#"
  },
  {
    titulo: "Explorando Ciencias",
    fecha: "12 de agosto de 2022",
    anio: "2022",
    img: "images/eventos/04.jpg",
    descripcion: "Evento con charlas y talleres de divulgación en diversas ramas de la ciencia.",
    link: "#"
  }
];

// filtrar evenots
function renderEventos(anio = "todos") {
  const lista = document.getElementById('eventos-lista');
  lista.innerHTML = "";

  let filtrados = eventosAnteriores;
  if (anio !== "todos") {
    filtrados = eventosAnteriores.filter(ev => ev.anio === anio);
  }

  if (filtrados.length === 0) {
    lista.innerHTML = "<p>No hay eventos para este año.</p>";
    return;
  }

  filtrados.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'evento-card';
    card.innerHTML = `
      <img src="${ev.img}" alt="${ev.titulo}">
      <div class="evento-info">
        <h3>${ev.titulo}</h3>
        <div class="fecha">${ev.fecha}</div>
        <p>${ev.descripcion}</p>
        <a href="${ev.link}" class="btn-primary">Ver detalles</a>
      </div>
    `;
    lista.appendChild(card);
  });
}

// selección de año
const filtro = document.getElementById('filtro-anio');
filtro.addEventListener('change', function() {
  renderEventos(this.value);
});

// Inicializa la lista con todos los eventos
renderEventos();


// ---------------------------------------------------------------------------


// Selector de año desplegable
const anioBtn = document.getElementById("anio-btn");
const anioMenu = document.getElementById("anio-menu");
const anioActual = document.getElementById("anio-actual");

// Cambia año y actualiza detalles
const eventoPorAnio = {
  "2024": {
    fecha: "15 de agosto de 2024",
    lugar: "Auditorio del Centro de Convenciones",
    programa: [
      ["9:00", "Registro"],
      ["9:45", "Conferencia inaugural"],
      ["10:00", "Mesa redonda: innovaciones en la ciencia"],
      ["10:45", "Pausa para el almuerzo"],
      ["11:00", "Talleres simultáneos"],
      ["17:00", "Ponencia de clausura"]
    ]
  },
  "2023": {
    fecha: "10 de agosto de 2023",
    lugar: "Centro Cultural Universitario",
    programa: [
      ["9:00", "Recepción"],
      ["9:30", "Charla inaugural"],
      ["10:15", "Panel de expertos"],
      ["11:00", "Talleres participativos"],
      ["13:00", "Almuerzo"],
      ["15:00", "Presentaciones orales"],
      ["18:00", "Cierre del evento"]
    ]
  },
  "2022": {
    fecha: "12 de agosto de 2022",
    lugar: "Aula Magna Facultad de Ciencias",
    programa: [
      ["8:30", "Acreditación"],
      ["9:00", "Apertura"],
      ["9:30", "Seminario: avances en biotecnología"],
      ["11:00", "Receso"],
      ["11:30", "Laboratorios abiertos"],
      ["13:30", "Conclusiones y despedida"]
    ]
  }
};

function actualizarEvento(anio) {
  document.getElementById("evento-fecha").textContent = eventoPorAnio[anio].fecha;
  document.getElementById("evento-lugar").textContent = eventoPorAnio[anio].lugar;

  const tbody = document.getElementById("programa-tbody");
  tbody.innerHTML = "";
  eventoPorAnio[anio].programa.forEach(fila => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${fila[0]}</td><td>${fila[1]}</td>`;
    tbody.appendChild(tr);
  });
}

anioBtn.addEventListener("click", () => {
  anioMenu.classList.toggle("mostrar");
});

anioMenu.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    const nuevoAnio = item.getAttribute("data-anio");
    anioActual.textContent = nuevoAnio;
    actualizarEvento(nuevoAnio);
    anioMenu.classList.remove("mostrar");
  });
});

// Cerrar menú si se hace click fuera
document.addEventListener("click", (e) => {
  if (!anioBtn.contains(e.target) && !anioMenu.contains(e.target)) {
    anioMenu.classList.remove("mostrar");
  }
});

// Inicializa con año por defecto
actualizarEvento(anioActual.textContent);

// --- Simulación botón inscripción ---
document.getElementById("btn-inscripcion").addEventListener("click", e => {
  e.preventDefault();
  alert("¡Inscripción registrada!");
});
