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

const btnLogin = document.getElementById('btn-login');
  const inputCorreo = document.getElementById('email-input');
  const inputPass = document.getElementById('password-input');

  if(btnLogin) {
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault();

      if (!inputCorreo.value.trim() || !inputPass.value.trim()) {
        alert("⚠️ Por favor, ingresa tu correo y contraseña para continuar.");
        return; 
      }

      alert(`¡Bienvenido a Uni-Donate! \n\nHas iniciado sesión correctamente como: ${inputCorreo.value}`);

      window.location.href = "Home.html"; 
    });
  }

  const btnForgotPass = document.querySelector('.btn-sec');
  const recoveryModal = document.getElementById('recovery-modal');
  const recoveryOverlay = document.getElementById('recovery-overlay');
  const recoveryCloseBtn = document.getElementById('recovery-close-btn');
  
  const step1 = document.getElementById('recovery-step-1');
  const step2 = document.getElementById('recovery-step-2');
  
  const btnSendCode = document.getElementById('btn-send-code');
  const btnChangePass = document.getElementById('btn-change-pass');
  const inputRecEmail = document.getElementById('rec-email');
  const inputRecCode = document.getElementById('rec-code');
  const inputRecNewPass = document.getElementById('rec-new-pass');

  const openRecoveryModal = () => {
    recoveryModal.classList.add('visible');
    recoveryOverlay.classList.add('visible');
    step1.style.display = 'block';
    step2.style.display = 'none';
    inputRecEmail.value = '';
    inputRecCode.value = '';
    inputRecNewPass.value = '';
  };

  const closeRecoveryModal = () => {
    recoveryModal.classList.remove('visible');
    recoveryOverlay.classList.remove('visible');
  };

  if (btnForgotPass) {
    btnForgotPass.addEventListener('click', (e) => {
      e.preventDefault();
      openRecoveryModal();
    });
  }

  if (recoveryCloseBtn) recoveryCloseBtn.addEventListener('click', closeRecoveryModal);
  if (recoveryOverlay) recoveryOverlay.addEventListener('click', closeRecoveryModal);

  if (btnSendCode) {
    btnSendCode.addEventListener('click', () => {
      const email = inputRecEmail.value.trim();

      if (!email || !email.includes('@') || !email.includes('.')) {
        alert("⚠️ Por favor, ingresa un correo institucional válido.");
        return;
      }

      alert(`✅ Código enviado a: ${email}`);
      
      step1.style.display = 'none';
      step2.style.display = 'block';
    });
  }

  if (btnChangePass) {
    btnChangePass.addEventListener('click', () => {
      const code = inputRecCode.value.trim();
      const newPass = inputRecNewPass.value.trim();

      if (!code || !newPass) {
        alert("⚠️ Por favor, ingresa el código y tu nueva contraseña.");
        return;
      }

      alert("🎉 ¡Contraseña actualizada correctamente!\nAhora puedes iniciar sesión.");
      closeRecoveryModal();
    });
  }