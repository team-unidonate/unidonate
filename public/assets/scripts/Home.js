document.addEventListener('DOMContentLoaded', () => {
  /* ===== Menú hamburguesa (sin cambios) ===== */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');

  if (toggleBtn && nav) {
    const setAria = () =>
      toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open') ? 'true' : 'false');

    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      nav.classList.toggle('open');
      setAria();
    });

    nav.addEventListener('click', (e) => {
      const t = e.target;
      if (t instanceof Element && t.matches('a') && !t.matches('#perfilBtn')) {
        nav.classList.remove('open'); setAria();
      }
    });

    document.addEventListener('click', (e) => {
      if (!header.contains(e.target)) { nav.classList.remove('open'); setAria(); }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 860 && nav.classList.contains('open')) {
        nav.classList.remove('open'); setAria();
      }
    });
  }

  /* ===== Popover Perfil (CORREGIDO) ===== */
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  // Función simplificada para 'position: fixed'
  function openPopover() {
    const rect = perfilBtn.getBoundingClientRect();
    const top = rect.bottom + 8; // Calcula la posición debajo del botón
    popover.style.top = `${top}px`; // Actualiza solo la posición 'top'
    
    popover.classList.add('open');
    popover.setAttribute('aria-hidden','false');
    const firstItem = popover.querySelector('.profile-list a');
    firstItem && firstItem.focus();
  }
  
  function closePopover() {
    popover.classList.remove('open');
    popover.setAttribute('aria-hidden','true');
    perfilBtn.setAttribute('aria-expanded','false');
  }

  if (perfilBtn && popover) {
    perfilBtn.setAttribute('aria-haspopup','menu');
    perfilBtn.setAttribute('aria-expanded','false');

    perfilBtn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggleBtn?.setAttribute('aria-expanded', 'false');
      }

      const isOpen = popover.classList.contains('open');
      if (isOpen) {
        closePopover();
      } else {
        openPopover(); 
        perfilBtn.setAttribute('aria-expanded','true');
      }
    });

    document.addEventListener('click', (e) => {
      if (!popover.contains(e.target) && !perfilBtn.contains(e.target)) {
        closePopover();
      }
    });

    popover.addEventListener('click', (e) => {
      const t = e.target;
      if (t instanceof Element && (t.matches('a') || t.matches('.btn-logout'))) {
        closePopover();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popover.classList.contains('open')) { 
        closePopover(); 
        perfilBtn.focus(); 
      }
    });

    // ✨ LÍNEAS ELIMINADAS ✨
    // Ya no cerramos el popover al hacer scroll o cambiar el tamaño de la ventana.
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