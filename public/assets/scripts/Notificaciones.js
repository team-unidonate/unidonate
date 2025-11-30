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
    perfilBtn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggleBtn?.setAttribute('aria-expanded', 'false');
      }
      popover.classList.toggle('open');
    });
  }

  const filterTabs = document.querySelectorAll('.tab-btn');
  const unreadFilter = document.getElementById('unread-filter');
  const notificationItems = document.querySelectorAll('.notification-item');

  function applyFilters() {
    const activeTabFilter = document.querySelector('.tab-btn.active').dataset.filter;
    const showOnlyUnread = unreadFilter.checked;

    notificationItems.forEach(item => {
      const isRead = item.classList.contains('is-read');
      const itemCategory = item.dataset.category;

      const unreadCondition = !showOnlyUnread || !isRead;
      const categoryCondition = activeTabFilter === 'todas' || itemCategory === activeTabFilter;

      if (unreadCondition && categoryCondition) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      applyFilters();
    });
  });

  if (unreadFilter) {
    unreadFilter.addEventListener('change', applyFilters);
  }

  const notificationList = document.querySelector('.notification-list');
  if(notificationList) {
    notificationList.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-mark-read')) {
        const button = e.target;
        const notificationItem = button.closest('.notification-item');
        notificationItem.classList.add('is-read');
        button.textContent = 'Leída';
        applyFilters();
      }
    });
  }

  document.addEventListener('click', (e) => {
    if (nav && nav.classList.contains('open') && !header.contains(e.target)) {
      nav.classList.remove('open');
      toggleBtn?.setAttribute('aria-expanded', 'false');
    }
    if (popover && popover.classList.contains('open') && !popover.contains(e.target) && e.target !== perfilBtn) {
      popover.classList.remove('open');
    }
  });

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

  const notificationListContainer = document.querySelector('.notification-list');

  if(notificationListContainer) {
    notificationListContainer.addEventListener('click', (e) => {
      
      if (e.target.closest('.btn-delete-notif')) {
        const item = e.target.closest('.notification-item');
        item.style.transition = "all 0.3s ease";
        item.style.opacity = "0";
        item.style.transform = "translateX(20px)";
        
        setTimeout(() => {
          item.remove();
        }, 300);
      }
    });
  }

  const btnMarkAll = document.getElementById('mark-all-read');
  if (btnMarkAll) {
    btnMarkAll.addEventListener('click', () => {
      document.querySelectorAll('.notification-item').forEach(item => {
        item.classList.add('is-read');
        const btn = item.querySelector('.btn-mark-read');
        if(btn) btn.textContent = 'Leída';
      });
      alert("✅ Todas las notificaciones marcadas como leídas.");
    });
  }

  const toggle = document.getElementById('notif-toggle');
  
  if (toggle) {
    toggle.addEventListener('change', (e) => {
      if (e.target.checked) {
        alert("🔔 Has ACTIVADO las notificaciones.");
      } else {
        alert("🔕 Has DESACTIVADO las notificaciones.\nNo recibirás nuevas alertas.");
      }
    });
  }