/* Rasoi Waterfront — minimal interactions */
(function () {
  'use strict';

  // Current year in footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // close on link click (mobile)
    nav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      })
    );
  }

  // Sticky header shadow on scroll
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Menu page — tab switching
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuPanes = document.querySelectorAll('.menu-pane');
  if (menuTabs.length && menuPanes.length) {
    const activate = (target) => {
      menuTabs.forEach(b => {
        const on = b.dataset.target === target;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      menuPanes.forEach(p => {
        const on = p.id === target;
        p.classList.toggle('is-active', on);
        if (on) {
          p.removeAttribute('hidden');
        } else {
          p.setAttribute('hidden', '');
        }
      });
      // Smoothly bring the menu section into view (without jumping past header).
      if (window.scrollY > 200) {
        const sec = document.querySelector('.menu-section');
        if (sec) {
          const headerH = (document.getElementById('site-header') || {}).offsetHeight || 0;
          const tabsH = (document.querySelector('.menu-tabs') || {}).offsetHeight || 0;
          const y = sec.getBoundingClientRect().top + window.scrollY - headerH - tabsH - 16;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };
    menuTabs.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.dataset.target));
    });
    // Hash-link support — e.g. /menus.html#cocktails opens that pane.
    if (location.hash) {
      const id = location.hash.replace('#', '');
      if (document.getElementById(id) && document.querySelector('.menu-pane#' + CSS.escape(id))) {
        activate(id);
      }
    }
  }

  // Christmas popup — shows once per visit, a few seconds after landing.
  // Skipped on the Christmas page itself, since the visitor is already there.
  (function () {
    if (/(^|\/)christmas\.html$/.test(location.pathname)) return;

    var SEEN_KEY = 'rasoiXmasPopupSeen';
    var alreadySeen = false;
    try { alreadySeen = sessionStorage.getItem(SEEN_KEY) === '1'; } catch (e) { /* storage unavailable — show anyway */ }
    if (alreadySeen) return;

    setTimeout(function () {
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch (e) { /* ignore */ }

      var overlay = document.createElement('div');
      overlay.className = 'xmas-popup-overlay';
      overlay.innerHTML =
        '<div class="xmas-popup" role="dialog" aria-modal="true" aria-labelledby="xmas-popup-title">' +
          '<button type="button" class="xmas-popup__close" aria-label="Close">&times;</button>' +
          '<p class="eyebrow eyebrow--center">Christmas 2026</p>' +
          '<h2 id="xmas-popup-title" class="display">A very Rasoi <em>Christmas.</em></h2>' +
          '<p>Festive set lunch, set dinner and Christmas cocktails on the Swansea waterfront. Spaces fill fast — reserve your table.</p>' +
          '<div class="xmas-popup__ctas">' +
            '<a href="christmas.html" class="btn btn--christmas btn--sm">View Christmas Menu</a>' +
            '<a href="christmas.html#book" class="btn btn--outline btn--sm">Book a Table</a>' +
          '</div>' +
        '</div>';
      document.body.appendChild(overlay);
      document.body.classList.add('xmas-popup-open');
      requestAnimationFrame(function () { overlay.classList.add('is-visible'); });

      var closeBtn = overlay.querySelector('.xmas-popup__close');
      closeBtn.focus();

      function close() {
        overlay.classList.remove('is-visible');
        document.body.classList.remove('xmas-popup-open');
        document.removeEventListener('keydown', onKeydown);
        setTimeout(function () { overlay.remove(); }, 350);
      }
      function onKeydown(e) {
        if (e.key === 'Escape') close();
      }
      closeBtn.addEventListener('click', close);
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) close();
      });
      document.addEventListener('keydown', onKeydown);
    }, 4500);
  })();

  // Content is always visible. We reserve reveal animations for the manual
  // `.reveal` class only, avoiding flash-of-invisible-content on fast scroll.
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
})();
