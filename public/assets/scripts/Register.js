document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.addEventListener('click', (e) => {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const dd = document.querySelector('.dropdown');
  if (dd) {
    const btn   = dd.querySelector('.btn-drop');
    const menu = dd.querySelector('.dropdown-menu');
    const val   = dd.querySelector('.drop-value');

    btn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        val.textContent = a.getAttribute('data-value') || a.textContent.trim();
        dd.classList.remove('open');
        btn?.setAttribute('aria-expanded','false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        btn?.setAttribute('aria-expanded','false');
      }
    });
  }
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

  const btnRegister = document.getElementById('btn-register');
  const inputName = document.getElementById('name-input');
  const inputEmail = document.getElementById('email-input');
  const inputPass = document.getElementById('password-input');
  const sedeValue = document.getElementById('sede-value');

  if (btnRegister) {
    btnRegister.addEventListener('click', (e) => {
      e.preventDefault();

      const nombre = inputName.value.trim();
      const correo = inputEmail.value.trim();
      const pass = inputPass.value.trim();
      const sede = sedeValue.textContent.trim();

      if (!nombre || !correo || !pass) {
        alert("⚠️ Por favor, completa todos los campos.");
        return;
      }

      if (!correo.endsWith('@universidad.edu.pe') && !correo.endsWith('@upc.edu.pe')) {
        alert("⛔ Error: Debes usar un correo institucional válido (ej: @universidad.edu.pe).");
        return;
      }

      if (pass.length < 4) {
        alert("⚠️ La contraseña es muy corta.");
        return;
      }

      alert(`¡Cuenta creada con éxito, ${nombre}!\n\nSede registrada: ${sede}\nAhora puedes iniciar sesión.`);
      
      window.location.href = "Login.html"; 
    });
  }