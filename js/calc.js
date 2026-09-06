// Price estimator for the Reserve section.
//
// >>> REPLACE THESE with the hotel's real nightly rates (same currency below). <<<
(function () {
  var RATES = {
    'Budget Twin Room': 60,
    'Standard Single': 65,
    'Standard Double': 75,
    'Standard Twin': 75,
    'Superior Double': 90,
    'Superior Twin': 90,
    'Family Room': 115,
    'Family Room with Balcony': 130
  };
  var CURRENCY = '$';        // prefix shown before the amount, e.g. '$' or 'GEL '

  var box = document.getElementById('calc');
  if (!box) return;

  var typeEl  = box.querySelector('[name="type"]');
  var inEl    = box.querySelector('[name="checkin"]');
  var outEl   = box.querySelector('[name="checkout"]');
  var roomsEl = box.querySelector('[name="rooms"]');
  var out     = box.querySelector('.calc-out');

  function nights() {
    if (!inEl.value || !outEl.value) return 0;
    var ms = new Date(outEl.value) - new Date(inEl.value);
    return Math.round(ms / 86400000);
  }

  function update() {
    var n = nights();
    var rooms = Math.max(1, parseInt(roomsEl.value, 10) || 1);
    var rate = RATES[typeEl.value] || 0;

    if (n <= 0 || !rate) {
      out.className = 'calc-out field--full';
      out.textContent = box.dataset.prompt || 'Choose your dates for an estimate.';
      return;
    }
    var word = n === 1 ? (box.dataset.night || 'night') : (box.dataset.nights || 'nights');
    var total = n * rate * rooms;
    out.className = 'calc-out field--full has-value';
    out.textContent = n + ' ' + word + '  ·  ' +
      (box.dataset.approx || 'about') + ' ' + CURRENCY + total.toLocaleString();
  }

  box.addEventListener('input', update);
  box.addEventListener('change', update);
  update();
})();
