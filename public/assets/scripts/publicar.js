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

  const dropdowns = document.querySelectorAll('.dropdown-container');

  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = document.getElementById(toggle.dataset.target);
    const valueSpan = toggle.querySelector('.dropdown-value');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.dropdown-menu.open').forEach(openMenu => {
        if (openMenu !== menu) {
          openMenu.classList.remove('open');
          openMenu.previousElementSibling.classList.remove('open');
        }
      });
      menu.classList.toggle('open');
      toggle.classList.toggle('open');
    });

    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        valueSpan.textContent = e.target.textContent;
        menu.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      popover.classList.remove('open');
      perfilBtn.setAttribute('aria-expanded', 'false');
    }
    document.querySelectorAll('.dropdown-menu.open').forEach(openMenu => {
      if (!openMenu.parentElement.contains(e.target)) {
        openMenu.classList.remove('open');
        openMenu.previousElementSibling.classList.remove('open');
      }
    });
  });
});

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
  termsLink.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeModalBtn.addEventListener('click', closeModal);

  termsOverlay.addEventListener('click', closeModal);
}

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
  privacyLink.addEventListener('click', (e) => {
    e.preventDefault();
    openPrivacyModal();
  });

  closePrivacyBtn.addEventListener('click', closePrivacyModal);

  privacyOverlay.addEventListener('click', closePrivacyModal);
}

  const btnPublishAction = document.getElementById('btn-publish-action');
  const inputTitulo = document.getElementById('titulo');
  const inputDescripcion = document.getElementById('descripcion');

  const categoriaBtn = document.getElementById('categoria');
  const sedeBtn = document.getElementById('sede');

  if (btnPublishAction) {
    btnPublishAction.addEventListener('click', (e) => {
      e.preventDefault();

      const titulo = inputTitulo.value.trim();
      const descripcion = inputDescripcion.value.trim();
      const categoria = categoriaBtn.querySelector('.dropdown-value').textContent.trim();
      const sede = sedeBtn.querySelector('.dropdown-value').textContent.trim();

      if (!titulo || !descripcion) {
        alert("⚠️ Por favor, completa el título y la descripción del objeto.");
        return;
      }

      alert(`✅ ¡Publicación exitosa!\n\nObjeto: ${titulo}\nCategoría: ${categoria}\nSede: ${sede}\n\nTu donación ahora es visible para la comunidad.`);
      
      window.location.href = "Explorar.html";
    });
  }