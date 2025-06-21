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

  incluirSeccion("introduccion", "introduccion.html");
  incluirSeccion("lo_ultimo", "lo_ultimo.html");
});

