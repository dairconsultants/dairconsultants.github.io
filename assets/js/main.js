/* Dair Consultants: site behaviour (no dependencies) */
(function () {
  'use strict';

  /* Footer year */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* Header shadow once the page scrolls */
  var header = document.querySelector('.header');
  function onScroll() { if (header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    document.body.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (btn && nav) {
    btn.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) { setMenu(false); btn.focus(); }
    });
    window.addEventListener('resize', function () { if (window.innerWidth > 900) setMenu(false); });
  }

  /* Contact form
     With data-endpoint set (for example a Formspree URL) it posts there.
     Without one it opens the visitor's email app with the details filled in. */
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = form.querySelector('.form__status');
  var submit = form.querySelector('button[type="submit"]');

  function say(text, ok) { status.textContent = text; status.className = 'form__status ' + (ok ? 'is-ok' : 'is-error'); }
  function fieldError(input, text) {
    var wrap = input.closest('.field');
    var msg = wrap.querySelector('.field__error');
    wrap.classList.toggle('has-error', !!text);
    msg.textContent = text || '';
    if (text) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
  }
  function validate() {
    var first = null;
    Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (input) {
      var text = '';
      if (!input.value.trim()) text = 'Please fill this in.';
      else if (input.type === 'email' && !input.checkValidity()) text = 'Please enter a valid email address.';
      fieldError(input, text);
      if (text && !first) first = input;
    });
    return first;
  }
  form.addEventListener('input', function (e) {
    if (e.target.closest('.field.has-error')) fieldError(e.target, '');
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var invalid = validate();
    if (invalid) { invalid.focus(); say('Please check the highlighted fields.', false); return; }
    if (form.elements._gotcha && form.elements._gotcha.value) return; // spam trap

    var data = new FormData(form);
    var endpoint = form.getAttribute('data-endpoint');
    var to = form.getAttribute('data-mailto');

    if (endpoint) {
      submit.disabled = true;
      say('Sending…', true);
      fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error('send failed');
          form.reset();
          say('Thank you. Your message has been sent and we will be in touch soon.', true);
        })
        .catch(function () { say('Sorry, something went wrong. Please email us at ' + to + '.', false); })
        .then(function () { submit.disabled = false; });
      return;
    }

    var body = [
      'Name: ' + data.get('name'),
      'Company: ' + (data.get('company') || '-'),
      'Email: ' + data.get('email'),
      'Phone: ' + (data.get('phone') || '-'),
      'Help with: ' + data.get('service'),
      '',
      data.get('message') || ''
    ].join('\n');
    window.location.href = 'mailto:' + to +
      '?subject=' + encodeURIComponent('Consultation request from ' + data.get('name')) +
      '&body=' + encodeURIComponent(body);
    say('Your email app should open with your message ready to send. If it does not, write to ' + to + '.', true);
  });
})();
