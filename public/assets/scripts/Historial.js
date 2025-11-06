document.addEventListener('DOMContentLoaded', () => {
  /* ===== Lógica del Header (Menú hamburguesa y Popover de Perfil) REUTILIZADO ===== */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  // Menú Hamburguesa
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Popover de Perfil
  if (perfilBtn && popover) {
    const openPopover = () => {
      const rect = perfilBtn.getBoundingClientRect();
      popover.style.top = `${rect.bottom + 8}px`;
      popover.classList.add('open');
      perfilBtn.setAttribute('aria-expanded', 'true');
    };
    const closePopover = () => {
      popover.classList.remove('open');
      perfilBtn.setAttribute('aria-expanded', 'false');
    };

    perfilBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggleBtn?.setAttribute('aria-expanded', 'false');
      }
      popover.classList.contains('open') ? closePopover() : openPopover();
    });
  }

  // Lógica para cerrar menús al hacer clic fuera
  document.addEventListener('click', (e) => {
    // Cierra menú hamburguesa
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }
    // Cierra popover de perfil
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      popover.classList.remove('open');
      perfilBtn.setAttribute('aria-expanded', 'false');
    }
  });
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