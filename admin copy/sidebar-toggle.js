/* ============================================
   SIDEBAR TOGGLE SCRIPT
   Handles: Mobile slide-in + Desktop collapse
   Save state to localStorage
   ============================================ */

(function() {
    'use strict';

    // ---------- CONFIG ----------
    const MOBILE_BREAKPOINT = 992; // px - matches Bootstrap LG breakpoint
    const SIDEBAR_WIDTH = '260px';
    const SIDEBAR_COLLAPSED_WIDTH = '70px';
    const STORAGE_KEY = 'sidebar_collapsed';

    // ---------- DOM ELEMENTS ----------
    const sidebar = document.getElementById('adminSidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const mobileToggle = document.getElementById('topbarSidebarToggle'); // hamburger
    const desktopToggle = document.getElementById('sidebarToggle'); // X button inside sidebar
    const mainContent = document.querySelector('.admin-main');
    const layout = document.querySelector('.admin-layout');

    // ---------- STATE ----------
    let isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    let isCollapsed = false;
    let isMobileOpen = false;

    // ---------- INIT ----------
    function init() {
        if (!sidebar) {
            console.error('Sidebar element not found. Expected id="adminSidebar"');
            return;
        }

        // Load saved desktop state
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved !== null) {
            isCollapsed = saved === 'true';
        }

        // Apply initial state
        updateLayout();

        // Bind events
        bindEvents();

        // Handle resize
        window.addEventListener('resize', debounce(handleResize, 150));

        console.log('Sidebar toggle initialized. Mobile:', isMobile, 'Collapsed:', isCollapsed);
    }

    // ---------- EVENT BINDING ----------
    function bindEvents() {
        // Mobile hamburger button (in topbar)
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleMobile();
            });
        }

        // Desktop toggle button (inside sidebar, usually an X or arrow)
        if (desktopToggle) {
            desktopToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleDesktop();
            });
        }

        // Overlay click closes mobile sidebar
        if (overlay) {
            overlay.addEventListener('click', function() {
                if (isMobile && isMobileOpen) {
                    closeMobile();
                }
            });
        }

        // Escape key closes mobile sidebar
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMobile && isMobileOpen) {
                closeMobile();
            }
        });

        // Click outside sidebar on mobile closes it
        document.addEventListener('click', function(e) {
            if (isMobile && isMobileOpen) {
                const isClickInsideSidebar = sidebar.contains(e.target);
                const isClickOnToggle = mobileToggle && mobileToggle.contains(e.target);
                if (!isClickInsideSidebar && !isClickOnToggle) {
                    closeMobile();
                }
            }
        });
    }

    // ---------- MOBILE TOGGLE ----------
    function toggleMobile() {
        if (isMobileOpen) {
            closeMobile();
        } else {
            openMobile();
        }
    }

    function openMobile() {
        isMobileOpen = true;
        sidebar.classList.add('show');
        if (overlay) overlay.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        document.body.style.touchAction = 'none';

        // Animate sidebar in
        sidebar.style.transform = 'translateX(0)';
        sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

        // Animate overlay
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.visibility = 'visible';
        }
    }

    function closeMobile() {
        isMobileOpen = false;
        sidebar.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.touchAction = '';

        // Animate sidebar out
        sidebar.style.transform = 'translateX(-100%)';

        // Animate overlay out
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.visibility = 'hidden';
            }, 300);
        }
    }

    // ---------- DESKTOP TOGGLE ----------
    function toggleDesktop() {
        isCollapsed = !isCollapsed;
        localStorage.setItem(STORAGE_KEY, isCollapsed);
        updateDesktopLayout();
    }

    function updateDesktopLayout() {
        if (!sidebar || !mainContent) return;

        if (isCollapsed) {
            // Collapse sidebar
            sidebar.style.width = SIDEBAR_COLLAPSED_WIDTH;
            sidebar.style.minWidth = SIDEBAR_COLLAPSED_WIDTH;
            sidebar.classList.add('collapsed');

            // Hide text, show icons only
            const texts = sidebar.querySelectorAll('.sidebar-brand-text, .nav-item span, .nav-section-title');
            texts.forEach(el => {
                el.style.opacity = '0';
                el.style.width = '0';
                el.style.overflow = 'hidden';
                el.style.transition = 'opacity 0.2s ease, width 0.2s ease';
            });

            // Adjust main content margin
            mainContent.style.marginLeft = SIDEBAR_COLLAPSED_WIDTH;
            mainContent.style.transition = 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            // Center icons in collapsed mode
            const navLinks = sidebar.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.style.justifyContent = 'center';
                link.style.paddingLeft = '0';
                link.style.paddingRight = '0';
            });

            // Hide badges in collapsed mode (or reposition)
            const badges = sidebar.querySelectorAll('.nav-badge');
            badges.forEach(badge => {
                badge.style.position = 'absolute';
                badge.style.top = '4px';
                badge.style.right = '4px';
            });

        } else {
            // Expand sidebar
            sidebar.style.width = SIDEBAR_WIDTH;
            sidebar.style.minWidth = SIDEBAR_WIDTH;
            sidebar.classList.remove('collapsed');

            // Show text
            const texts = sidebar.querySelectorAll('.sidebar-brand-text, .nav-item span, .nav-section-title');
            texts.forEach(el => {
                el.style.opacity = '1';
                el.style.width = '';
                el.style.overflow = '';
            });

            // Restore main content margin
            mainContent.style.marginLeft = SIDEBAR_WIDTH;

            // Restore nav link padding
            const navLinks = sidebar.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.style.justifyContent = '';
                link.style.paddingLeft = '';
                link.style.paddingRight = '';
            });

            // Restore badges
            const badges = sidebar.querySelectorAll('.nav-badge');
            badges.forEach(badge => {
                badge.style.position = '';
                badge.style.top = '';
                badge.style.right = '';
            });
        }
    }

    // ---------- LAYOUT UPDATE (resize handler) ----------
    function updateLayout() {
        isMobile = window.innerWidth < MOBILE_BREAKPOINT;

        if (isMobile) {
            // ===== MOBILE MODE =====
            // Reset any desktop collapse state
            sidebar.classList.remove('collapsed');

            // Set mobile sidebar styles
            sidebar.style.width = '280px';
            sidebar.style.minWidth = '280px';
            sidebar.style.position = 'fixed';
            sidebar.style.top = '0';
            sidebar.style.left = '0';
            sidebar.style.height = '100vh';
            sidebar.style.zIndex = '1040';
            sidebar.style.transform = isMobileOpen ? 'translateX(0)' : 'translateX(-100%)';
            sidebar.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            // Ensure overlay exists and is styled
            if (overlay) {
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.background = 'rgba(0,0,0,0.5)';
                overlay.style.zIndex = '1035';
                overlay.style.opacity = isMobileOpen ? '1' : '0';
                overlay.style.visibility = isMobileOpen ? 'visible' : 'hidden';
                overlay.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
            }

            // Main content takes full width
            if (mainContent) {
                mainContent.style.marginLeft = '0';
                mainContent.style.transition = 'margin-left 0.3s ease';
            }

            // Show hamburger
            if (mobileToggle) {
                mobileToggle.style.display = 'flex';
            }

            // Hide desktop toggle
            if (desktopToggle) {
                desktopToggle.style.display = 'none';
            }

            // Restore text visibility for mobile
            const texts = sidebar.querySelectorAll('.sidebar-brand-text, .nav-item span, .nav-section-title');
            texts.forEach(el => {
                el.style.opacity = '1';
                el.style.width = '';
                el.style.overflow = '';
            });

        } else {
            // ===== DESKTOP MODE =====
            // Close mobile state if open
            if (isMobileOpen) {
                closeMobile();
            }

            // Reset mobile-specific styles
            sidebar.style.position = '';
            sidebar.style.top = '';
            sidebar.style.left = '';
            sidebar.style.height = '';
            sidebar.style.zIndex = '';
            sidebar.style.transform = '';

            // Hide overlay
            if (overlay) {
                overlay.style.opacity = '0';
                overlay.style.visibility = 'hidden';
            }

            // Apply desktop collapse/expand
            updateDesktopLayout();

            // Hide hamburger on desktop
            if (mobileToggle) {
                mobileToggle.style.display = 'none';
            }

            // Show desktop toggle (the X/arrow inside sidebar)
            if (desktopToggle) {
                desktopToggle.style.display = 'flex';
            }
        }
    }

    // ---------- RESIZE HANDLER ----------
    function handleResize() {
        const wasMobile = isMobile;
        updateLayout();

        // If switching between mobile/desktop, log it
        if (wasMobile !== isMobile) {
            console.log('Layout switched to:', isMobile ? 'mobile' : 'desktop');
        }
    }

    // ---------- DEBOUNCE UTILITY ----------
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ---------- PUBLIC API ----------
    window.SidebarToggle = {
        openMobile: openMobile,
        closeMobile: closeMobile,
        toggleMobile: toggleMobile,
        toggleDesktop: toggleDesktop,
        isCollapsed: function() { return isCollapsed; },
        isMobileOpen: function() { return isMobileOpen; },
        refresh: updateLayout
    };

    // ---------- START ----------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();