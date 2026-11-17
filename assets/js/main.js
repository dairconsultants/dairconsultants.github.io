/* Dair Consultants — site interactions (no dependencies) */
(function () {
  'use strict';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Year in footer */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Header: solid background once scrolled */
  var header = document.querySelector('.header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 24); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
  }

  /* Reveal on scroll */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Count-up for hero stats */
  function countUp(el) {
    var target = parseFloat(el.dataset.count), decimals = parseInt(el.dataset.decimals || '0', 10);
    var suffix = el.dataset.suffix || '', start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var stats = document.querySelectorAll('[data-count]');
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); so.unobserve(e.target); } });
    }, { threshold: 0.6 });
    stats.forEach(function (s) { so.observe(s); });
  }

  /* Highlight the nav link for the section in view */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    var no = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { no.observe(s); });
  }

  /* Contact form
     - If data-endpoint is set (e.g. a Formspree URL), submits there with fetch.
     - Otherwise opens the visitor's email app with the details filled in. */
  var form = document.getElementById('contact-form');
  if (form) {
    var status = form.querySelector('.form__status');
    function say(msg, ok) { status.textContent = msg; status.className = 'form__status ' + (ok ? 'is-ok' : 'is-error'); }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = Array.prototype.find.call(form.elements, function (el) { return el.willValidate && !el.checkValidity(); });
      if (invalid) { say('Please fill in ' + (invalid.labels && invalid.labels[0] ? invalid.labels[0].textContent.replace(' *', '').toLowerCase() : 'the required fields') + '.', false); invalid.focus(); return; }
      if (form._gotcha && form._gotcha.value) return; // spam trap

      var data = new FormData(form);
      var endpoint = form.dataset.endpoint;
      var btn = form.querySelector('button[type="submit"]');

      if (endpoint) {
        btn.disabled = true; say('Sending…', true);
        fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error(); form.reset(); say('Thank you! We will be in touch within one business day.', true); })
          .catch(function () { say('Something went wrong. Please email us at ' + form.dataset.mailto + '.', false); })
          .finally(function () { btn.disabled = false; });
      } else {
        var body = [
          'Name: ' + data.get('first_name') + ' ' + data.get('last_name'),
          'Company: ' + data.get('company'),
          'Email: ' + data.get('email'),
          'Phone: ' + (data.get('phone') || '-'),
          'Interested in: ' + data.get('service'),
          '', data.get('message') || ''
        ].join('\n');
        window.location.href = 'mailto:' + form.dataset.mailto +
          '?subject=' + encodeURIComponent('Discovery call request: ' + data.get('company')) +
          '&body=' + encodeURIComponent(body);
        say('Opening your email app… If nothing happens, email ' + form.dataset.mailto + '.', true);
      }
    });
  }

  /* Pricing: monthly / annual toggle */
  var billing = document.querySelectorAll('[data-billing]');
  billing.forEach(function (b) {
    b.addEventListener('click', function () {
      billing.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      document.querySelectorAll('.plan__amt').forEach(function (el) { el.textContent = el.dataset[b.dataset.billing]; });
      document.querySelectorAll('.plan__per').forEach(function (el) { el.textContent = b.dataset.billing === 'annual' ? '/ month, billed yearly' : '/ month'; });
    });
  });

  /* Insights: category filter */
  var filters = document.querySelectorAll('[data-filter]');
  filters.forEach(function (f) {
    f.addEventListener('click', function () {
      filters.forEach(function (x) { x.setAttribute('aria-pressed', String(x === f)); });
      document.querySelectorAll('.post').forEach(function (p) {
        p.hidden = !(f.dataset.filter === 'all' || p.dataset.cat === f.dataset.filter);
        if (!p.hidden) p.classList.add('is-visible');
      });
    });
  });

  /* Newsletter: opens email app (swap for your email tool's form action later) */
  var nl = document.getElementById('newsletter-form');
  if (nl) nl.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = nl.querySelector('input[type=email]');
    if (!email.checkValidity()) { email.reportValidity(); return; }
    window.location.href = 'mailto:' + nl.dataset.mailto + '?subject=' + encodeURIComponent('Subscribe me to The Dair Ledger') + '&body=' + encodeURIComponent('Please add ' + email.value + ' to the newsletter.');
  });
})();
