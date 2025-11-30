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
      if (nav?.classList.contains('open')) {
        nav.classList.remove('open');
        toggleBtn?.setAttribute('aria-expanded', 'false');
      }
      popover.classList.contains('open') ? closePopover() : openPopover();
    });
  }

  document.addEventListener('click', (e) => {
    if (nav?.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }

    if (popover?.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
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

    const CONTEXTO_UNIDONATE = `
UNIDONATE — ASISTENTE VIRTUAL OFICIAL
-------------------------------------------

DESCRIPCIÓN GENERAL
UniDonate es una plataforma universitaria que permite a los estudiantes donar y solicitar materiales académicos que ya no usan. Su objetivo es fomentar la reutilización, reducir gastos estudiantiles y promover sostenibilidad dentro de la comunidad universitaria.

El sistema funciona mediante cuentas validadas con correo institucional y un chat interno seguro para coordinar entregas.

OBJETIVOS PRINCIPALES
- Facilitar la reutilización de materiales académicos.
- Reducir costos para los estudiantes.
- Brindar un entorno seguro y confiable para intercambios.
- Establecer un sistema organizado de donaciones dentro del campus.

TIPOS DE USUARIOS
1. Donantes: estudiantes que ya no necesitan un material y desean donarlo.
2. Solicitantes: estudiantes que necesitan un material disponible en la plataforma.

FUNCIONES DEL SISTEMA
1. **Registro e inicio de sesión**
   - Cuenta creada con correo institucional.
   - Validación de identidad.
   - Recuperación de contraseña.

2. **Publicación de donaciones**
   - Subida de 1 o más fotos.
   - Campos: categoría, estado del artículo, descripción, nombre del material.
   - Confirmación y publicación inmediata.
   - Edición o eliminación de publicaciones.

3. **Exploración de artículos**
   - Lista de materiales disponibles.
   - Filtros por categoría, estado y relevancia.
   - Vista detallada con foto, descripción y datos del donante.

4. **Solicitud de artículo**
   - Botón “Solicitar”.
   - Se abre un chat directo con el donante.
   - El donante aprueba o rechaza la solicitud.
   - Coordinación de lugar, fecha y hora de entrega.

5. **Chat interno**
   - Mensajería instantánea entre estudiantes.
   - Solo se habilita cuando se solicita un artículo.
   - Evita compartir datos personales externos.

6. **Perfil del usuario**
   - Foto, nombre y correo institucional.
   - Historial de donaciones realizadas.
   - Historial de solicitudes aceptadas.
   - Configuración básica de privacidad.

7. **Validaciones del sistema**
   - No se puede solicitar un artículo dos veces.
   - Solo estudiantes universitarios pueden entrar.
   - No se permite contenido ofensivo o material no académico.
   - Los donantes tienen control sobre aprobar solicitudes.

FLUJOS COMPLETOS DEL SISTEMA
--------------------------------------

FLUJO 1: REGISTRO
1. Usuario ingresa correo institucional.
2. Crea contraseña.
3. Verifica su identidad.
4. Accede al sistema.

FLUJO 2: PUBLICAR MATERIAL
1. Usuario entra a “Publicar”.
2. Sube foto(s) del artículo.
3. Llena datos: nombre, categoría, estado y descripción.
4. Guarda → se publica en la sección “Explorar”.

FLUJO 3: SOLICITAR MATERIAL
1. Usuario navega en “Explorar”.
2. Selecciona un artículo.
3. Presiona “Solicitar y chatear”.
4. Se abre chat con el donante.
5. Donante decide: aceptar o rechazar.
6. Si acepta → coordinan entrega.

FLUJO 4: CHAT
1. Ambos usuarios pueden enviar mensajes.
2. Coordinan detalles de entrega.
3. Cuando finaliza la entrega, el donante puede marcar el artículo como “Entregado”.

FLUJO 5: PERFIL
1. Usuario entra a su perfil.
2. Puede editar foto, ver historial, cerrar sesión.

PANTALLAS PRINCIPALES
- Página principal / landing.
- Registro.
- Login.
- Página de publicación.
- Exploración de artículos.
- Vista detallada de artículo.
- Chat interno.
- Perfil del usuario.

RESPUESTAS QUE EL BOT PUEDE DAR
-------------------------------------
El asistente virtual puede explicar:
- Cómo publicar.
- Cómo solicitar.
- Cómo funciona el chat.
- Qué categorías existen.
- Cómo recuperar contraseña.
- Qué hacer si un usuario no responde.
- Qué hacer si una publicación tiene error.
- Cómo editar o eliminar un artículo publicado.
- Qué hace cada sección de la página.
- Qué materiales se pueden donar.

RESTRICCIONES DEL BOT
-------------------------------------
- SOLO responde sobre UniDonate.
- Si el usuario pregunta algo fuera del proyecto responde:
  “Solo puedo responder preguntas relacionadas con UniDonate.”
- No inventa funciones, pantallas, ni características no mencionadas en este contexto.
- No da información personal de usuarios.
- No responde dudas de matemáticas, física, programación, firmas, música, etc.
- No explica cómo funciona Gemini, HTML, JS ni programación (salvo que sea sobre UniDonate).
- Debe mantener respuestas claras, breves y específicas.
- Siempre responder en español.
- Si el usuario dice algo ofensivo, el bot responde amablemente y redirige al objetivo:
  “Estoy aquí para ayudarte con UniDonate. ¿En qué puedo apoyarte?”

TONO DEL BOT
-------------------------------------
- Formal pero amigable.
- No usa tecnicismos excesivos.
- Da pasos claros cuando explica procesos.
- Evita parágrafos largos; responde directo al punto.

EJEMPLOS DE RESPUESTA
-------------------------------------
Usuario: “¿Cómo publico un libro?”
Bot: “Ve a la sección ‘Publicar’, sube una foto del libro, completa los datos y presiona ‘Publicar’. Tu publicación aparecerá en ‘Explorar’.”

Usuario: “¿Puedo donar ropa?”
Bot: “No. UniDonate solo permite donaciones de materiales académicos.”

Usuario: “¿Qué pasa si el donante no responde?”
Bot: “Puedes cancelar la solicitud y elegir otro artículo disponible.”

-------------------------------------
FIN DEL CONTEXTO.
`;

    async function getBotResponse(userInput) {
      const apiKey = "AIzaSyCF0zd-Y7aF4wn7ppMNsJsdcUxphviEQnI";

      const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const body = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `
                  CONTEXTO:
                  ${CONTEXTO_UNIDONATE}

                  PREGUNTA DEL USUARIO:
                  ${userInput}
                `
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

    messageForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const userInput = messageInput.value.trim();
      if (userInput === '') return;

      addMessage('user', `<p>${userInput}</p>`);
      messageInput.value = '';

      addMessage(
        'typing',
        `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`
      );

      const botReply = await getBotResponse(userInput);

      const typingIndicator = document.getElementById('typing-indicator');
      if (typingIndicator) typingIndicator.remove();

      addMessage('bot', `<p>${botReply}</p>`);
    });

    setTimeout(() => {
      addMessage('bot', `<p>¡Hola! Soy tu asistente de UniDonate. ¿En qué puedo ayudarte?</p>`);
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
