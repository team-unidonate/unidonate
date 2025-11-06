document.addEventListener('DOMContentLoaded', () => {
  /* ===== Lógica del Header (CORREGIDA Y COMPLETA) ===== */
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
      perfilBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  /* ===== Lógica del Chatbot de Ayuda (SIN CAMBIOS) ===== */
  const messageList = document.getElementById('message-list');
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');

  if (messageList && messageForm && messageInput) {
    const botResponses = {
      "hola": "¡Hola! Soy tu asistente de UniDonate. ¿Cómo puedo ayudarte? Puedes preguntarme sobre 'publicar', 'solicitar' o 'contraseña'.",
      "publicar": "Para publicar una donación, ve a la sección 'Publicar', completa el formulario con los detalles del artículo, sube una foto y haz clic en 'Publicar'. ¡Es así de fácil!",
      "solicitar": "Para solicitar un artículo, navega por la sección 'Explorar'. Cuando encuentres algo que te interese, haz clic en 'Ver detalles' y luego en 'Solicitar y chatear' para contactar al donante.",
      "contraseña": "Puedes cambiar tu contraseña en la sección 'Perfil'. Busca la opción de seguridad o configuración de la cuenta.",
      "gracias": "¡De nada! Si tienes otra pregunta, no dudes en consultarme.",
      "default": "Lo siento, no he entendido tu pregunta. Por favor, intenta reformularla. Puedes preguntarme sobre 'publicar', 'solicitar' o 'contraseña'."
    };

    const addMessage = (sender, content) => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', `message--${sender}`);
      let bubbleContent = '';
      if (sender === 'bot' || sender === 'typing') {
        bubbleContent += `<div class="message__avatar"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2zm-2 4h8v2H8v-2z"></path></svg></div>`;
      }
      bubbleContent += `<div class="message__bubble">${content}</div>`;
      messageDiv.innerHTML = bubbleContent;
      if (sender === 'typing') {
        messageDiv.id = 'typing-indicator';
        messageDiv.classList.add('message--typing');
      }
      messageList.appendChild(messageDiv);
      messageList.scrollTop = messageList.scrollHeight;
    };

    const getBotResponse = (userInput) => {
      const text = userInput.toLowerCase();
      for (const key in botResponses) {
        if (text.includes(key)) { return botResponses[key]; }
      }
      return botResponses.default;
    };

    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userInput = messageInput.value.trim();
      if (userInput === '') return;
      addMessage('user', `<p>${userInput}</p>`);
      messageInput.value = '';
      const typingIndicatorContent = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
      addMessage('typing', typingIndicatorContent);
      setTimeout(() => {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) typingIndicator.remove();
        const response = getBotResponse(userInput);
        addMessage('bot', `<p>${response}</p>`);
      }, 1500);
    });

    setTimeout(() => { addMessage('bot', `<p>¡Hola! Soy tu asistente virtual. Escribe tus dudas para que pueda ayudarte.</p>`); }, 500);
  }

  /* ===== Lógica de Modals del Footer (SIN CAMBIOS) ===== */
  const termsLink = document.getElementById('terms-link');
  const termsModal = document.getElementById('terms-modal');
  const termsOverlay = document.getElementById('terms-overlay');
  const closeModalBtn = document.getElementById('modal-close-btn');

  if (termsLink && termsModal && termsOverlay && closeModalBtn) {
    const openModal = () => { termsModal.classList.add('visible'); termsOverlay.classList.add('visible'); };
    const closeModal = () => { termsModal.classList.remove('visible'); termsOverlay.classList.remove('visible'); };
    termsLink.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
    closeModalBtn.addEventListener('click', closeModal);
    termsOverlay.addEventListener('click', closeModal);
  }

  const privacyLink = document.getElementById('privacy-link');
  const privacyModal = document.getElementById('privacy-modal');
  const privacyOverlay = document.getElementById('privacy-overlay');
  const closePrivacyBtn = document.getElementById('privacy-modal-close-btn');

  if (privacyLink && privacyModal && privacyOverlay && closePrivacyBtn) {
    const openPrivacyModal = () => { privacyModal.classList.add('visible'); privacyOverlay.classList.add('visible'); };
    const closePrivacyModal = () => { privacyModal.classList.remove('visible'); privacyOverlay.classList.remove('visible'); };
    privacyLink.addEventListener('click', (e) => { e.preventDefault(); openPrivacyModal(); });
    closePrivacyBtn.addEventListener('click', closePrivacyModal);
    privacyOverlay.addEventListener('click', closePrivacyModal);
  }
});