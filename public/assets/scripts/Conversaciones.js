document.addEventListener('DOMContentLoaded', () => {
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

  const chatItems = document.querySelectorAll('.chat-item');
  const popup = document.getElementById('chat-action-popup');
  const overlay = document.getElementById('page-overlay');
  const popupTitle = document.getElementById('popup-title');
  const changeStateBtn = document.getElementById('popup-change-state');
  const closeBtn = document.getElementById('popup-close');
  let currentItem = null; 

  const openPopup = (item) => {
    currentItem = item;
    const title = item.dataset.title;
    const status = item.dataset.status;

    popupTitle.textContent = title;
    changeStateBtn.textContent = status === 'entregado' ? 'Marcar como Pendiente' : 'Marcar como Entregado';
    
    popup.classList.add('visible');
    overlay.classList.add('visible');
  };

  const closePopup = () => {
    popup.classList.remove('visible');
    overlay.classList.remove('visible');
    currentItem = null;
  };

  chatItems.forEach(item => {
    item.addEventListener('click', () => {
      openPopup(item);
    });
  });

  changeStateBtn.addEventListener('click', () => {
    if (!currentItem) return;

    const currentStatus = currentItem.dataset.status;
    const newStatus = currentStatus === 'entregado' ? 'pendiente' : 'entregado';
    const statusElement = currentItem.querySelector('.chat-item__status');

    currentItem.dataset.status = newStatus;
    
    if (newStatus === 'entregado') {
      currentItem.classList.add('state--entregado');
      statusElement.textContent = 'Estado: Entregado';
      
      alert(`✅ ¡Excelente! Has marcado "${currentItem.dataset.title}" como ENTREGADO.\n\nGracias por completar la donación.`);
      
    } else {
      currentItem.classList.remove('state--entregado');
      statusElement.textContent = 'Estado: Pendiente';
    }

    closePopup();
  });
  
  closeBtn.addEventListener('click', closePopup);
  overlay.addEventListener('click', closePopup);

  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) nav.classList.remove('open');
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) popover.classList.remove('open');
  });
});

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
  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeModalBtn.addEventListener('click', closeModal);

  termsOverlay.addEventListener('click', closeModal);
}

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
  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    openPrivacyModal();
  });

  closePrivacyBtn.addEventListener('click', closePrivacyModal);

  privacyOverlay.addEventListener('click', closePrivacyModal);
}