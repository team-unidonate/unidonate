document.addEventListener('DOMContentLoaded', () => {
  /* ===== Lógica del Header (Menú hamburguesa y Popover de Perfil) REUTILIZADO ===== */
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

  /* ===== Lógica para Dropdowns del Formulario (Similar a Explorar) ===== */
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

  /* ===== Lógica para cerrar menús al hacer clic fuera ===== */
  document.addEventListener('click', (e) => {
    // Cierra menú hamburguesa
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }
    // Cierra popover de perfil
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      popover.classList.remove('open');
      perfilBtn.setAttribute('aria-expanded', 'false');
    }
    // Cierra dropdowns de formulario
    document.querySelectorAll('.dropdown-menu.open').forEach(openMenu => {
      if (!openMenu.parentElement.contains(e.target)) {
        openMenu.classList.remove('open');
        openMenu.previousElementSibling.classList.remove('open');
      }
    });
  });
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
     LÓGICA DE PUBLICACIÓN 
     =========================================================== */
  const btnPublishAction = document.getElementById('btn-publish-action');
  const inputTitulo = document.getElementById('titulo');
  const inputDescripcion = document.getElementById('descripcion');
  
  // Elementos para leer el valor de los dropdowns
  // (Asumiendo que el texto del botón cambia al seleccionar una opción, 
  // tal como lo programaste en la lógica de dropdowns anterior)
  const categoriaBtn = document.getElementById('categoria');
  const sedeBtn = document.getElementById('sede');

  if (btnPublishAction) {
    btnPublishAction.addEventListener('click', (e) => {
      e.preventDefault();

      // 1. Obtener valores
      const titulo = inputTitulo.value.trim();
      const descripcion = inputDescripcion.value.trim();
      // Leemos el texto dentro del span .dropdown-value
      const categoria = categoriaBtn.querySelector('.dropdown-value').textContent.trim();
      const sede = sedeBtn.querySelector('.dropdown-value').textContent.trim();

      // 2. Validación (US19)
      if (!titulo || !descripcion) {
        alert("⚠️ Por favor, completa el título y la descripción del objeto.");
        return;
      }

      // 3. Confirmación y Redirección (US47)
      // Aquí simulamos que se envía al servidor
      alert(`✅ ¡Publicación exitosa!\n\nObjeto: ${titulo}\nCategoría: ${categoria}\nSede: ${sede}\n\nTu donación ahora es visible para la comunidad.`);
      
      // Redirigir al Home (o a "Mis Publicaciones" si tuvieras esa página lista)
      window.location.href = "Explorar.html";
    });
  }