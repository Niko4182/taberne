// Lightbox for the Gallery section: click a photo to open it full-size,
// arrow keys / on-screen arrows to move, Esc or a click outside to close.
(function () {
  var imgs = Array.prototype.slice.call(document.querySelectorAll('.photo-gallery img'));
  if (!imgs.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-nav lightbox-prev" aria-label="Previous">&#8249;</button>' +
    '<img alt="" />' +
    '<button class="lightbox-nav lightbox-next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(box);

  var big = box.querySelector('img');
  var current = 0;

  function show(i) {
    current = (i + imgs.length) % imgs.length;
    big.src = imgs[current].currentSrc || imgs[current].src;
    big.alt = imgs[current].alt;
    box.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = '';
  }

  imgs.forEach(function (im, i) {
    im.addEventListener('click', function () { show(i); });
  });
  box.querySelector('.lightbox-close').addEventListener('click', close);
  box.querySelector('.lightbox-prev').addEventListener('click', function (e) {
    e.stopPropagation(); show(current - 1);
  });
  box.querySelector('.lightbox-next').addEventListener('click', function (e) {
    e.stopPropagation(); show(current + 1);
  });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });
})();
