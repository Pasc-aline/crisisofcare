// Shared site navbar. Edit the links here once and every page updates.
// Usage: put <header id="site-header"></header> in the page, then
// <script src="js/nav.js"></script> directly after it (before main.js).
(function () {
  var mount = document.getElementById('site-header');
  if (!mount) return;

  var links = [
    { href: 'index.html#who', label: 'Who we work with', page: null },
    { href: 'services.html',  label: 'Services',         page: 'services' },
    { href: 'about.html',     label: 'About',            page: 'about' },
    { href: 'contact.html',   label: 'Contact',          page: 'contact' },
    { href: 'pricing.html',   label: 'Pricing',          page: 'pricing' }
  ];

  // Works for /about.html and Netlify's pretty URLs (/about, /about/)
  var current = location.pathname.split('/').filter(Boolean).pop() || 'index';
  current = current.replace(/\.html$/, '');

  var linkHtml = links.map(function (l) {
    var active = l.page && l.page === current ? ' class="active" aria-current="page"' : '';
    return '<a href="' + l.href + '"' + active + '>' + l.label + '</a>';
  }).join('\n      ');

  mount.innerHTML =
    '<nav>' +
      '<a class="logo" href="index.html">' +
        '<img src="assets/logo.png" alt="Crisis of Care logo" class="logo-mark">' +
        '<span class="logo-text">Crisis <span>of</span> Care</span>' +
      '</a>' +
      '<button class="navtoggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="navmenu">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
      '<div class="navmenu" id="navmenu">' +
        '<div class="navlinks">' + linkHtml + '</div>' +
        '<a class="navcta" href="contact.html">Start a conversation</a>' +
      '</div>' +
    '</nav>';
})();