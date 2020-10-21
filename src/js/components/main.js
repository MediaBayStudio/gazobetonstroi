//polyfills
//=include intersectionObserverPolyfill.js
//=include customEventsPolyfill.js
//=include utils.js

document.addEventListener('DOMContentLoaded', function() {

  // Делаем глобальный lazy, чтобы потом можно было обновлять его через lazy.refresh()
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });


  windowFuncs.resize.push(setVh);

  // Инициализируем поддержку svg (в основном это надо для svg use в IE)
  svg4everybody();

  let heroBtn = id('hero-btn');
  houseSlider = id('house-slider');

  if (heroBtn) {
    heroBtn.addEventListener('click', scrollToTarget);
  }

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
  //=include telMask.js


// Задаем обработчики событий 'load', 'resize', 'scroll'
// Для объекта window (если массивы не пустые)
  for (let eventType in windowFuncs) {
    if (eventType !== 'call') {
      let funcsArray = windowFuncs[eventType];
      if (funcsArray.length > 0) {
        windowFuncs.call(funcsArray);
        window.addEventListener(eventType, windowFuncs.call);
      }
    }
  }

});