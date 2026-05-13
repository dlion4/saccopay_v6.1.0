/**
 * SACCOPay Admin Dashboard - Master JavaScript
 * Version: 3.0
 * Handles: Sidebar toggle, responsive behavior, utilities
 */

(function() {
    'use strict';

    // ========================================
    // SIDEBAR MANAGEMENT
    // ========================================
    const sidebar = document.getElementById('adminSidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const toggleIcon = document.getElementById('toggleIcon');
    const mainContent = document.querySelector('.admin-main');

    let sidebarState = {
        mobileOpen: false,
        desktopCollapsed: localStorage.getItem('sidebarCollapsed') === 'true'
    };

    // Initialize sidebar state
    function initSidebar() {
        // Check screen size
        const isMobile = window.innerWidth < 992;

        if (isMobile) {
            // Mobile: sidebar hidden by default
            sidebar.classList.remove('show', 'collapsed');
            sidebarToggle.style.display = 'flex';
            if (toggleIcon) toggleIcon.className = 'bi bi-list';
        } else {
            // Desktop: check saved state
            sidebarToggle.style.display = 'none';
            if (sidebarState.desktopCollapsed) {
                sidebar.classList.add('collapsed');
                sidebar.classList.remove('show');
                if (toggleIcon) toggleIcon.className = 'bi bi-chevron-right';
            } else {
                sidebar.classList.remove('collapsed', 'show');
                if (toggleIcon) toggleIcon.className = 'bi bi-chevron-left';
            }
        }
    }

    // Toggle sidebar
    function toggleSidebar() {
        const isMobile = window.innerWidth < 992;

        if (isMobile) {
            // Mobile: slide in/out
            sidebarState.mobileOpen = !sidebarState.mobileOpen;
            if (sidebarState.mobileOpen) {
                sidebar.classList.add('show');
                sidebar.classList.remove('collapsed');
                if (toggleIcon) toggleIcon.className = 'bi bi-x-lg';
                // Add overlay
                createOverlay();
            } else {
                sidebar.classList.remove('show');
                if (toggleIcon) toggleIcon.className = 'bi bi-list';
                removeOverlay();
            }
        } else {
            // Desktop: collapse/expand
            sidebarState.desktopCollapsed = !sidebarState.desktopCollapsed;
            localStorage.setItem('sidebarCollapsed', sidebarState.desktopCollapsed);

            if (sidebarState.desktopCollapsed) {
                sidebar.classList.add('collapsed');
                if (toggleIcon) toggleIcon.className = 'bi bi-chevron-right';
            } else {
                sidebar.classList.remove('collapsed');
                if (toggleIcon) toggleIcon.className = 'bi bi-chevron-left';
            }
        }
    }

    // Create mobile overlay
    function createOverlay() {
        let overlay = document.getElementById('sidebarOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'sidebarOverlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.4);
                backdrop-filter: blur(4px);
                z-index: 999;
                transition: opacity 0.3s ease;
            `;
            overlay.addEventListener('click', () => {
                toggleSidebar();
            });
            document.body.appendChild(overlay);
            // Trigger reflow for animation
            requestAnimationFrame(() => {
                overlay.style.opacity = '1';
            });
        }
    }

    // Remove mobile overlay
    function removeOverlay() {
        const overlay = document.getElementById('sidebarOverlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    }

    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const isMobile = window.innerWidth < 992;

            if (isMobile) {
                // Switching to mobile
                sidebar.classList.remove('collapsed', 'show');
                sidebarToggle.style.display = 'flex';
                if (toggleIcon) toggleIcon.className = 'bi bi-list';
                sidebarState.mobileOpen = false;
                removeOverlay();
            } else {
                // Switching to desktop
                sidebarToggle.style.display = 'none';
                removeOverlay();
                if (sidebarState.desktopCollapsed) {
                    sidebar.classList.add('collapsed');
                    if (toggleIcon) toggleIcon.className = 'bi bi-chevron-right';
                } else {
                    sidebar.classList.remove('collapsed');
                    if (toggleIcon) toggleIcon.className = 'bi bi-chevron-left';
                }
            }
        }, 250);
    });

    // Close sidebar on mobile when clicking a link
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && sidebarState.mobileOpen) {
                toggleSidebar();
            }
        });
    });

    // Escape key to close sidebar
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebarState.mobileOpen) {
            toggleSidebar();
        }
    });

    // Initialize on load
    initSidebar();

    // ========================================
    // TOOLTIP INITIALIZATION
    // ========================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // ========================================
    // TOAST NOTIFICATIONS
    // ========================================
    window.showToast = function(message, type = 'success', duration = 3000) {
        // Remove existing toasts
        const existingToast = document.querySelector('.admin-toast');
        if (existingToast) existingToast.remove();

        const icons = {
            success: 'bi-check-circle',
            warning: 'bi-exclamation-triangle',
            danger: 'bi-x-circle',
            info: 'bi-info-circle'
        };

        const colors = {
            success: 'var(--status-success)',
            warning: 'var(--status-warning)',
            danger: 'var(--status-danger)',
            info: 'var(--status-info)'
        };

        const toast = document.createElement('div');
        toast.className = 'admin-toast';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            border-radius: var(--radius-md);
            box-shadow: var(--shadow-lg);
            padding: var(--spacing-md) var(--spacing-lg);
            font-size: 0.875rem;
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            animation: slideInRight 0.3s ease;
            max-width: 350px;
            word-break: break-word;
        `;
        toast.innerHTML = `
            <i class="bi ${icons[type]}" style="color: ${colors[type]}; font-size: 1.25rem;"></i>
            <span>${message}</span>
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // ========================================
    // TABLE RESPONSIVE SCROLL INDICATOR
    // ========================================
    document.querySelectorAll('.table-responsive').forEach(table => {
        function checkScroll() {
            if (table.scrollWidth > table.clientWidth) {
                table.classList.add('scrollable');
            } else {
                table.classList.remove('scrollable');
            }
        }

        checkScroll();
        table.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
    });

    // ========================================
    // ACTIVE NAV LINK HIGHLIGHTING
    // ========================================
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.sidebar-nav .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // FORM VALIDATION HELPERS
    // ========================================
    window.validateForm = function(formId) {
        const form = document.getElementById(formId);
        if (!form) return false;

        let isValid = true;
        form.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = 'var(--status-danger)';
                field.addEventListener('input', function() {
                    this.style.borderColor = '';
                }, { once: true });
            }
        });

        return isValid;
    };

    // ========================================
    // NUMBER FORMATTING HELPERS
    // ========================================
    window.formatCurrency = function(amount, currency = 'KES') {
        return currency + ' ' + new Intl.NumberFormat('en-KE').format(amount);
    };

    window.formatNumber = function(num) {
        return new Intl.NumberFormat('en-KE').format(num);
    };

    window.formatDate = function(dateString) {
        return new Date(dateString).toLocaleDateString('en-KE', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // ========================================
    // DEBOUNCE / THROTTLE UTILITIES
    // ========================================
    window.debounce = function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    window.throttle = function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // ========================================
    // LOADING SPINNER
    // ========================================
    window.showLoading = function(element, message = 'Loading...') {
        const spinner = document.createElement('div');
        spinner.className = 'loading-overlay';
        spinner.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(255,255,255,0.8);
            backdrop-filter: blur(4px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-md);
            z-index: 10;
            border-radius: inherit;
        `;
        spinner.innerHTML = `
            <div class="spinner-border text-primary" role="status" style="color: var(--primary-green) !important;">
                <span class="visually-hidden">Loading...</span>
            </div>
            <span style="color: var(--text-secondary); font-size: 0.875rem;">${message}</span>
        `;

        element.style.position = 'relative';
        element.appendChild(spinner);

        return {
            hide: () => spinner.remove()
        };
    };

    // ========================================
    // CONFIRM DIALOG
    // ========================================
    window.showConfirm = function(message, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'modal fade show';
        modal.style.display = 'block';
        modal.style.background = 'rgba(0,0,0,0.4)';
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered" style="z-index: 10000;">
                <div class="modal-content">
                    <div class="modal-body text-center py-4">
                        <i class="bi bi-question-circle" style="font-size: 3rem; color: var(--accent-orange);"></i>
                        <h5 class="mt-3">Confirm Action</h5>
                        <p class="text-secondary">${message}</p>
                        <div class="d-flex gap-2 justify-content-center mt-4">
                            <button class="btn btn-outline" id="confirmCancel">Cancel</button>
                            <button class="btn btn-primary" id="confirmOk">Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        modal.querySelector('#confirmOk').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
            if (onConfirm) onConfirm();
        });

        modal.querySelector('#confirmCancel').addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
            if (onCancel) onCancel();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
                if (onCancel) onCancel();
            }
        });
    };

    console.log('✅ Admin Master JS loaded successfully');
})();