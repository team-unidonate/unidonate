document.addEventListener('DOMContentLoaded', () => {
  /* ===== Menú hamburguesa ===== */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  /* ===== Popover Perfil ===== */
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  function openPopover() {
    const rect = perfilBtn.getBoundingClientRect();
    const top = rect.bottom + 8;
    popover.style.top = `${top}px`;
    popover.classList.add('open');
    perfilBtn.setAttribute('aria-expanded','true');
  }
  
  function closePopover() {
    popover.classList.remove('open');
    perfilBtn.setAttribute('aria-expanded','false');
  }

  if (perfilBtn && popover) {
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

  /* ===== ✨ INICIO DE LA NUEVA SECCIÓN: Lógica del Modal de Reporte ✨ ===== */
  const reportBtn = document.getElementById('report-btn');
  const reportModal = document.getElementById('report-modal');
  const overlay = document.getElementById('report-overlay');
  const reportForm = document.getElementById('report-form');

  // Función para abrir el modal de reporte
  const openReportModal = () => {
    reportModal.classList.add('visible');
    overlay.classList.add('visible');
  };

  // Función para cerrar el modal de reporte
  const closeReportModal = () => {
    reportModal.classList.remove('visible');
    overlay.classList.remove('visible');
  };

  if (reportBtn && reportModal && overlay && reportForm) {
    // Abrir el modal al hacer clic en "REPORTAR"
    reportBtn.addEventListener('click', openReportModal);

    // Cerrar el modal al hacer clic en el fondo oscuro
    overlay.addEventListener('click', closeReportModal);

    // Manejar el envío del formulario de reporte
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const reason = document.getElementById('report-reason').value;
      if (reason.trim() !== '') {
        alert('Reporte enviado. Gracias por tu feedback.');
        closeReportModal();
        reportForm.reset(); // Limpia el textarea después de enviar
      } else {
        alert('Por favor, escribe un motivo para el reporte.');
      }
    });
  }
  /* ===== ✨ FIN DE LA NUEVA SECCIÓN ✨ ===== */


  /* ===== Lógica para cerrar menús al hacer clic fuera ===== */
  document.addEventListener('click', (e) => {
    // Cierra el menú de hamburguesa
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
    // Cierra el popover de perfil
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      closePopover();
    }
    // No es necesario añadir lógica para el modal de reporte aquí, ya que el overlay lo maneja.
  });
  
  /* ===== Cierra pop-ups con la tecla Escape (ACTUALIZADO) ===== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { 
      // Cierra el popover de perfil si está abierto
      if (popover && popover.classList.contains('open')) { 
        closePopover(); 
      }
      // Cierra el modal de reporte si está abierto
      if (reportModal && reportModal.classList.contains('visible')) {
        closeReportModal();
      }
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