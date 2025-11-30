document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  if (perfilBtn && popover) {
    const openPopover = () => {
      const rect = perfilBtn.getBoundingClientRect();
      popover.style.top = `${rect.bottom + 8}px`;
      popover.classList.add('open');
      perfilBtn.setAttribute('aria-expanded', 'true');
    };
    const closePopover = () => {
      popover.classList.remove('open');
      perfilBtn.setAttribute('aria-expanded', 'false');
    };

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

  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }

    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      popover.classList.remove('open');
      perfilBtn?.setAttribute('aria-expanded', 'false');
    }
  });

  const messageList = document.getElementById('message-list');
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');

  if (messageList && messageForm && messageInput) {
  const addMessage = (sender, content) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `message--${sender}`);

    let bubbleContent = '';
    if (sender === 'bot' || sender === 'typing') {
      bubbleContent += `
        <div class="message__avatar">
          <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                     10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8
                     s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9h4v2h-4v-2zm-2 4h8v2H8v-2z">
            </path>
          </svg>
        </div>`;
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

  // 🔹 Llamada a Gemini por fetch
  async function getBotResponse(userInput) {
    const apiKey = "AIzaSyCF0zd-Y7aF4wn7ppMNsJsdcUxphviEQnI"; // <-- pega tu clave nueva AQUÍ

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const body = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text:
                "Actúa como asistente de la plataforma UniDonate. " +
                "Responde de forma corta, clara y en español. " +
                "Pregunta del usuario: " + userInput
            }
          ]
        }
      ]
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (!res.ok) {
        console.error("Error HTTP Gemini:", res.status, await res.text());
        return "Ocurrió un error al conectar con el servicio de IA.";
      }

      const data = await res.json();

      const parts = data.candidates?.[0]?.content?.parts || [];
      const text =
        parts.map((p) => p.text || "").join(" ").trim() ||
        "No entendí, ¿puedes repetirlo?";

      return text;
    } catch (e) {
      console.error("Error fetch Gemini:", e);
      return "Hubo un error al conectarme con Gemini.";
    }
  }

  // 🔹 Envío del formulario
  messageForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = messageInput.value.trim();
    if (userInput === '') return;

    // Mensaje del usuario
    addMessage('user', `<p>${userInput}</p>`);
    messageInput.value = '';

    // Indicador "escribiendo..."
    addMessage(
      'typing',
      `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`
    );

    // Llamar a Gemini
    const botReply = await getBotResponse(userInput);

    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) typingIndicator.remove();

    addMessage('bot', `<p>${botReply}</p>`);
  });

  // Mensaje inicial del bot
  setTimeout(() => {
    addMessage('bot', `<p>¡Hola! Soy tu asistente virtual. Escribe tus dudas para que pueda ayudarte.</p>`);
  }, 500);
  }

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