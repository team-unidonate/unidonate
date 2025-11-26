document.addEventListener('DOMContentLoaded', () => {
  
  /* ===========================================================
     1. LÓGICA DEL HEADER (Menú hamburguesa y Popover)
     =========================================================== */
  const header = document.querySelector('header');
  const nav = header?.querySelector('nav');
  const toggleBtn = header?.querySelector('.menu-toggle');
  const perfilBtn = document.getElementById('perfilBtn');
  const popover = document.getElementById('perfilPopover');

  // Menú Hamburguesa (Móvil)
  if (toggleBtn && nav) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Popover de Perfil
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

  // Cerrar menús al hacer clic fuera
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

  /* ===========================================================
     2. LÓGICA DE EDICIÓN DE PUBLICACIÓN (US26)
     =========================================================== */
  
  // A) Vista previa de la imagen al seleccionarla
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

  // B) Guardar Cambios
  const editForm = document.getElementById('edit-form');
  const editNombre = document.getElementById('edit-nombre');

  if (editForm) {
    editForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita que la página se recargue

      // Validación simple: Que al menos tenga nombre
      if (editNombre && editNombre.value.trim() === "") {
        alert("⚠️ Por favor, ingresa al menos el nombre del producto.");
        return;
      }

      // Simulación de éxito
      alert("✅ ¡Publicación actualizada correctamente!");
      
      // Redirección al perfil para ver los cambios
      window.location.href = "Profile.html";
    });
  }

  /* ===========================================================
     3. LÓGICA DE ELIMINACIÓN (US23) - ¡NUEVO!
     =========================================================== */
  const btnDelete = document.getElementById('btn-delete-pub');

  if (btnDelete) {
    btnDelete.addEventListener('click', () => {
      // Confirmación de seguridad
      const confirmacion = confirm("⚠️ ¿Estás seguro de que deseas ELIMINAR esta publicación?\n\nEsta acción no se puede deshacer.");
      
      if (confirmacion) {
        alert("🗑️ Publicación eliminada exitosamente.");
        // Redirección al perfil donde ya no debería aparecer el objeto
        window.location.href = "Profile.html";
      }
    });
  }

  /* ===========================================================
     4. MODALES DEL FOOTER (Legal)
     =========================================================== */
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