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

  const searchInput = document.getElementById('search-input');
  const cards = document.querySelectorAll('.product-card');
  const clearBtn = document.getElementById('btn-clear-filters');
  
  const catLabel = document.getElementById('cat-label');
  const sedeLabel = document.getElementById('sede-label');

  let currentSearch = "";
  let currentCategory = "Categoría"; 
  let currentSede = "Sede";          

  const filterProducts = () => {
    cards.forEach(card => {
      const title = card.dataset.title.toLowerCase();
      const category = card.dataset.category;
      const sede = card.dataset.sede;

      const matchesSearch = title.includes(currentSearch);
      const matchesCategory = currentCategory === "Categoría" || category === currentCategory;
      const matchesSede = currentSede === "Sede" || sede === currentSede;

      if (matchesSearch && matchesCategory && matchesSede) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.toLowerCase();
      filterProducts();
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
        const isDefault = e.target.dataset.value === 'default';
        const selectedText = e.target.textContent.trim();
        
        if (toggle.dataset.target === 'categoria-menu') {
          currentCategory = isDefault ? "Categoría" : selectedText;
          valueSpan.textContent = currentCategory;
        } else if (toggle.dataset.target === 'sede-menu') {
          currentSede = isDefault ? "Sede" : selectedText;
          valueSpan.textContent = currentSede;
        }

        filterProducts();
        menu.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentSearch = "";
      currentCategory = "Categoría";
      currentSede = "Sede";

      if(searchInput) searchInput.value = "";
      if(catLabel) catLabel.textContent = "Categoría";
      if(sedeLabel) sedeLabel.textContent = "Sede";

      filterProducts();
    });
  }

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