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

  const teamLink = document.getElementById('about-team-link');
  const videoModal = document.getElementById('video-modal');
  const videoOverlay = document.getElementById('video-overlay');
  const closeVideoBtn = document.getElementById('video-close-btn');
  const videoIframe = document.getElementById('team-video-iframe');
  
  const videoURL = "https://www.youtube.com/embed/67lnSrwIOCI?autoplay=1";

  if (teamLink && videoModal && videoOverlay) {
    
    const openVideo = (e) => {
      e.preventDefault();
      videoModal.classList.add('visible');
      videoOverlay.classList.add('visible');
      videoIframe.src = videoURL;
    };

    const closeVideo = () => {
      videoModal.classList.remove('visible');
      videoOverlay.classList.remove('visible');
      videoIframe.src = "";
    };

    teamLink.addEventListener('click', openVideo);
    closeVideoBtn.addEventListener('click', closeVideo);
    videoOverlay.addEventListener('click', closeVideo);
  }

  const contactSubmit = document.getElementById('contact-submit');
  const contactName = document.getElementById('contact-name');
  const contactEmail = document.getElementById('contact-email');
  const contactMessage = document.getElementById('contact-message');

  if (contactSubmit) {
    contactSubmit.addEventListener('click', (e) => {
      e.preventDefault();

      
      if (contactName.value.trim() === "" || 
          contactEmail.value.trim() === "" || 
          contactMessage.value.trim() === "") {
        alert("⚠️ Por favor, completa todos los campos antes de enviar.");
        return;
      }

      
      if (!contactEmail.value.includes('@')) {
        alert("⚠️ Por favor, ingresa un correo válido.");
        return;
      }

      
      alert(`✅ ¡Mensaje enviado con éxito!\n\nGracias ${contactName.value}, el equipo de Uni-Donate te contactará pronto.`);
      
      
      contactName.value = "";
      contactEmail.value = "";
      contactMessage.value = "";
    });
  }