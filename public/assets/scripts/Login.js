document.addEventListener('DOMContentLoaded', () => {
  /* ========= Menú hamburguesa ========= */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');

  if (toggleBtn && nav) {
    // 1. Abrir/cerrar al hacer click en el botón
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que el click se propague al documento
      const isOpen = nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // 2. Cerrar al hacer click en un enlace del menú
    nav.addEventListener('click', (e) => {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
    });

    // 3. Cerrar al hacer click fuera del menú
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggleBtn.contains(e.target)) {
        nav.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
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

/* ====== LÓGICA DE INICIO DE SESIÓN (LOGIN) ====== */
const btnLogin = document.getElementById('btn-login');
  const inputCorreo = document.getElementById('email-input');
  const inputPass = document.getElementById('password-input');

  if(btnLogin) {
    btnLogin.addEventListener('click', (e) => {
      e.preventDefault(); // Evita que el formulario se envíe solo

      // Validación: Que los campos no estén vacíos
      if (!inputCorreo.value.trim() || !inputPass.value.trim()) {
        alert("⚠️ Por favor, ingresa tu correo y contraseña para continuar.");
        return; 
      }

      // Mensaje de Bienvenida (Simulación de éxito)
      alert(`¡Bienvenido a Uni-Donate! \n\nHas iniciado sesión correctamente como: ${inputCorreo.value}`);

      // Redirección a la carpeta assets (Ruta relativa)
      window.location.href = "Home.html"; 
    });
  }


/* ===========================================================
     LÓGICA DE RECUPERACIÓN DE CONTRASEÑA (Pop-up Flujo)
     =========================================================== */
  
  // Elementos del DOM
  const btnForgotPass = document.querySelector('.btn-sec'); // El botón "RECUPERAR CONTRASEÑA" del form principal
  const recoveryModal = document.getElementById('recovery-modal');
  const recoveryOverlay = document.getElementById('recovery-overlay');
  const recoveryCloseBtn = document.getElementById('recovery-close-btn');
  
  // Elementos de los pasos
  const step1 = document.getElementById('recovery-step-1');
  const step2 = document.getElementById('recovery-step-2');
  
  // Inputs y Botones del Modal
  const btnSendCode = document.getElementById('btn-send-code');
  const btnChangePass = document.getElementById('btn-change-pass');
  const inputRecEmail = document.getElementById('rec-email');
  const inputRecCode = document.getElementById('rec-code');
  const inputRecNewPass = document.getElementById('rec-new-pass');

  // Funciones de Abrir/Cerrar Modal
  const openRecoveryModal = () => {
    recoveryModal.classList.add('visible');
    recoveryOverlay.classList.add('visible');
    // Resetear a paso 1 siempre que se abre
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

  // Eventos de Apertura
  if (btnForgotPass) {
    btnForgotPass.addEventListener('click', (e) => {
      e.preventDefault(); // Evita submit si está dentro de form
      openRecoveryModal();
    });
  }

  // Eventos de Cierre
  if (recoveryCloseBtn) recoveryCloseBtn.addEventListener('click', closeRecoveryModal);
  if (recoveryOverlay) recoveryOverlay.addEventListener('click', closeRecoveryModal);

  // --- LÓGICA PASO 1: Enviar Código ---
  if (btnSendCode) {
    btnSendCode.addEventListener('click', () => {
      const email = inputRecEmail.value.trim();

      // Validación simple de correo
      if (!email || !email.includes('@') || !email.includes('.')) {
        alert("⚠️ Por favor, ingresa un correo institucional válido.");
        return;
      }

      // Simulación de envío
      alert(`✅ Código enviado a: ${email}`);
      
      // Cambio de vista al PASO 2
      step1.style.display = 'none';
      step2.style.display = 'block';
    });
  }

  // --- LÓGICA PASO 2: Cambiar Contraseña ---
  if (btnChangePass) {
    btnChangePass.addEventListener('click', () => {
      const code = inputRecCode.value.trim();
      const newPass = inputRecNewPass.value.trim();

      if (!code || !newPass) {
        alert("⚠️ Por favor, ingresa el código y tu nueva contraseña.");
        return;
      }

      // Simulación de éxito
      alert("🎉 ¡Contraseña actualizada correctamente!\nAhora puedes iniciar sesión.");
      closeRecoveryModal();
    });
  }