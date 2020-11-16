;
(function() {
  menu = new MobileMenu('.menu', {
    openButton: '.hdr__burger',
    closeButtons: '.hdr__burger',
    overlay: '#overlay',
    toRight: true,
    fixHeader: '.hdr'
  });

  q('.btn', menu).addEventListener('click', function() {
    menu.closeMenu();    
  });

})();