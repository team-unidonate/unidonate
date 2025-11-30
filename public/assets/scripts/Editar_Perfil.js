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

  const dropdownContainer = document.querySelector('.dropdown-container');
  if (dropdownContainer) {
    const toggle = dropdownContainer.querySelector('.dropdown-toggle');
    const menu = dropdownContainer.querySelector('.dropdown-menu');
    const valueSpan = toggle.querySelector('.dropdown-value');
    
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('open');
    });

    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        valueSpan.textContent = e.target.textContent;
        menu.classList.remove('open');
      }
    });
  }

  const photoInput = document.getElementById('photo-upload'); 
  const photoPreview = document.getElementById('photo-preview');

  if (photoInput && photoPreview) {
    photoInput.addEventListener('change', () => {
      const file = photoInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          photoPreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const editProfileForm = document.getElementById('edit-profile-form');
  const saveBtn = document.querySelector('.form-actions .btn--primary');

  if (saveBtn && editProfileForm) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      alert("✅ ¡Perfil actualizado correctamente!");

      window.location.href = "Profile.html";
    });
  }

  const deleteBtn = document.querySelector('.btn--danger');
  
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const confirmacion = confirm("⚠️ ¿Estás seguro de que quieres eliminar tu cuenta?\n\nEsta acción no se puede deshacer y perderás tu historial.");
      
      if (confirmacion) {
        alert("🗑️ Tu cuenta ha sido eliminada.");
        window.location.href = "index.html";
      }
    });
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