document.addEventListener('DOMContentLoaded', () => {
  /* ===== Lógica del Header (Menú hamburguesa y Popover de Perfil) ===== */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  // 1. Lógica para el Menú Hamburguesa
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que el clic se propague
      nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // 2. Lógica para el Pop-up de Perfil
  if (perfilBtn && popover) {
    const openPopover = () => {
      const rect = perfilBtn.getBoundingClientRect();
      popover.style.top = `${rect.bottom + 8}px`; // Ajusta la posición
      popover.classList.add('open');
      perfilBtn.setAttribute('aria-expanded', 'true');
    };
    const closePopover = () => {
      popover.classList.remove('open');
      perfilBtn.setAttribute('aria-expanded', 'false');
    };

    perfilBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // Evita que el clic se propague
      // Si el menú hamburguesa está abierto, lo cierra primero
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggleBtn?.setAttribute('aria-expanded', 'false');
      }
      // Alterna el estado del pop-up de perfil
      popover.classList.contains('open') ? closePopover() : openPopover();
    });
  }

  /* ===== ✨ INICIO DE LA CORRECCIÓN ✨ ===== */
  // 3. Lógica para cerrar los menús al hacer clic fuera
  document.addEventListener('click', (e) => {
    // Cierra el menú de hamburguesa si el clic es fuera del header
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }

    // Cierra el pop-up de perfil si el clic es fuera del pop-up Y fuera del botón de perfil
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      popover.classList.remove('open');
      perfilBtn.setAttribute('aria-expanded', 'false');
    }
  });
  /* =====  FIN DE LA CORRECCIÓN  ===== */
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

/* ===========================================================
     LÓGICA DEL CHAT 
     =========================================================== */
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  const messageList = document.getElementById('message-list');
  const attachBtn = document.getElementById('attach-btn');
  const fileInput = document.getElementById('file-input');

  if (messageForm && messageInput && messageList) {
    
    // Función para agregar mensaje al DOM
    const appendMessage = (text, type = 'sent') => {
      const msgDiv = document.createElement('div');
      msgDiv.className = `message message--${type}`;
      msgDiv.innerHTML = `<p>${text}</p>`;
      messageList.appendChild(msgDiv);
      // Auto-scroll al final
      messageList.scrollTop = messageList.scrollHeight;
    };

    // 1. Enviar mensaje (Texto)
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita recargar la página
      
      const text = messageInput.value.trim();
      if (text !== "") {
        // Agrega mensaje del usuario (derecha)
        appendMessage(text, 'sent');
        messageInput.value = ""; // Limpia el input

        // Simulación de respuesta automática (opcional, para demo)
        setTimeout(() => {
          appendMessage("¡Entendido! Gracias por tu mensaje.", 'received');
        }, 1500);
      }
    });

    // 2. Adjuntar archivo (Simulación US22)
    if (attachBtn && fileInput) {
      attachBtn.addEventListener('click', () => {
        fileInput.click(); // Abre el selector de archivos nativo
      });

      fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
          const fileName = fileInput.files[0].name;
          // Simula el envío del archivo como mensaje de texto
          appendMessage(`📎 Archivo adjunto: <strong>${fileName}</strong>`, 'sent');
          fileInput.value = ""; // Resetea el input
        }
      });
    }
  }