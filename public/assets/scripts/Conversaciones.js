document.addEventListener('DOMContentLoaded', () => {
  /* ===== Lógica del Header (REUTILIZADO) ===== */
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

  /* ===== NUEVO: Lógica del Pop-up de Conversaciones ===== */
  const chatItems = document.querySelectorAll('.chat-item');
  const popup = document.getElementById('chat-action-popup');
  const overlay = document.getElementById('page-overlay');
  const popupTitle = document.getElementById('popup-title');
  const changeStateBtn = document.getElementById('popup-change-state');
  const closeBtn = document.getElementById('popup-close');
  let currentItem = null; // Para saber qué conversación estamos editando

  // Función para abrir el pop-up
  const openPopup = (item) => {
    currentItem = item; // Guardamos la referencia al item actual
    const title = item.dataset.title;
    const status = item.dataset.status;

    // Actualizamos el contenido del pop-up
    popupTitle.textContent = title;
    changeStateBtn.textContent = status === 'entregado' ? 'Marcar como Pendiente' : 'Marcar como Entregado';
    
    // Mostramos el pop-up y el overlay
    popup.classList.add('visible');
    overlay.classList.add('visible');
  };

  // Función para cerrar el pop-up
  const closePopup = () => {
    popup.classList.remove('visible');
    overlay.classList.remove('visible');
    currentItem = null; // Limpiamos la referencia
  };

  // Asignamos el evento a cada item de conversación
  chatItems.forEach(item => {
    item.addEventListener('click', () => {
      openPopup(item);
    });
  });

  // Evento para el botón de cambiar estado
  changeStateBtn.addEventListener('click', () => {
    if (!currentItem) return;

    const currentStatus = currentItem.dataset.status;
    const newStatus = currentStatus === 'entregado' ? 'pendiente' : 'entregado';
    const statusElement = currentItem.querySelector('.chat-item__status');

    // Actualizamos el estado en el HTML
    currentItem.dataset.status = newStatus;
    
    // Actualizamos la apariencia visual
    if (newStatus === 'entregado') {
      currentItem.classList.add('state--entregado');
      statusElement.textContent = 'Estado: Entregado';
    } else {
      currentItem.classList.remove('state--entregado');
      statusElement.textContent = 'Estado: Pendiente';
    }

    closePopup(); // Cerramos el pop-up después de la acción
  });
  
  // Eventos para cerrar el pop-up
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);

  /* ===== Lógica para cerrar menús del header al hacer clic fuera ===== */
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