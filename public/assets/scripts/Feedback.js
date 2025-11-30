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
    });
  }

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

  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) nav.classList.remove('open');
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) popover.classList.remove('open');
  });

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

  const feedbackForm = document.getElementById('feedback-form');
  const feedbackText = document.getElementById('feedback-text');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (feedbackText.value.trim() === "") {
        alert("⚠️ Por favor, escribe tu opinión antes de enviar.");
        return;
      }

      alert("✅ ¡Gracias por tu feedback!\nTu opinión nos ayuda a mejorar la comunidad.");
      
      window.location.href = "Notificaciones.html";
    });
  }
});


  const feedbackForm = document.getElementById('feedback-form');
  const feedbackText = document.getElementById('feedback-text');
  
  const starsWrapper = document.getElementById('stars-wrapper');
  const stars = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('rating-value');

  if (starsWrapper && stars.length > 0) {
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const value = parseInt(star.dataset.value);
        ratingInput.value = value;
        updateStars(value);
      });
      
      star.addEventListener('mouseover', () => {
        const value = parseInt(star.dataset.value);
        updateStars(value);
      });
    });

    starsWrapper.addEventListener('mouseleave', () => {
      const savedValue = parseInt(ratingInput.value);
      updateStars(savedValue);
    });

    function updateStars(count) {
      stars.forEach(s => {
        const sVal = parseInt(s.dataset.value);
        if (sVal <= count) {
          s.classList.add('active');
        } else {
          s.classList.remove('active');
        }
      });
    }
  }

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const text = feedbackText.value.trim();
      const rating = parseInt(ratingInput.value);

      if (text === "") {
        alert("⚠️ Por favor, escribe tu opinión antes de enviar.");
        return;
      }

      if (rating === 0) {
        alert("⭐ Por favor, selecciona una calificación de estrellas.");
        return;
      }

      alert(`✅ ¡Gracias por tu feedback!\n\nCalificación: ${rating} estrella(s)\nComentario enviado.`);
      
      window.location.href = "Historial.html";
    });
  }