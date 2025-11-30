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
      console.log('Datos guardados (simulación)');
      closeEditModal();
    });

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

  const btnReward = document.getElementById('btn-get-reward');
  const rewardPopup = document.getElementById('reward-popup');
  const rewardOverlay = document.getElementById('reward-overlay');

  if (btnReward && rewardPopup && rewardOverlay) {
    btnReward.addEventListener('click', () => {
      rewardPopup.classList.add('show');
      rewardOverlay.classList.add('show');

      btnReward.style.display = 'none';

      setTimeout(() => {
        rewardPopup.classList.remove('show');
        rewardOverlay.classList.remove('show');
        btnReward.style.display = 'block';
        btnReward.textContent = "Recompensa Reclamada";
        btnReward.style.backgroundColor = "#ccc";
        btnReward.style.cursor = "default";
        btnReward.disabled = true;
      }, 3000);
    });
    
    rewardOverlay.addEventListener('click', () => {
        rewardPopup.classList.remove('show');
        rewardOverlay.classList.remove('show');
    });
  }

  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const body = document.body;

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    if(darkModeToggle) darkModeToggle.checked = true;
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('change', () => {
      if (darkModeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }