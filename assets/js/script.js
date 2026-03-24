(function () {
  'use strict';

  function initTheme() {
    var saved = localStorage.getItem('theme');

    if (saved === 'dark' || saved === 'light') {
      document.documentElement.setAttribute('data-theme', saved);
      console.log('[theme] Restored saved preference:', saved);
      return;
    }

    console.log('[theme] No saved preference, deferring to OS setting.');
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next;

    if (current === 'dark') {
      next = 'light';
    } else if (current === 'light') {
      next = 'dark';
    } else {
      var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      next = prefersDark ? 'light' : 'dark';
    }

    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    console.log('[theme] Switched to:', next);

    updateToggleLabel(next);
  }

  function updateToggleLabel(currentTheme) {
    var btn = document.querySelector('.theme-toggle');
    if (!btn) {
      return;
    }
    var label = currentTheme === 'dark'
      ? 'Switch to light mode'
      : 'Switch to dark mode';
    btn.setAttribute('aria-label', label);
  }

  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var navList = document.querySelector('.nav-list');

    if (!toggle || !navList) {
      console.log('[nav] Toggle or nav-list not found, skipping mobile nav.');
      return;
    }

    toggle.addEventListener('click', function () {
      var isOpen = navList.classList.contains('is-open');

      if (isOpen) {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        console.log('[nav] Menu closed.');
      } else {
        navList.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
        console.log('[nav] Menu opened.');
      }
    });

    var navLinks = navList.querySelectorAll('a');
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener('click', function () {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('is-open')) {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
        console.log('[nav] Menu closed via Escape.');
      }
    });

    console.log('[nav] Mobile navigation initialized.');
  }

  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) {
      return;
    }

    form.setAttribute('novalidate', '');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      console.log('[form] Submit triggered, validating…');

      var isValid = validateForm(form);

      if (isValid) {
        console.log('[form] All fields valid. Ready to send.');
        showFormStatus(form, 'success', 'Message sent successfully! I\'ll get back to you soon.');

        form.reset();
        clearAllErrors(form);
      } else {
        console.log('[form] Validation failed.');
        showFormStatus(form, 'error', 'Please fix the errors above and try again.');
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });

    var inputs = form.querySelectorAll('input, textarea');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('blur', function () {
        validateField(this);
      });
      inputs[i].addEventListener('input', function () {
        clearFieldError(this);
      });
    }

    console.log('[form] Contact form validation initialized.');
  }

  function validateForm(form) {
    var fields = form.querySelectorAll('[data-validate]');
    var allValid = true;

    for (var i = 0; i < fields.length; i++) {
      var valid = validateField(fields[i]);
      if (!valid) {
        allValid = false;
      }
    }

    return allValid;
  }

  function validateField(field) {
    var rules = field.getAttribute('data-validate');
    if (!rules) {
      return true;
    }

    var value = field.value.trim();
    var errorMsg = '';

    if (rules.indexOf('required') !== -1 && value === '') {
      errorMsg = 'This field is required.';
    } else if (rules.indexOf('email') !== -1 && value !== '') {
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    } else if (rules.indexOf('minlength') !== -1 && value !== '') {
      var minLen = parseInt(field.getAttribute('data-minlength'), 10);
      if (!isNaN(minLen) && value.length < minLen) {
        errorMsg = 'Please enter at least ' + minLen + ' characters.';
      }
    }

    if (errorMsg) {
      showFieldError(field, errorMsg);
      return false;
    }

    clearFieldError(field);
    return true;
  }

  function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');

    var errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.setAttribute('role', 'alert');
      field.setAttribute('aria-describedby', errorEl.id);
    }
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.removeAttribute('aria-invalid');

    var errorEl = field.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = '';
      errorEl.removeAttribute('role');
    }
  }

  function clearAllErrors(form) {
    var invalids = form.querySelectorAll('.is-invalid');
    for (var i = 0; i < invalids.length; i++) {
      clearFieldError(invalids[i]);
    }
  }

  function showFormStatus(form, type, message) {
    var statusEl = form.querySelector('.form-status');
    if (!statusEl) {
      return;
    }

    statusEl.className = 'form-status';
    statusEl.classList.add('form-status--' + type);
    statusEl.textContent = message;
    statusEl.setAttribute('role', 'alert');

    setTimeout(function () {
      statusEl.className = 'form-status';
      statusEl.textContent = '';
      statusEl.removeAttribute('role');
    }, 6000);
  }

  function updateCopyrightYear() {
    var els = document.querySelectorAll('[data-year]');
    var year = new Date().getFullYear();

    for (var i = 0; i < els.length; i++) {
      els[i].textContent = year;
    }

    console.log('[footer] Copyright year set to', year);
  }

  function initHeaderScroll() {
    var header = document.querySelector('.site-header');
    if (!header) {
      return;
    }

    var scrolled = false;

    function onScroll() {
      if (window.scrollY > 10 && !scrolled) {
        header.style.boxShadow = '0 1px 8px ' + 'rgba(0,0,0,0.08)';
        scrolled = true;
      } else if (window.scrollY <= 10 && scrolled) {
        header.style.boxShadow = 'none';
        scrolled = false;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    console.log('[header] Scroll shadow initialized.');
  }

  function initSmoothScroll() {
    var anchors = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') {
          return;
        }
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
          console.log('[scroll] Scrolled to', targetId);
        }
      });
    }
  }

  function init() {
    console.log('[init] Portfolio scripts loading…');
    initTheme();
    initMobileNav();
    initContactForm();
    updateCopyrightYear();
    initHeaderScroll();
    initSmoothScroll();
    console.log('[init] All modules ready.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
