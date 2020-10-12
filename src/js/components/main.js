//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include utils.js

document.addEventListener('DOMContentLoaded', function() {

  // делаем глобальный lazy, чтобы потом можно было обновлять его
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  // фикс vh для элементов с 100vh
  window.addEventListener('resize', function() {
    setVh();
    // mobile = mobileRegExp.test(navigator.userAgent);
  });
  setVh();

  svg4everybody();
  
  //includes
//=include menu.js
//=include forms.js
//=include tabs.js
//=include sliders.js
//=include quiz.js
//=include filter.js
//=include loadmore.js
//=include popups.js
//=include projectsGallery.js

});