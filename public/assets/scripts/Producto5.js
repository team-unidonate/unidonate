document.addEventListener('DOMContentLoaded', () => {
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

  const reportBtn = document.getElementById('report-btn');
  const reportModal = document.getElementById('report-modal');
  const overlay = document.getElementById('report-overlay');
  const reportForm = document.getElementById('report-form');

  const openReportModal = () => {
    reportModal.classList.add('visible');
    overlay.classList.add('visible');
  };

  const closeReportModal = () => {
    reportModal.classList.remove('visible');
    overlay.classList.remove('visible');
  };

  if (reportBtn && reportModal && overlay && reportForm) {
    reportBtn.addEventListener('click', openReportModal);

    overlay.addEventListener('click', closeReportModal);

    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const reason = document.getElementById('report-reason').value;
      if (reason.trim() !== '') {
        alert('Reporte enviado. Gracias por tu feedback.');
        closeReportModal();
        reportForm.reset();
      } else {
        alert('Por favor, escribe un motivo para el reporte.');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }

    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      closePopover();
    }

  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { 
      if (popover && popover.classList.contains('open')) { 
        closePopover(); 
      }
      if (reportModal && reportModal.classList.contains('visible')) {
        closeReportModal();
      }
    }
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

  const likeBtn = document.getElementById('like-btn');

  if (likeBtn) {
    const isLiked = localStorage.getItem('product_1_liked') === 'true';
    if (isLiked) {
      likeBtn.classList.add('liked');
    }

    likeBtn.addEventListener('click', () => {
      likeBtn.classList.toggle('liked');
      
      if (likeBtn.classList.contains('liked')) {
        localStorage.setItem('product_1_liked', 'true');
        console.log("👍 Like agregado");
      } else {
        localStorage.setItem('product_1_liked', 'false');
        console.log("👎 Like removido");
      }
    });
  }

  const publisherLink = document.getElementById('publisher-trigger');
  const userModal = document.getElementById('user-profile-modal');
  const userOverlay = document.getElementById('user-profile-overlay');
  const closeUserBtn = document.getElementById('close-profile-modal');

  if (publisherLink && userModal && userOverlay) {
    
    publisherLink.addEventListener('click', (e) => {
      e.preventDefault();
      userModal.classList.add('visible');
      userOverlay.classList.add('visible');
    });

    const closeUserModal = () => {
      userModal.classList.remove('visible');
      userOverlay.classList.remove('visible');
    };

    if (closeUserBtn) closeUserBtn.addEventListener('click', closeUserModal);
    userOverlay.addEventListener('click', closeUserModal);
  }