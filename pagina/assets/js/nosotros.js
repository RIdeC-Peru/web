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

  incluirSeccion("quienes-somos", "quienes-somos.html");
  incluirSeccion("que-trabajamos", "que-trabajamos.html");
  incluirSeccion("mision-vision", "mision-vision.html");
  incluirSeccion("por-que-ridec", "por-que-ridec.html");
  incluirSeccion("mesa-directiva", "mesa-directiva.html");
});