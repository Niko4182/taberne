// Submits any <form class="w3form"> to FormSubmit (no signup, no key needed)
// over fetch — no page reload, no mail app — and shows an inline message.
//
// Set the destination email once, here. The FIRST time a form is submitted from
// the live site, FormSubmit emails that address an "Activate" link; click it
// once and every submission after that is delivered automatically.
(function () {
  var EMAIL = 'PASTE_DESTINATION_EMAIL_HERE';   // e.g. info@taberne.ge

  var forms = document.querySelectorAll('form.w3form');
  if (!forms.length || EMAIL.indexOf('@') === -1) return;

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');
      var data = Object.fromEntries(new FormData(form).entries());

      if (data._honey) return;                   // honeypot -> silently drop bots
      data._subject = form.dataset.subject || 'Website enquiry - Taberne';
      data._template = 'table';
      data._captcha = 'false';

      if (status) status.hidden = true;
      if (btn) { btn.disabled = true; btn._label = btn.textContent; btn.textContent = form.dataset.sending || 'Sending...'; }

      fetch('https://formsubmit.co/ajax/' + encodeURIComponent(EMAIL), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          var ok = j && (j.success === true || j.success === 'true');
          show(ok);
          if (ok) form.reset();
        })
        .catch(function () { show(false); })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn._label || 'Send'; }
        });

      function show(ok) {
        if (!status) return;
        status.hidden = false;
        status.className = 'form-status field--full ' + (ok ? 'is-ok' : 'is-err');
        status.textContent = ok
          ? (form.dataset.ok || 'Thank you - we have your request and will reply by email.')
          : (form.dataset.err || 'Sorry, something went wrong. Please email info@taberne.ge.');
      }
    });
  });
})();
