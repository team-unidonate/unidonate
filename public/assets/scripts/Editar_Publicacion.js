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

  const imageInput = document.getElementById('image-upload');
  const previewImg = document.getElementById('edit-preview-img');

  if (imageInput && previewImg) {
    imageInput.addEventListener('change', () => {
      const file = imageInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          previewImg.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const editForm = document.getElementById('edit-form');
  const editNombre = document.getElementById('edit-nombre');

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (editNombre && editNombre.value.trim() === "") {
        alert("⚠️ Por favor, ingresa al menos el nombre del producto.");
        return;
      }

      alert("✅ ¡Publicación actualizada correctamente!");
      
      window.location.href = "Profile.html";
    });
  }

  const btnDelete = document.getElementById('btn-delete-pub');

  if (btnDelete) {
    btnDelete.addEventListener('click', () => {
      const confirmacion = confirm("⚠️ ¿Estás seguro de que deseas ELIMINAR esta publicación?\n\nEsta acción no se puede deshacer.");
      
      if (confirmacion) {
        alert("🗑️ Publicación eliminada exitosamente.");
        window.location.href = "Profile.html";
      }
    });
  }

  const setupModal = (triggerId, modalId, overlayId, closeBtnId) => {
    const trigger = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);
    const overlay = document.getElementById(overlayId);
    const closeBtn = document.getElementById(closeBtnId);

    if (trigger && modal && overlay && closeBtn) {
      const open = (e) => { e.preventDefault(); modal.classList.add('visible'); overlay.classList.add('visible'); };
      const close = () => { modal.classList.remove('visible'); overlay.classList.remove('visible'); };
      trigger.addEventListener('click', open);
      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', close);
    }
  };

  setupModal('terms-link', 'terms-modal', 'terms-overlay', 'modal-close-btn');
  setupModal('privacy-link', 'privacy-modal', 'privacy-overlay', 'privacy-modal-close-btn');

});