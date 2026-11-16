(function () {
  // tabbed browser mockups
  document.querySelectorAll('[data-tabs]').forEach(function (b) {
    var img = b.querySelector('.pf-browser__view img');
    var view = b.querySelector('.pf-browser__view');
    b.querySelectorAll('.pf-browser__tab').forEach(function (t) {
      t.addEventListener('click', function () {
        b.querySelectorAll('.pf-browser__tab').forEach(function (x) { x.classList.remove('is-active'); });
        t.classList.add('is-active');
        img.src = t.dataset.src; img.alt = t.dataset.alt || '';
        view.scrollTop = 0;
      });
    });
  });
  // lightbox
  var lb = document.getElementById('pfLightbox');
  if (!lb) return;
  var lbImg = lb.querySelector('img');
  function close() { lb.classList.remove('is-open'); lbImg.src = ''; }
  document.querySelectorAll('.pf-zoom').forEach(function (i) {
    i.addEventListener('click', function () { lbImg.src = i.src; lbImg.alt = i.alt; lb.classList.add('is-open'); lb.scrollTop = 0; });
  });
  lb.addEventListener('click', function (e) { if (e.target === lb || e.target.classList.contains('pf-lightbox__close')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
