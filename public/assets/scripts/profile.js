document.addEventListener('DOMContentLoaded', () => {
  /* ===== Lógica del Header (Menú hamburguesa y Popover de Perfil) REUTILIZADO ===== */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => { e.stopPropagation(); nav.classList.toggle('open'); });
  }

  if (perfilBtn && popover) {
    const openPopover = () => { popover.classList.add('open'); };
    const closePopover = () => { popover.classList.remove('open'); };
    perfilBtn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      popover.classList.contains('open') ? closePopover() : openPopover();
    });
  }

  /* ===== NUEVO: Lógica del Modal de Edición ===== */
  const editButton = document.getElementById('edit-button');
  const editFormContainer = document.getElementById('inline-edit-section');
  const overlay = document.getElementById('page-overlay');
  const cancelButton = document.getElementById('cancel-edit-button');
  const saveButton = document.getElementById('save-edit-button');
  const editForm = document.getElementById('inline-edit-form');
  const fileUpload = document.getElementById('edit-foto-upload');
  const imagePreview = document.getElementById('edit-foto-preview');

  const openEditModal = () => {
    editFormContainer.classList.add('visible');
    overlay.classList.add('visible');
  };

  const closeEditModal = () => {
    editFormContainer.classList.remove('visible');
    overlay.classList.remove('visible');
  };

  if (editButton && editFormContainer && overlay) {
    editButton.addEventListener('click', (e) => {
      e.preventDefault();
      openEditModal();
    });

    cancelButton.addEventListener('click', closeEditModal);
    overlay.addEventListener('click', closeEditModal);

    editForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Aquí iría la lógica para guardar los datos en el servidor
      console.log('Datos guardados (simulación)');
      closeEditModal();
    });

    // Vista previa de la imagen al seleccionarla
    fileUpload.addEventListener('change', () => {
      const file = fileUpload.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  /* ===== Lógica para cerrar menús al hacer clic fuera ===== */
  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) nav.classList.remove('open');
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) popover.classList.remove('open');
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
