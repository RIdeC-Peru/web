function initializeHeaderNavigation() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    // Si los elementos no existen, no se ejecuta nada.
    if (!navMenu || !navToggle) {
        return;
    }

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('is-active');
        navToggle.classList.toggle('is-active');
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    document.addEventListener('click', (event) => {
        const isClickInsideMenu = navMenu.contains(event.target);
        const isClickOnToggle = navToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('is-active')) {
            navMenu.classList.remove('is-active');
            navToggle.classList.remove('is-active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

