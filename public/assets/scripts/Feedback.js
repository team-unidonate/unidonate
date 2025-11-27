document.addEventListener('DOMContentLoaded', () => {
  
  /* ===========================================================
     1. LÓGICA COMÚN (Header, Menú, Popover, Modales)
     =========================================================== */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  // Menú Hamburguesa
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
    });
  }

  // Popover Perfil
  if (perfilBtn && popover) {
    const openPopover = () => {
      const rect = perfilBtn.getBoundingClientRect();
      popover.style.top = `${rect.bottom + 8}px`;
      popover.classList.add('open');
    };
    const closePopover = () => popover.classList.remove('open');

    perfilBtn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (nav && nav.classList.contains('open')) nav.classList.remove('open');
      popover.classList.contains('open') ? closePopover() : openPopover();
    });
  }

  // Cerrar al clic fuera
  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) nav.classList.remove('open');
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) popover.classList.remove('open');
  });

  // Modales Footer
  const setupModal = (triggerId, modalId, overlayId, closeId) => {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById(overlayId);
    const closeBtn = document.getElementById(closeId);
    if (trigger && modal && overlay) {
      const close = () => { modal.classList.remove('visible'); overlay.classList.remove('visible'); };
      trigger.addEventListener('click', (e) => { e.preventDefault(); modal.classList.add('visible'); overlay.classList.add('visible'); });
      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', close);
    }
  };
  setupModal('terms-link', 'terms-modal', 'terms-overlay', 'modal-close-btn');
  setupModal('privacy-link', 'privacy-modal', 'privacy-overlay', 'privacy-modal-close-btn');


  /* ===========================================================
     2. LÓGICA DEL FORMULARIO DE FEEDBACK
     =========================================================== */
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackText = document.getElementById('feedback-text');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (feedbackText.value.trim() === "") {
        alert("⚠️ Por favor, escribe tu opinión antes de enviar.");
        return;
      }

      // Simulación de envío
      alert("✅ ¡Gracias por tu feedback!\nTu opinión nos ayuda a mejorar la comunidad.");
      
      // Redirigir (ej: al historial o home)
      window.location.href = "Notificaciones.html";
    });
  }
});


/* ===========================================================
     2. LÓGICA DE FEEDBACK Y ESTRELLAS
     =========================================================== */
  const feedbackForm = document.getElementById('feedback-form');
  const feedbackText = document.getElementById('feedback-text');
  
  // Elementos de estrellas
  const starsWrapper = document.getElementById('stars-wrapper');
  const stars = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('rating-value');

  // Lógica de interacción con estrellas
  if (starsWrapper && stars.length > 0) {
    stars.forEach(star => {
      // Al hacer clic en una estrella
      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        ratingInput.value = value; // Guardar valor en input oculto
        updateStars(value);
      });
      
      // (Opcional) Efecto hover visual simple
      star.addEventListener('mouseover', () => {
        const value = parseInt(star.dataset.value);
        updateStars(value);
      });
    });

    // Al salir del contenedor, volver a la selección guardada
    starsWrapper.addEventListener('mouseleave', () => {
      const savedValue = parseInt(ratingInput.value);
      updateStars(savedValue);
    });

    function updateStars(count) {
      stars.forEach(s => {
        const sVal = parseInt(s.dataset.value);
        if (sVal <= count) {
          s.classList.add('active'); // Pinta de dorado
        } else {
          s.classList.remove('active'); // Deja en gris
        }
      });
    }
  }

  // Envío del formulario
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = feedbackText.value.trim();
      const rating = parseInt(ratingInput.value);

      // Validación 1: Texto vacío
      if (text === "") {
        alert("⚠️ Por favor, escribe tu opinión antes de enviar.");
        return;
      }

      // Validación 2: Sin estrellas (Rating = 0)
      if (rating === 0) {
        alert("⭐ Por favor, selecciona una calificación de estrellas.");
        return;
      }

      // Simulación de éxito
      alert(`✅ ¡Gracias por tu feedback!\n\nCalificación: ${rating} estrella(s)\nComentario enviado.`);
      
      // Redirigir (al historial o home)
      window.location.href = "Historial.html";
    });
  }