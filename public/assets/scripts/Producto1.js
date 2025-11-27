document.addEventListener('DOMContentLoaded', () => {
  /* ===== Lógica del Header (REUTILIZADO) ===== */
  // ... (tu código existente para el header y el popover de perfil va aquí) ...

  /* ===== NUEVO: Lógica del Modal de Reporte ===== */
  const reportBtn = document.getElementById('report-btn');
  const reportModal = document.getElementById('report-modal');
  const overlay = document.getElementById('report-overlay');
  const reportForm = document.getElementById('report-form');

  // Función para abrir el modal
  const openReportModal = () => {
    reportModal.classList.add('visible');
    overlay.classList.add('visible');
  };

  // Función para cerrar el modal
  const closeReportModal = () => {
    reportModal.classList.remove('visible');
    overlay.classList.remove('visible');
  };

  if (reportBtn && reportModal && overlay) {
    // Abrir el modal al hacer clic en "REPORTAR"
    reportBtn.addEventListener('click', openReportModal);

    // Cerrar el modal al hacer clic en el fondo oscuro
    overlay.addEventListener('click', closeReportModal);

    // Manejar el envío del formulario
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


/* ===========================================================
     LÓGICA DEL BOTÓN LIKE (US29)
     =========================================================== */
  const likeBtn = document.getElementById('like-btn');

  if (likeBtn) {
    // Revisar si ya le dio like antes (Opcional: persistencia simple)
    const isLiked = localStorage.getItem('product_1_liked') === 'true';
    if (isLiked) {
      likeBtn.classList.add('liked');
    }

    likeBtn.addEventListener('click', () => {
      // Alternar clase visual
      likeBtn.classList.toggle('liked');
      
      // Guardar estado y dar feedback
      if (likeBtn.classList.contains('liked')) {
        localStorage.setItem('product_1_liked', 'true');
        // Opcional: Pequeña animación o mensaje
        console.log("👍 Like agregado");
      } else {
        localStorage.setItem('product_1_liked', 'false');
        console.log("👎 Like removido");
      }
    });
  }