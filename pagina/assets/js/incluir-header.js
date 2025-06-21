// assets/js/incluir-header.js
document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/header.html")
    .then(response => response.text())
    .then(html => {
      document.getElementById("header-container").innerHTML = html;
    });
});