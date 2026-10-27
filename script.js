(function () {
  'use strict';

  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? 'Close' : 'Menu';
  }

  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setMenu(false);
      btn.focus();
    }
  });

  window.matchMedia('(min-width: 860px)').addEventListener('change', function (m) {
    if (m.matches) setMenu(false);
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Highlight the nav link for the section currently in view
  if ('IntersectionObserver' in window) {
    var links = {};
    nav.querySelectorAll('a[href^="#"]').forEach(function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && links[en.target.id]) {
          Object.keys(links).forEach(function (k) {
            links[k].classList.remove('active');
            links[k].removeAttribute('aria-current');
          });
          links[en.target.id].classList.add('active');
          links[en.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(links).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) io.observe(s);
    });
  }
})();
