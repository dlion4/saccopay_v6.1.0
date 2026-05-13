/* ═══════════════════════════════════════════════════════════════
   SIDEBAR SCROLL HELPER — Add to ALL pages
   ═══════════════════════════════════════════════════════════════ */
(function() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  // On mobile, trap focus inside sidebar when open (accessibility)
  sidebar.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'transform' && sidebar.classList.contains('show')) {
      const nav = sidebar.querySelector('nav');
      if (nav) nav.scrollTop = 0; // Reset scroll to top on open
    }
  });

  // Close sidebar on mobile when clicking a link
  if (window.innerWidth < 992) {
    sidebar.querySelectorAll('nav a[href]').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('show');
        document.getElementById('sidebarBackdrop')?.classList.remove('show');
      });
    });
  }
})();