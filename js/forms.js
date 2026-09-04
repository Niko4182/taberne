// Submits any <form class="w3form"> to Web3Forms over fetch (no page reload,
// no mail app needed) and shows an inline success / error message.
// Set the access key once, here:
(function () {
  var ACCESS_KEY = 'PASTE_WEB3FORMS_KEY_HERE';

  var forms = document.querySelectorAll('form.w3form');
  if (!forms.length) return;

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var status = form.querySelector('.form-status');
      var btn = form.querySelector('button[type="submit"]');
      var data = Object.fromEntries(new FormData(form).entries());

      if (data.botcheck) return;            // honeypot -> silently drop bots
      data.access_key = ACCESS_KEY;
      data.subject = form.dataset.subject || 'Website enquiry - Taberne';
      data.from_name = 'Taberne website';

      if (status) status.hidden = true;
      if (btn) { btn.disabled = true; btn._label = btn.textContent; btn.textContent = form.dataset.sending || 'Sending...'; }

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json(); })
        .then(function (json) {
          showStatus(json && json.success);
          if (json && json.success) form.reset();
        })
        .catch(function () { showStatus(false); })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = btn._label || 'Send'; }
        });

      function showStatus(ok) {
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
