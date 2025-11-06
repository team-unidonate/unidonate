document.addEventListener('DOMContentLoaded', () => {
  /* ========= Menú hamburguesa (NUEVA VERSIÓN) ========= */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');

  if (toggleBtn && nav) {
    // 1. Abrir/cerrar al hacer click en el botón
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que el click se propague al documento
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // 2. Cerrar al hacer click en un enlace del menú
    nav.addEventListener('click', (e) => {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
    });

    // 3. Cerrar al hacer click fuera del menú
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ========= Dropdown Sede (sin cambios) ========= */
  const dd = document.querySelector('.dropdown');
  if (dd) {
    const btn   = dd.querySelector('.btn-drop');
    const menu = dd.querySelector('.dropdown-menu');
    const val   = dd.querySelector('.drop-value');

    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        val.textContent = a.getAttribute('data-value') || a.textContent.trim();
        dd.classList.remove('open');
        btn?.setAttribute('aria-expanded','false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        btn?.setAttribute('aria-expanded','false');
      }
    });
  }
});
/* ====== LÓGICA PARA EL MODAL DE TÉRMINOS Y CONDICIONES ====== */
const termsLink = document.getElementById('terms-link');
const termsModal = document.getElementById('terms-modal');
const termsOverlay = document.getElementById('terms-overlay');
const closeModalBtn = document.getElementById('modal-close-btn');

const openModal = () => {
  termsModal.classList.add('visible');
  termsOverlay.classList.add('visible');
};

const closeModal = () => {
  termsModal.classList.remove('visible');
  termsOverlay.classList.remove('visible');
};

if (termsLink && termsModal && termsOverlay && closeModalBtn) {
  // Abrir modal al hacer clic en el enlace
  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  // Cerrar modal con el botón de flecha
  closeModalBtn.addEventListener('click', closeModal);

  // Cerrar modal al hacer clic en el fondo oscuro
  termsOverlay.addEventListener('click', closeModal);
}

/* ====== LÓGICA PARA EL MODAL DE POLÍTICA DE PRIVACIDAD ====== */
const privacyLink = document.getElementById('privacy-link');
const privacyModal = document.getElementById('privacy-modal');
const privacyOverlay = document.getElementById('privacy-overlay');
const closePrivacyBtn = document.getElementById('privacy-modal-close-btn');

const openPrivacyModal = () => {
  privacyModal.classList.add('visible');
  privacyOverlay.classList.add('visible');
};

const closePrivacyModal = () => {
  privacyModal.classList.remove('visible');
  privacyOverlay.classList.remove('visible');
};

if (privacyLink && privacyModal && privacyOverlay && closePrivacyBtn) {
  // Abrir modal al hacer clic en el enlace
  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    openPrivacyModal();
  });

  // Cerrar modal con el botón de flecha
  closePrivacyBtn.addEventListener('click', closePrivacyModal);

  // Cerrar modal al hacer clic en el fondo oscuro
  privacyOverlay.addEventListener('click', closePrivacyModal);
}