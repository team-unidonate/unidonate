const toggleBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');

toggleBtn.addEventListener('click', () => {
const open = nav.classList.toggle('open');
toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
nav.querySelectorAll('a').forEach(a => {
a.addEventListener('click', () => {
nav.classList.remove('open');
toggleBtn.setAttribute('aria-expanded', 'false');
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