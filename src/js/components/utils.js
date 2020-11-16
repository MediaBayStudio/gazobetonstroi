var
  // Определяем бразуер пользователя
  browser = {
    // Opera 8.0+
    isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
    // Firefox 1.0+
    isFirefox: typeof InstallTrigger !== 'undefined',
    // Safari 3.0+ "[object HTMLElementConstructor]"
    isSafari: /constructor/i.test(window.HTMLElement) || (function(p) {
      return p.toString() === "[object SafariRemoteNotification]";
    })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification)),
    // Internet Explorer 6-11
    isIE: /*@cc_on!@*/ false || !!document.documentMode,
    // Edge 20+
    isEdge: !( /*@cc_on!@*/ false || !!document.documentMode) && !!window.StyleMedia,
    // Chrome 1+
    isChrome: !!window.chrome && !!window.chrome.webstore,
    isYandex: !!window.yandex,
    isMac: window.navigator.platform.toUpperCase().indexOf('MAC') >= 0
  },
  /*
  Объединение слушателей для window на события 'load', 'resize', 'scroll'
  Все слушатели на окно следует задавать через него, например:
    window.resize.push(functionName)
  Все ф-ии, добавленные в [] window.resize, будут заданы одним слушателем
  */
  windowFuncs = {
    load: [],
    resize: [],
    scroll: [],
    call: function(event) {
      let funcs = windowFuncs[event.type] || event;
      for (let i = funcs.length - 1; i >= 0; i--) {
        // console.log(funcs[i].name);
        funcs[i]();
      }
    }
  },

  mask, // ф-я маски телефонов в поля ввода (в файле telMask.js)
  smallArrowSvg,
  createArrow,
  lazy,
  menu,
  hdr,
  overlay,
  galleryPopup,
  zoomPopup,
  thanksPopup,
  thanksPopupTimer,
  body = document.body,
  templateDir = body.dataset.templateDirUri,
  siteUrl = body.dataset.siteUrl,
  houseSlider,
  // callbackPopup,
  // orderPopup,
  fakeScrollbar,
  // Сокращение записи querySelector 
  q = function(selector, element) {
    element = element || body;
    return element.querySelector(selector);
  },
  // Сокращение записи querySelectorAll + перевод в массив
  qa = function(selectors, element, toArray) {
    element = element || body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  // Сокращение записи getElementById
  id = function(selector) {
    return document.getElementById(selector);
  },
  // Фикс 100% высоты экрана для моб. браузеров
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  // Сокращение записи window.matchMedia('query').matches
  matchesMedia = function(media) {
    return window.matchMedia(media).matches;
  },
  // // Липкий элемент средствами js
  // sticky = function($el, fixThresholdDir, className) {
  //   $el = typeof $el === 'string' ? q($el) : $el;
  //   className = className || 'fixed';
  //   fixThresholdDir = fixThresholdDir || 'bottom';

  //   let fixThreshold = $el.getBoundingClientRect()[fixThresholdDir] + pageYOffset,
  //     $elClone = $el.cloneNode(true),
  //     $elParent = $el.parentElement,
  //     fixElement = function() {
  //       if (!$el.classList.contains(className) && pageYOffset >= fixThreshold) {
  //         $elParent.appendChild($elParent.replaceChild($elClone, $el));
  //         $el.classList.add(className);

  //         window.removeEventListener('scroll', fixElement);
  //         window.addEventListener('scroll', unfixElement);
  //       }
  //     },
  //     unfixElement = function() {
  //       if ($el.classList.contains(className) && pageYOffset <= fixThreshold) {
  //         $elParent.replaceChild($el, $elClone);
  //         $el.classList.remove(className);

  //         window.removeEventListener('scroll', unfixElement);
  //         window.addEventListener('scroll', fixElement);
  //       }
  //     };

  //   $elClone.classList.add('clone');
  //   fixElement();
  //   window.addEventListener('scroll', fixElement);
  // },
  // Прокрутка до элемента при помощи requestAnimationFrame
  scrollToTarget = function(event, target) {
    event.preventDefault();

    target = target || this.dataset.scrollTarget || this.getAttribute('href');

    if (target.constructor === String) {
      target = q(target);
    }

    if (!target) {
      console.warn('Scroll target not found');
      return;
    }

    let wndwY = window.pageYOffset,
      targetStyles = getComputedStyle(target),
      targetTop = target.getBoundingClientRect().top - +(targetStyles.paddingTop).slice(0, -2) - +(targetStyles.marginTop).slice(0, -2),
      start = null,
      V = .35,
      step = function(time) {
        if (start === null) {
          start = time;
        }
        let progress = time - start,
          r = (targetTop < 0 ? Math.max(wndwY - progress / V, wndwY + targetTop) : Math.min(wndwY + progress / V, wndwY + targetTop));

        window.scrollTo(0, r);

        if (r != wndwY + targetTop) {
          requestAnimationFrame(step);
        }
      }

    requestAnimationFrame(step);
  };