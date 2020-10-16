//polyfills
(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};let c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
var
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
  mask,
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
  // page = document.body.dataset.page,
  // mobileRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  // mobile = mobileRegExp.test(navigator.userAgent),
  // IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1,
  q = function(selector, element) {
    element = element || body;
    return element.querySelector(selector);
  },
  qa = function(selectors, element, toArray) {
    element = element || body;
    return toArray ? Array.prototype.slice.call(element.querySelectorAll(selectors)) : element.querySelectorAll(selectors);
  },
  id = function(selector) {
    return document.getElementById(selector);
  },
  // showLoader = function() {
  //   loader.classList.add('active');
  // },
  // hideLoader = function() {
  //   loader.style.opacity = 0;
  // },
  setVh = function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
  },
  matchesMedia = function(media) {
    return window.matchMedia(media).matches;
  },
  scrollToTarget = function(event, target) {
    event.preventDefault();

    target = target || this.dataset.scrollTarget;

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

document.addEventListener('DOMContentLoaded', function() {

  // делаем глобальный lazy, чтобы потом можно было обновлять его
  lazy = new lazyload({
    clearSrc: true,
    clearMedia: true
  });

  // фикс vh для элементов с 100vh
  window.addEventListener('resize', function() {
    setVh();
  });
  setVh();

  svg4everybody();

  let heroBtn = id('hero-btn');
  houseSlider = id('house-slider');

  if (heroBtn) {
    heroBtn.addEventListener('click', scrollToTarget); 
  }
  
  //includes
menu = new MobileMenu('.menu', {
  openButton: '.hdr__burger',
  closeButtons: '.hdr__burger',
  overlay: '#overlay',
  toRight: true,
  fixHeader: '.hdr'
});
;
(function() {
  let $contactsForm = id('contacts-form'),
    $callbackForm = id('callback-form'),
    $quizForm = id('quiz-form');


  let formValidator = function(params) {
    let $form = params.form,
      $formBtn = params.formBtn,
      $uploadFilesBlock = params.uploadFilesBlock,
      errorsClass = 'invalid',
      $filesInput = params.filesInput,
      rules = {
        name: {
          required: true
        },
        tel: {
          required: true,
          pattern: /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
          or: 'email'
        },
        email: {
          required: true,
          pattern: /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z])+$/,
          or: 'tel'
        },
        msg: {
          required: true,
          pattern: /[^\<\>\[\]%\&'`]+$/
        },
        policy: {
          required: true
        }
      },
      messages = {
        tel: {
          required: 'Введите ваш телефон или E-mail',
          pattern: 'Укажите верный телефон'
        },
        name: {
          required: 'Введите ваше имя',
        },
        email: {
          required: 'Введите ваш E-mail или телефон',
          pattern: 'Введите верный E-mail'
        },
        msg: {
          required: 'Введите ваше сообщение',
          pattern: 'Введены недопустимые символы'
        },
        policy: {
          required: 'Согласитель с политикой обработки персональных данных'
        }
      },
      /*
        Функция получения значения полей у текущей формы.
        Ищет только те элементы формы, именя которых указаны в rules.
        Возвращает объект: 
        {название-поля: значение-поля}
        Например:
        {'user-email': 'mail@mail.ru'}
      */
      getFormData = function($form) {
        let formElements = $form.elements,
          values = {};

        for (let rule in rules) {
          let formElement = formElements[rule];

          if (formElement) {
            values[rule] = formElement.value;
          }
        }

        return values;
      },
      /*
        Функция проверки правильности заполнения формы.
      */
      validationForm = function(event) {
        let errors = {},
          thisForm = $form,
          values = getFormData(thisForm);

        for (let elementName in values) {
          let rule = rules[elementName],
            $formElement = thisForm[elementName],
            elementValue = values[elementName],
            or = rule.or,
            $orFormElement = thisForm[or];

          if (rule) {
            if ($formElement.hasAttribute('required') || rule.required === true) {
              let elementType = $formElement.type,
                pattern = rule.pattern;

              if (((elementType === 'checkbox' || elementType === 'radio') && !$formElement.checked) ||
                elementValue === '') {

                if (or) {
                  if ($orFormElement.value === '') {
                    errors[elementName] = messages[elementName].required;
                    continue;
                  }
                } else {
                  errors[elementName] = messages[elementName].required;
                  continue;
                }
              }

              if (elementType !== 'cehckbox' && elementType !== 'radio' && pattern) {
                if (pattern.test(elementValue) === false) {
                  if (or) {
                    if ($orFormElement.value === '') {
                      errors[elementName] = messages[elementName].pattern;
                      continue;
                    }
                  } else {
                    errors[elementName] = messages[elementName].pattern;
                    continue;
                  }

                }
              }

              hideError($formElement);
            }
          }
        }

        if (Object.keys(errors).length == 0) {
          thisForm.removeEventListener('change', validationForm);
          thisForm.removeEventListener('input', validationForm);
          $form.validatie = true;
        } else {
          thisForm.addEventListener('change', validationForm);
          thisForm.addEventListener('input', validationForm);
          showErrors(thisForm, errors);
          $form.validatie = false;
        }

      },
      showErrors = function($form, errors) {
        let $formElements = $form.elements;

        for (let elementName in errors) {
          let errorText = errors[elementName],
            $errorElement = `<label class="${errorsClass}">${errorText}</label>`,
            $formElement = $formElements[elementName],
            $nextElement = $formElement.nextElementSibling;

          if ($nextElement && $nextElement.classList.contains(errorsClass)) {
            if ($nextElement.textContent !== errorText) {
              $nextElement.textContent = errorText;
            }
            continue;
          } else {
            $formElement.insertAdjacentHTML('afterend', $errorElement);
          }

          $formElement.classList.add(errorsClass);
        }

      },
      hideError = function($formElement) {
        let $nextElement = $formElement.nextElementSibling;
        $formElement.classList.remove(errorsClass);
        if ($nextElement && $nextElement.classList.contains(errorsClass)) {
          $nextElement.parentElement.removeChild($nextElement);
        }
      },
      submitHandler = function(event) {
        let $form = q('#' + event.detail.id + '>form'),
          eventType = event.type;

        if (eventType === 'wpcf7mailsent') {
          let $formElements = $form.elements;

          for (let i = 0; i < $formElements.length; i++) {
            hideError($formElements[i]);
            $formElements[i].classList.remove('filled');
          }

          $form.reset();
          if ($uploadFilesBlock) {
            $uploadFilesBlock.innerHTML = '';
          }
          if ($form === $quizForm) {
            id('quiz').resetQuiz();
          }
          console.log('отправлено');
        }
        /* else if (eventType === 'wpcf7mailfailed') {
                console.log('отправка не удалась');
              }*/

        $form.classList.remove('loading');

        thanksPopup.openPopup();
        thanksPopupTimer = setTimeout(function() {
          thanksPopup.closePopup();
        }, 3000);


      },
      toggleInputsClass = function() {
        let $input = event.target,
          type = $input.type,
          files = $input.files,
          classList = $input.classList,
          value = $input.value;

        if (type === 'text' || $input.tagName === 'TEXTAREA') {
          if (value === '') {
            classList.remove('filled');
          } else {
            classList.add('filled');
          }
        } else if (type === 'file') {
          // $input.filesArray = [];

          let uploadedFiles = '';
          for (let i = 0, len = files.length; i < len; i++) {
            // $input.filesArray[i] = files[i];
            uploadedFiles += '<span class="uploadedfiles__file"><span class="uploadedfiles__file-text">' + files[i].name + '</span></span>';
          }
          $uploadFilesBlock.innerHTML = uploadedFiles;
        }
      };

    $form.setAttribute('novalidate', '');
    $form.validatie = false;
    $formBtn.addEventListener('click', function() {
      validationForm();
      if ($form.validatie === false) {
        event.preventDefault();
      } else {
        $form.classList.add('loading');
      }
    });
    if (!document.wpcf7mailsent) {
      document.addEventListener('wpcf7mailsent', submitHandler);
      document.wpcf7mailsent = true;
    }
    $form.addEventListener('input', toggleInputsClass);
  };



  if ($contactsForm) {
    let $contactsFormBtn = q('button', $contactsForm),
      $uploadFilesBlock = id('uploadedfiles'),
      $filesInput = id('files-input');

    formValidator({
      form: $contactsForm,
      formBtn: $contactsFormBtn,
      uploadFilesBlock: $uploadFilesBlock,
      filesInput: $filesInput
    });
  }

  if ($callbackForm) {
    let $callbackFormBtn = q('button', $callbackForm),
      projectName = body.dataset.project;

    if (projectName) {
      q('[name="project"]', $callbackForm).value = projectName;
    }

    formValidator({
      form: $callbackForm,
      formBtn: $callbackFormBtn
    });
  }

  if ($quizForm) {
    let $quizFormBtn = q('button', $quizForm);

    formValidator({
      form: $quizForm,
      formBtn: $quizFormBtn
    });
  }


})();
;
(function() {
  let detailsBtnsblock = id('details-btns'),
    detailsTextBlock = id('details-text'),

    turnkeyBtnsBlock = id('turnkey-tabs-btns'),
    turnkeyTextBlock = id('turnkey-tabs-text-block');



  if (detailsBtnsblock || turnkeyBtnsBlock) {

    let initTabs = function($btnsBlock, $textBlock) {
      if ($btnsBlock || $textBlock) {
        let tabsContents = $textBlock.children,
          tabs = $btnsBlock.children,
          tabFocus = 0,
          changeTabs = function(event) {
            let target = event.target;

            if (target.tagName === 'BUTTON') {
              let parent = target.parentNode,
                grandparent = parent.parentNode,
                tabContent = q('#' + target.getAttribute('aria-controls'), grandparent.parentNode);

              // Убираем выделение с кнопок
              qa('[aria-selected="true"]', parent, true)
                .forEach(function(el) {
                  el.setAttribute('aria-selected', false);
                  el.classList.remove('is-active');
                });

              // Скрываем все тексты
              qa('[role="tabpanel"]', grandparent, true)
                .forEach(function(el) {
                  el.setAttribute('aria-hidden', true);
                  el.classList.remove('is-active');
                });

              // Делаем активной текущую кнопку-таб
              target.setAttribute('aria-selected', true);
              target.classList.add('is-active');

              // Показываем контент переключателя
              tabContent.removeAttribute('aria-hidden');
              tabContent.classList.add('is-active');

              // Устанавливаем фокус
              for (let i = tabs.length - 1; i >= 0; i--) {
                if (tabs[i] === target) {
                  tabFocus = i;
                  break;
                }
              }

            }
          }


        $btnsBlock.addEventListener('click', changeTabs);

        $btnsBlock.addEventListener('keydown', function(event) {
          // Двигаемся вправо
          if (event.keyCode === 39 || event.keyCode === 37) {
            tabs[tabFocus].setAttribute('tabindex', -1);
            if (event.keyCode === 39) {
              tabFocus++;
              // Если дошли до конца, то начинаем сначала
              if (tabFocus >= tabs.length) {
                tabFocus = 0;
              }
              // Двигаемся влево
            } else if (event.keyCode === 37) {
              tabFocus--;
              // Если дошли до конца, то начинаем сначала
              if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
              }
            }

            tabs[tabFocus].setAttribute('tabindex', 0);
            tabs[tabFocus].focus();
          }
        });
      }

    };


    initTabs(detailsBtnsblock, detailsTextBlock);
    initTabs(turnkeyBtnsBlock, turnkeyTextBlock);

  }


})();
;
(function() {
  smallArrowSvg = '<svg class="arrow__svg" width="18" height="8" viewBox="0 0 18 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.3536 4.52494C17.5488 4.32968 17.5488 4.0131 17.3536 3.81783L14.1716 0.635853C13.9763 0.440591 13.6597 0.440591 13.4645 0.635853C13.2692 0.831115 13.2692 1.1477 13.4645 1.34296L16.2929 4.17139L13.4645 6.99981C13.2692 7.19508 13.2692 7.51166 13.4645 7.70692C13.6597 7.90218 13.9763 7.90218 14.1716 7.70692L17.3536 4.52494ZM0 4.67139H17V3.67139H0L0 4.67139Z" fill="currentColor"/></svg>';

  createArrow = function(className, inside) {

    className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;

    return `<button type="button" class="arrow arrow__${className}">${inside}</button>`;
  };

  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    // longArrowSvg = '<svg class="arrow__svg" width="106" height="9" fill="url(#gradient)" xmlns="http://www.w3.org/2000/svg"><path d="M105.354 4.828a.5.5 0 000-.707L102.172.939a.501.501 0 00-.708.707l2.829 2.828-2.829 2.829a.5.5 0 00.708.707l3.182-3.182zM0 4.974h105v-1H0v1z" fill="inherit" /><defs><linearGradient id="gradient"><stop offset="0%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: currentColor"></stop><stop offset="100%" style="stop-color: currentColor"></stop></linearGradient></defs></svg>',
    longArrowSvg = '<svg class="arrow__svg" width="106" height="9" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M105.354 4.828a.5.5 0 000-.707L102.172.939a.501.501 0 00-.708.707l2.829 2.828-2.829 2.829a.5.5 0 00.708.707l3.182-3.182zM0 4.974h105v-1H0v1z" fill="inherit" /></svg>',
    cornerArrowSvg = '<svg class="arrow__svg" width="11" height="20" viewBox="0 0 11 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M1 1l9 9-9 9" stroke="currentColor"/></svg>',

    counterCurrentSelector = '.slider-nav__counter-current',
    counterTotalSelector = '.slider-nav__counter-total',

    slickSliderClass = 'slick-slider',

    reviewsSlider = id('reviews-slider'),
    reviewsSelector = '.review',
    reviewsSlides = reviewsSlider && qa(reviewsSelector, reviewsSlider),

    casesSlider = id('cases'),
    casesSlides = casesSlider && qa('.house', casesSlider),


    stagesSlider = id('stages-slider'),
    stagesSelector = '.stage',
    stagesSlides = stagesSlider && qa(stagesSelector, stagesSlider),

    featuresSlider = id('features-slider'),
    featuresSelector = '.feat',
    featuresSlides = featuresSlider && qa(featuresSelector, featuresSlider),

    // houseSlider = id('house-slider'), переехал в глоабльное пространство
    houseSlisesSelector = '.house-slider__img',
    houseSlides = houseSlider && qa(houseSlisesSelector, houseSlider),

    houseSliderNav = id('house-nav'),
    houseSlidesNav = houseSliderNav && qa('.house-nav__img', houseSliderNav, true),

    // Слайдер в главной секции без фона (стр. о компании)
    featsSlider = id('feats-slider'),
    featsSelector = '.feat',
    featsSlides = featsSlider && qa(featsSelector, featsSlider),

    // Слайдер команды
    teamSlider = id('team-slider'),
    teamSelector = '.char',
    teamSlides = teamSlider && qa(teamSelector, teamSlider),

    // Слайдер материалов
    materialsSlider = id('materials-slider'),
    materialsSelector = '.material-sect__figure',
    materialsSlides = materialsSlider && qa(materialsSelector, materialsSlider),

    // Слайдер карточек новостей
    newsSlider = id('news-slider'),
    newsSelector = '.post',
    newsSlides = newsSlider && qa(newsSelector, newsSlider),

    buildSliders = function() {
      for (let i = buildSlidersFunctions.length - 1; i >= 0; i--) {
        buildSlidersFunctions[i]();
      }
    },
    buildSlidersFunctions = [];

  // Слайдер проектов
  // Слайдер в главной секции на страницах
  $('.project__slider, .hero-page-sect__figure').each(function() {
    let $slider = $(this),
      slidesSelector = $slider.hasClass('project__slider') ? '.project__img' : '.hero-page-sect__img',
      $slides = qa(slidesSelector, $slider[0]),
      counterCurrentSlide = q(counterCurrentSelector, $slider[0]),
      counterTotalSlides = q(counterTotalSelector, $slider[0]);

    $slider.slick({
      appendArrows: $('.slider-nav', $slider),
      infinite: false,
      slide: slidesSelector,
      draggable: false,
      prevArrow: createArrow('project__prev', smallArrowSvg),
      nextArrow: createArrow('project__next', smallArrowSvg),
    });

    counterTotalSlides.textContent = $slides.length;

    $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      counterCurrentSlide.textContent = nextSlide + 1;
    });
  });



  if (reviewsSlider && reviewsSlides.length && reviewsSlides.length > 1) {
    let $reviewsSlider = $(reviewsSlider),
      counterCurrentSlide = q(counterCurrentSelector, reviewsSlider),
      counterTotalSlides = q(counterTotalSelector, reviewsSlider),
      buildReviewsSlider = function() {
        // если ширина экрана больше 576px и слайдов меньше 3, то слайдера не будет
        // показываем по 2 слайда
        if (matchesMedia('(min-width: 575.98px)') && reviewsSlides.length < 3) {
          if (reviewsSlider.classList.contains(slickSliderClass)) {
            $reviewsSlider.slick('unslick');
          }
          // если ширина экрана больше 1024px и слайдов меньше 5, то слайдера не будет
          // показываем по 4 слайда
        } else if (matchesMedia('(min-width: 767.98px)') && reviewsSlides.length < 3) {
          if (reviewsSlider.classList.contains(slickSliderClass)) {
            $reviewsSlider.slick('unslick');
          }
          // в других случаях делаем слайдер
        } else if (matchesMedia('(min-width: 1439.98px)') && reviewsSlides.length < 4) {
          if (reviewsSlider.classList.contains(slickSliderClass)) {
            $reviewsSlider.slick('unslick');
          }
          // в других случаях делаем слайдер
        } else {
          if (reviewsSlider.classList.contains(slickSliderClass)) {
            // слайдер уже создан
            return;
          }
          $reviewsSlider.slick({
            appendArrows: $('.reviews-sect__nav'),
            prevArrow: createArrow('reviews-sect__prev', smallArrowSvg),
            nextArrow: createArrow('reviews-sect__next', smallArrowSvg),
            slide: reviewsSelector,
            infinite: false,
            mobileFirst: true,
            variableWidth: true,
            centerMode: true,
            centerPadding: '0px',
            responsive: [{
              breakpoint: 575.98,
              settings: {
                centerMode: false,
                slidesToShow: 2,
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                centerMode: false,
                slidesToShow: 3
              }
            }]
          });

          let counterTotal = reviewsSlides.length;

          if (matchesMedia('(min-width:1439.98px)')) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia('(min-width:575.98px)')) {
            counterTotal--;
          } else {
            counterTotal = reviewsSlides.length;
          }

          counterTotalSlides.textContent = counterTotal;

          $reviewsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions.push(buildReviewsSlider);
  }

  if (casesSlider && casesSlides.length && casesSlides.length > 1) {
    let $casesSlider = $(casesSlider),
      casesSliderParent = casesSlider.parentElement,
      counterCurrentSlide = q(counterCurrentSelector, casesSliderParent),
      counterTotalSlides = q(counterTotalSelector, casesSliderParent),
      buildCasesSlider = function() {
        if (matchesMedia('(min-width: 575.98px)')) {
          if (casesSlider.classList.contains(slickSliderClass)) {
            $casesSlider.slick('unslick');
          }
        } else {
          if (casesSlider.classList.contains(slickSliderClass)) {
            // слайдер уже создан
            return;
          }
          $casesSlider.slick({
            appendArrows: $('.cases__nav'),
            prevArrow: createArrow('cases__prev', smallArrowSvg),
            nextArrow: createArrow('cases__next', smallArrowSvg),
            infinite: false,
            variableWidth: true,
            centerMode: true,
            centerPadding: '0px',
          });

          let counterTotal = reviewsSlides.length;

          counterTotalSlides.textContent = counterTotal;

          $casesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions.push(buildCasesSlider);
  }

  if (stagesSlider && stagesSlides.length && stagesSlides.length > 1) {
    let $stagesSlider = $(stagesSlider),
      counterCurrentSlide = q(counterCurrentSelector, stagesSlider),
      counterTotalSlides = q(counterTotalSelector, stagesSlider),
      buildStagesSlider = function() {
        if (stagesSlider.classList.contains(slickSliderClass)) {
          // слайдер уже создан
          return;
        }
        $stagesSlider.slick({
          appendArrows: $('.stages__nav'),
          prevArrow: createArrow('stages__prev', longArrowSvg),
          nextArrow: createArrow('stages__next', longArrowSvg),
          infinite: false,
          adaptiveHeight: true,
          slide: stagesSelector,
          fade: true
        });
      }

    let counterTotal = stagesSlides.length;

    counterTotalSlides.textContent = counterTotal;

    $stagesSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      counterCurrentSlide.textContent = nextSlide + 1;
    });

    buildSlidersFunctions.push(buildStagesSlider);
  }

  if (featuresSlider && featuresSlides.length && featuresSlides.length > 1) {
    let $featuresSlider = $(featuresSlider),
      featuresPrevArrowClass = 'features__prev',
      featuresNextArrowClass = 'features__next',
      counterCurrentSlide = q('.features__counter-current', featuresSlider),
      counterTotalSlides = q('.features__counter-total', featuresSlider),
      buildFeaturesSlider = function() {
        // если ширина экрана больше 576px и слайдов меньше 3, то слайдера не будет
        // показываем по 2 слайда
        if (matchesMedia('(min-width: 575.98px)') && featuresSlides.length < 3) {
          if (featuresSlider.classList.contains(slickSliderClass)) {
            $featuresSlider.slick('unslick');
          }
          // если ширина экрана больше 1024px и слайдов меньше 5, то слайдера не будет
          // показываем по 4 слайда
        } else if (matchesMedia('(min-width: 1439.98px)') && featuresSlides.length < 4) {
          if (featuresSlider.classList.contains(slickSliderClass)) {
            $featuresSlider.slick('unslick');
          }
          // в других случаях делаем слайдер
        } else {
          if (featuresSlider.classList.contains(slickSliderClass)) {
            // слайдер уже создан
            return;
          }
          $featuresSlider.slick({
            appendArrows: $('.features__nav'),
            prevArrow: createArrow(featuresPrevArrowClass, smallArrowSvg),
            nextArrow: createArrow(featuresNextArrowClass, smallArrowSvg),
            slide: featuresSelector,
            infinite: false,
            mobileFirst: true,
            variableWidth: true,
            centerMode: true,
            centerPadding: '0px',
            responsive: [{
              breakpoint: 575.98,
              settings: {
                centerMode: false,
                slidesToShow: 2
              }
            }, {
              breakpoint: 767.98,
              settings: {
                centerMode: false,
                slidesToShow: 3,
                prevArrow: createArrow(featuresPrevArrowClass, cornerArrowSvg),
                nextArrow: createArrow(featuresNextArrowClass, cornerArrowSvg)
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                slidesToShow: 4,
                centerMode: false,
                prevArrow: createArrow(featuresPrevArrowClass, cornerArrowSvg),
                nextArrow: createArrow(featuresNextArrowClass, cornerArrowSvg)
              }
            }]
          });

          let counterTotal = featuresSlides.length;

          if (matchesMedia('(min-width:1439.98px)')) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia('(min-width:575.98px)')) {
            counterTotal--;;
          }

          counterTotalSlides.textContent = counterTotal;

          $featuresSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions.push(buildFeaturesSlider);
  }

  if (houseSlider) {
    let $houseSlider = $(houseSlider),
      prevArrowClass = 'house-slider__prev',
      nextArrowClass = 'house-slider__next',
      $houseSliderParent = houseSlider.parentElement,
      counterTotal = houseSlides.length,
      $houseSliderNav = $(houseSliderNav),
      counterCurrentSlide = q(counterCurrentSelector, $houseSliderParent),
      counterTotalSlides = q(counterTotalSelector, $houseSliderParent),
      buildHousesSlider = function() {
        $houseSlider.slick({
          appendArrows: $('.house-sect__gallery-nav'),
          prevArrow: createArrow(prevArrowClass, longArrowSvg),
          nextArrow: createArrow(nextArrowClass, longArrowSvg),
          slide: houseSlisesSelector,
          asNavFor: $houseSliderNav,
          infinite: false,
          mobileFirst: true,
          draggable: false,
          // responsive: [{
          //   breakpoint: 1023.98,
          //   settings: {
          //     prevArrow: createArrow(prevArrowClass, smallArrowSvg),
          //     nextArrow: createArrow(nextArrowClass, smallArrowSvg)
          //   }
          // }, {
          //   breakpoint: 1439.98,
          //   settings: {
          //     prevArrow: createArrow(prevArrowClass, longArrowSvg),
          //     nextArrow: createArrow(nextArrowClass, longArrowSvg)
          //   }
          // }]
        });

        counterTotalSlides.textContent = counterTotal;

        $houseSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          counterCurrentSlide.textContent = nextSlide + 1;
          houseSlidesNav[currentSlide].classList.remove('active');
          houseSlidesNav[nextSlide].classList.add('active');
        });

        houseSlidesNav[0].classList.add('active');

        houseSliderNav.addEventListener('click', function() {
          let target = event.target,
            tragetIndex = houseSlidesNav.indexOf(target);

          $houseSlider.slick('slickGoTo', tragetIndex);

        });
      },
      buildNavSlider = function() {
        $houseSliderNav.slick({
          arrows: false,
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 4,
          // draggable: false
        });
      };

    buildSlidersFunctions.push(buildHousesSlider, buildNavSlider);
  }

  if (featsSlider) {
    let $featsSlider = $(featsSlider),
      counterCurrentSlide = q(counterCurrentSelector, featsSlider),
      counterTotalSlides = q(counterTotalSelector, featsSlider),
      buildFeatsSlider = function() {
        // Если размер экрана больше 768px и если есть слайдер, то уберем его
        if (matchesMedia('(min-width: 767.98px)')) {
          if (featsSlider.classList.contains(slickSliderClass)) {
            $featsSlider.slick('unslick');
          }
        } else {
          if (featsSlider.classList.contains(slickSliderClass)) {
            return;
          }
          $featsSlider.slick({
            appendArrows: $('.slider-nav', $featsSlider),
            prevArrow: createArrow('feats__prev', smallArrowSvg),
            nextArrow: createArrow('feats__next', smallArrowSvg),
            slide: featsSelector,
            infinite: false,
            mobileFirst: true,
            // variableWidth: true,
            // centerMode: true,
            // centerPadding: '0px',
            responsive: [{
              breakpoint: 575.98,
              settings: {
                // centerMode: false,
                slidesToShow: 2
              }
            }]
          });

          let counterTotal = featsSlides.length;

          if (matchesMedia('(min-width:1439.98px)')) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia('(min-width:575.98px)')) {
            counterTotal--;
          }

          counterTotalSlides.textContent = counterTotal;

          $featsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions.push(buildFeatsSlider);
  }

  if (teamSlider && teamSlides.length && teamSlides.length > 1) {
    let $teamSlider = $(teamSlider),
      $teamSliderParent = teamSlider.parentElement,
      counterCurrentSlide = q(counterCurrentSelector, $teamSliderParent),
      counterTotalSlides = q(counterTotalSelector, $teamSliderParent),
      buildTeamSlider = function() {
        if (matchesMedia('(min-width: 575.98px)') && teamSlides.length < 3) {
          if (teamSlider.classList.contains(slickSliderClass)) {
            $teamSlider.slick('unslick');
          }
        } else if (matchesMedia('(min-width: 1023.98px)') && teamSlides.length < 4) {
          if (teamSlider.classList.contains(slickSliderClass)) {
            $teamSlider.slick('unslick');
          }
        } else if (matchesMedia('(min-width: 1439.98px)') && teamSlides.length < 5) {
          if (teamSlider.classList.contains(slickSliderClass)) {
            $teamSlider.slick('unslick');
          }
        } else {
          if (teamSlider.classList.contains(slickSliderClass)) {
            return;
          }
          $teamSlider.slick({
            appendArrows: $('.slider-nav', $teamSliderParent),
            prevArrow: createArrow('team-sect__prev', smallArrowSvg),
            nextArrow: createArrow('team-sect__next', smallArrowSvg),
            slide: teamSelector,
            infinite: false,
            mobileFirst: true,
            variableWidth: true,
            centerMode: true,
            centerPadding: '0px',
            responsive: [{
              breakpoint: 575.98,
              settings: {
                centerMode: false,
                slidesToShow: 2
              }
            }, {
              breakpoint: 1023.98,
              settings: {
                centerMode: false,
                slidesToShow: 3
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                centerMode: false,
                slidesToShow: 4
              }
            }]
          });

          let counterTotal = teamSlides.length;

          if (matchesMedia('(min-width:1439.98px)')) {
            counterTotal = counterTotal - 3;
          } else if (matchesMedia('(min-width:1023.98px)')) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia('(min-width:575.98px)')) {
            counterTotal--;
          }

          counterTotalSlides.textContent = counterTotal;

          $teamSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions.push(buildTeamSlider);
  }

  if (materialsSlider) {
    let $materialsSlider = $(materialsSlider),
      counterCurrentSlide = q(counterCurrentSelector, materialsSlider),
      counterTotalSlides = q(counterTotalSelector, materialsSlider),
      buildFeatsSlider = function() {
        if (matchesMedia('(min-width: 575.98px)')) {
          if (materialsSlider.classList.contains(slickSliderClass)) {
            $materialsSlider.slick('unslick');
          }
        } else {
          if (materialsSlider.classList.contains(slickSliderClass)) {
            return;
          }
          $materialsSlider.slick({
            appendArrows: $('.slider-nav', $materialsSlider),
            prevArrow: createArrow('material-sect__prev', smallArrowSvg),
            nextArrow: createArrow('material-sect__next', smallArrowSvg),
            slide: materialsSelector,
            infinite: false
          });

          let counterTotal = materialsSlides.length;

          counterTotalSlides.textContent = counterTotal;

          $materialsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions.push(buildFeatsSlider);
  }

  if (newsSlider && newsSlides.length && newsSlides.length > 1) {
    let $newsSlider = $(newsSlider),
      newsSliderParent = newsSlider.parentElement,
      counterCurrentSlide = q(counterCurrentSelector, newsSliderParent),
      counterTotalSlides = q(counterTotalSelector, newsSliderParent),
      buildTeamSlider = function() {
        if (matchesMedia('(min-width: 575.98px)') && newsSlides.length < 3) {
          if (newsSlider.classList.contains(slickSliderClass)) {
            $newsSlider.slick('unslick');
          }
        } else if (matchesMedia('(min-width: 1023.98px)') && newsSlides.length < 4) {
          if (newsSlider.classList.contains(slickSliderClass)) {
            $newsSlider.slick('unslick');
          }
        } else if (matchesMedia('(min-width: 1439.98px)') && newsSlides.length < 5) {
          if (newsSlider.classList.contains(slickSliderClass)) {
            $newsSlider.slick('unslick');
          }
        } else {
          if (newsSlider.classList.contains(slickSliderClass)) {
            return;
          }
          $newsSlider.slick({
            appendArrows: $('.slider-nav', newsSliderParent),
            prevArrow: createArrow('news-slider__prev', smallArrowSvg),
            nextArrow: createArrow('news-slider__next', smallArrowSvg),
            slide: newsSelector,
            infinite: false,
            mobileFirst: true,
            variableWidth: true,
            centerMode: true,
            centerPadding: '0px',
            responsive: [{
              breakpoint: 575.98,
              settings: {
                centerMode: false,
                slidesToShow: 2
              }
            }, {
              breakpoint: 1023.98,
              settings: {
                centerMode: false,
                slidesToShow: 3
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                centerMode: false,
                slidesToShow: 4
              }
            }]
          });

          let counterTotal = newsSlides.length;

          if (matchesMedia('(min-width:1439.98px)')) {
            counterTotal = counterTotal - 3;
          } else if (matchesMedia('(min-width:1023.98px)')) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia('(min-width:575.98px)')) {
            counterTotal--;
          }

          counterTotalSlides.textContent = counterTotal;

          $newsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions.push(buildTeamSlider);
  }

  if (buildSlidersFunctions.length > 0) {
    window.addEventListener('resize', buildSliders);
    buildSliders();
  }

  // настройки grab курсора на всех слайдерах
  $('.slick-list.draggable').on('mousedown', function() {
    $(this).addClass('grabbing');
  });

  $('.slick-list.draggable').on('beforeChange', function() {
    $(this).removeClass('grabbing');
  });

  $(document).on('mouseup', function() {
    $('.slick-list.draggable').removeClass('grabbing');
  });


})();
;
(function() {

  let $quizBlock = id('quiz'),
    $quizForm = $quizBlock && id('quiz-form'),
    $quizResult = $quizForm && q('.quiz__form-result', $quizForm),
    $quizImg = $quizBlock && q('.quiz__img');

  if ($quizBlock) {
    window.Quiz = (function() {
      Quiz = (function() {
        return function(element, options) {
          let _ = this;

          _.assign = function(inserted, obj) {
            for (let key in inserted) {
              if (obj[key] === undefined) {
                obj[key] = inserted[key];
              } else if (typeof obj[key] === 'object') {
                _.assign(inserted[key], obj[key]);
              }
            }
          }

          _.createEl = function(block) {
            return document.createElement(block);
          }

          _.q = function(selector, target) {
            target = target || document;
            return target.querySelector(selector);
          }

          if (typeof element === 'string') {
            _.$quiz = _.q(element);
          } else {
            _.$quiz = element;
          }

          if (typeof options.$form === 'string') {
            _.$form = _.q(options.$form);
          } else {
            _.$form = options.$form;
          }

          if (typeof options.$result === 'string') {
            _.$result = _.q(options.$result);
          } else {
            _.$result = options.$result;
          }

          _.options = options || {}

          _.defaults = {
            headerTag: 'div',
            bodyTag: 'div',
            footerTag: 'div',
            stepTitletag: 'span',
            fieldTag: 'label',
            fieldTitleTag: 'span',
            prevBtnTag: 'button',
            nextBtnTag: 'button',

            dotsTag: 'div',
            dotTag: 'div',

            progressBarTag: 'div',
            progressTextTag: 'span',

            stepsCounterNumTag: 'div',
            currentStepNumTag: 'span',
            totalStepNumTag: 'span',

            dots: false,
            counter: false,
            progress: true,
            prev: true,
            next: true,

            finalStepTitle: false,

            headerClass: 'quiz__header',
            bodyClass: 'quiz__body',
            footerClass: 'quiz__footer',
            stepTittleClass: 'quiz__step-title',

            prevBtnClass: 'quiz__prev',
            nextBtnClass: 'quiz__next',

            dotsClass: 'quiz__dots',
            dotClass: 'quiz__dot',

            progressClass: 'quiz__progress',
            progressTextClass: 'quiz__progress-text',
            progressBarText: 'quiz__progress-bar',

            stepsCounterNumClass: 'quiz__steps-counter',
            currentStepNumClass: 'quiz__current-steps-number',
            totalStepNumClass: 'quiz__total-steps-number',

            gropupInputsClass: 'quiz__group-inputs',
            groupInputsTitleClass: 'quiz__group-title',

            prevBtnText: 'Назад',
            nextBtnText: 'Следующий шаг',

            fieldClasses: {
              radio: 'quiz__radio',
              checkbox: 'quiz__checkbox',
              text: 'quiz__text',
              textarea: 'quiz__text',
              select: 'quiz__select'
            }
          }

          _.$dots = [];
          _.$steps = [];
          _.$filledSteps = []; // шаги, которые уже были заполненны (для движения назад)
          _.radioCount = 0;
          _.checkboxCount = 0;

          _.assign(_.defaults, _.options);

          _.stepsLength = options.steps.length + 1;
          _.currentStep = 0;

          _.inputHandler = _.input.bind(_);
          _.nextStepHandler = _.nextStep.bind(_);
          _.prevStepHandler = _.prevStep.bind(_);

          _.init();

          _.$prevStep = _.$steps[_.currentStep - 1];
          _.$currentStep = _.$steps[_.currentStep];
          _.$nextStep = _.$steps[_.currentStep + 1];


          _.$filledFieldsOnThisStep = [];
          _.$fieldsOnThisStep = null;
          _.result = [];

          _.printStep(_.currentStep);

          _.$quiz.resetQuiz = _.resetQuiz;

          // _.dispatchEvent(_.$quiz, 'init', _.setEventDetails());

          _.$quiz.ctx = _;

          return _.$quiz;
          // return _;
        }
      })();

      Quiz.prototype.init = function() {
        console.log(this);
        let _ = this,
          options = _.options,
          evt = 'input';

        // _.$form.parentElement.style.display = 'none';
        _.$form.parentElement.setAttribute('hidden', '');

        _.buildInsides();
        _.buildSteps();
        _.$steps.push(_.$form);

        if (options.prev) {
          _.$prev.classList.add('disabled');
          _.$prev.setAttribute('tabindex', '-1');
        }

        if (options.next) {
          _.$next.classList.add('disabled');
          _.$next.setAttribute('tabindex', '-1');
        } else {
          evt = 'change';
        }

        if (options.dots) {
          _.$dots[_.currentStep].classList.add('active');
        }

        _.$quiz.addEventListener(evt, _.inputHandler);
        // _.$next.addEventListener('click', _.nextStepHandler);
      };

      Quiz.prototype.dispatchEvent = function(element, eventName, argumentsObj) {
        if (typeof window.CustomEvent === "function") {
          argumentsObj = argumentsObj || {}
          let evt = new CustomEvent(eventName, argumentsObj);
          element.dispatchEvent(evt);
        }
      };

      Quiz.prototype.buildInsides = function() {
        let _ = this,
          options = _.options,
          setButtonType = function(tag, el) {
            if (tag === 'button') {
              el.setAttribute('type', 'button');
            }
          };

        _.$header = _.createEl(options.headerTag);
        _.$body = _.createEl(options.bodyTag);
        _.$footer = _.createEl(options.footerTag);
        _.$stepsTitle = _.createEl(options.stepTitletag);

        _.$header.className = options.headerClass;
        _.$body.className = options.bodyClass;
        _.$footer.className = options.footerClass;
        _.$stepsTitle.className = options.stepTittleClass;

        if (options.counter) {
          _.$stepsCounter = _.createEl(options.stepsCounterNumTag);
          _.$counterCurrentNum = _.createEl(options.currentStepNumTag);
          _.$counterTotalNum = _.createEl(options.totalStepNumTag);

          _.$stepsCounter.className = options.stepsCounterNumClass;
          _.$counterCurrentNum.className = options.currentStepNumClass;
          _.$counterTotalNum.className = options.totalStepNumClass;

          _.$counterCurrentNum.textContent = _.currentStep + 1;
          _.$counterTotalNum.textContent = _.stepsLength;

          _.$stepsCounter.innerHTML = '<span>Шаг</span> ';
          _.$stepsCounter.appendChild(_.$counterCurrentNum);
          _.$stepsCounter.insertAdjacentHTML('beforeend', ' <span>из</span> ');
          _.$stepsCounter.appendChild(_.$counterTotalNum);

        }

        if (options.dots) {
          _.$dotsBlock = _.createEl(options.dotsTag);

          _.$dotsBlock.className = options.dotsClass;

          for (let i = 0; i < _.stepsLength; i++) {
            let dot = _.createEl(options.dotTag);
            dot.className = options.dotClass;
            setButtonType(options.dotTag, dot);
            _.$dots[i] = dot;
            _.$dotsBlock.appendChild(dot);
          }
        }

        if (options.prev) {
          _.$prev = _.createEl(options.prevBtnTag);
          _.$prev.className = options.prevBtnClass;
          setButtonType(options.prevBtnTag, _.$prev);
          _.$prev.textContent = options.prevBtnText;
          _.$footer.appendChild(_.$prev);
        }

        if (options.next) {
          _.$next = _.createEl(options.nextBtnTag);
          _.$next.className = options.nextBtnClass;
          setButtonType(options.nextBtnTag, _.$next);
          _.$next.textContent = options.nextBtnText;
          _.$footer.appendChild(_.$next);
        }

        if (options.progress) {
          _.$progressBar = _.createEl(options.progressBarTag);
          _.$progressWrap = _.createEl('div');
          _.$progressText = _.createEl(options.progressTextTag);
          if (options.progressBarTag === 'div') {
            _.$progressBar.setAttribute('role', 'progressbar');
            _.$progressBar.setAttribute('aria-valuemin', '0');
            _.$progressBar.setAttribute('aria-valuenow', '0');
            _.$progressBar.setAttribute('aria-valuemax', '100');
          }
          _.$progressText.textContent = '0%';

          _.$progressWrap.className = options.progressClass;
          _.$progressBar.className = options.progressBarText;
          _.$progressText.className = options.progressTextClass;

          _.$progressWrap.appendChild(_.$progressText);
          _.$progressWrap.appendChild(_.$progressBar);

          _.$footer.appendChild(_.$progressWrap)
        }

        if (options.counter) {
          _.$header.appendChild(_.$stepsCounter);
        }

        if (options.dots) {
          _.$header.appendChild(_.$dotsBlock);
        }

        _.$header.appendChild(_.$stepsTitle);

        _.$quiz.insertAdjacentElement('afterbegin', _.$header);
        _.$quiz.appendChild(_.$body);
        _.$quiz.appendChild(_.$footer);

      };

      Quiz.prototype.setEventDetails = function() {
        let _ = this;

        return {
          'detail': {
            prevStep: _.currentStep - 1,
            currentStep: _.currentStep,
            nextStep: _.currentStep + 1,
            stepsLength: _.stepsLength,
            currentStepObject: _.$currentStep,
            quizObject: _
          }
        }
      };

      Quiz.prototype.buildSteps = function() {
        let _ = this,
          options = _.options,
          steps = options.steps;
        /*
          Перебираем все шаги и формируем удобный объект с щагами
          Будет содержать заголовок шага
          И уже готовые элементы для вставки
        */
        for (let step in steps) {
          let curStep = steps[step], // берем текущий шаг в переменную (для сокр. записи)
            fields = curStep['fields'], // поля шага
            options = curStep.options, // переданные доп. опции (для действий на переключении шагов, например, менять картинки)
            extrafields = curStep['extrafields'], // дополнительные поля
            stepObject = {}; // объект одного шага, который будем вставлять в массив шагов

          // Если есть голые поля, т.е. без ветвления ответов
          if (fields) {
            let stepTitle = curStep['step-title'], // текст заголовка шага
              parsedFields = _.parseFields(fields); // разбираем поля, создаем html объекты

            // Если есть дополнительные поля, то разбираем их
            if (extrafields) {
              extrafields = _.parseExtraFields(extrafields);
            }

            stepObject['step-title'] = stepTitle; // текст для заголовка шага
            stepObject.fields = parsedFields.fieldsArray; // массив разобранных полей
            stepObject.extrafields = extrafields; // вставляем дополнительные поля (могут быть undefined)
            stepObject.html = parsedFields.html; // элементы для вставки на страницу
            stepObject.options = options; // доп. опции, переданные в json, для использования на событиях nextstep, prevstep

            // Если поля есть ветвление ответов
          } else {
            /*
              Разбираем ветвления ответов
              значение овета: [поле, поле, поле]
            */
            for (let key in curStep) {
              let parsedFields = _.parseFields(curStep[key].fields),
                extrafields = curStep[key].extrafields,
                stepTitle = curStep[key]['step-title'],
                options = curStep[key].options;

              // Если есть дополнительные поля, то разбираем и их
              if (extrafields) {
                extrafields = _.parseExtraFields(extrafields);
              }

              stepObject[key] = {
                options: options,
                'step-title': stepTitle,
                fields: parsedFields.fieldsArray,
                extrafields: extrafields,
                html: parsedFields.html
              }

            }
          }

          _.$steps.push(stepObject); // вставляем сформированный объект шага в массив

        }
      };

      Quiz.prototype.parseFields = function(fields, isExtraFields) {
        let _ = this,
          options = _.options,
          obj = {
            fieldsArray: [],
            html: []
          },
          fieldsType;

        // Если мы создаем доп. поле, то добавим ему соотв. дата-атрибут
        // Всем title зададим соотв. дата-атрибут, чтобы было потом легко найти их через q

        for (let field in fields) {
          let curField = fields[field],
            fieldType = curField.type,
            groupTitle = curField['group-title'],
            fieldTitle = curField.title,
            required = curField.required,
            values = curField.values,
            placeholder = curField.placeholder,
            focusOn = curField.focusOn,
            fieldTag = fieldType === 'textarea' ? 'textarea' : 'input',
            fieldClass = options.fieldClasses[fieldType],
            initialSelected = curField.initialSelected;

          fieldsType = fieldType;

          // Разбираем обычное поле с текстом или числом
          if (fieldType === 'text' || fieldType === 'number' || fieldType === 'textarea') {
            let $field = _.createEl(options.fieldTag),
              $title = _.createEl(options.fieldTitleTag),
              $input = _.createEl(fieldTag),
              inputClassPostfix = fieldType === 'textarea' ? '-textarea' : '-inp',
              fieldObject = {};

            if (isExtraFields) {
              $field.setAttribute('data-extra-field', '')
            }

            $input.type = fieldType;

            if (placeholder) {
              $input.placeholder = placeholder;
            }

            if (focusOn) {
              $input.dataset.focus = 1;
            }

            $title.textContent = fieldTitle;
            $title.setAttribute('data-field-title', '');

            $field.className = fieldClass;
            $input.className = fieldClass + inputClassPostfix + (required ? ' required' : '');
            $title.className = fieldClass + '-title';

            $field.appendChild($title);
            $field.appendChild($input);

            fieldObject.input = $input;
            fieldObject.field = $field;
            fieldObject.title = $title;

            obj.fieldsArray.push(fieldObject);
            obj.html.push($field);

          } else if (values && values.length > 0) {
            // Если есть group-title, то помещаем в общий блок
            let $groupBlock,
              $groupTitle,
              $selectBlock,
              $selectLabel,
              $selectBlockTitle;

            if (groupTitle || groupTitle === '') {
              $groupBlock = _.createEl('div');

              if (groupTitle) {
                $groupTitle = _.createEl('span');
                $groupTitle.className = options.groupInputsTitleClass;
                $groupTitle.textContent = groupTitle;
                $groupTitle.setAttribute('data-field-title', ''); // присваиваем тайтлу атрибут для облегчения его поиска
                $groupBlock.appendChild($groupTitle);
              }

              $groupBlock.className = options.gropupInputsClass;
            }

            if (fieldType === 'select') {
              $selectLabel = _.createEl(options.fieldTag); // создаем блок-обертку
              $selectBlock = _.createEl('select'); // создаем сам селект

              // Если есть заголовок полей, то создадим его
              if (fieldTitle) {
                $selectBlockTitle = _.createEl(options.fieldTitleTag); // создаем татйл
                $selectBlockTitle.className = fieldClass + '-title'; // присваиваем тайтлу класс
                $selectBlockTitle.textContent = fieldTitle; // присваиваем тайтлу текст
                $selectBlockTitle.setAttribute('data-field-title', ''); // присваиваем тайтлу атрибут для облегчения его поиска
                $selectLabel.appendChild($selectBlockTitle); // вставляем тайтл в блок-обертку
              }

              $selectLabel.appendChild($selectBlock); // вставляем селект в блок-обертку
              $selectLabel.className = fieldClass; // присваиваем блоку-обертке класс
              $selectBlock.className = fieldClass + '-inp' + (required ? ' required' : ''); // класс для селекта

              if (initialSelected) {
                $selectBlock.dataset.initialSelected = initialSelected;
              }
            }

            /*
              Перебираем все значения и для select создаем options,
              а для radio и checkbox создаем input с классами, значениями и др. атрибутами
            */
            for (let i = 0, len = values.length; i < len; i++) {
              let $field,
                $title,
                $input,
                // $pseudoInp,
                fiteldsNameAttr,
                fieldObject = {};

              /*

                СОКРАТИТЬ РАЗБОР АТРИБУТОВ У SELECT И RADIO/CHECKBOX

              */ 

              if (fieldType === 'select') {
                $input = _.createEl('option');
                // Если передали строку, то вставляем ее как обычно
                if (typeof values[i] === 'string') {
                  $input.value = $input.textContent = values[i];
                  // Если не строка, то разбираем объект с текстом и атрибутами
                } else {
                  let customAttributes = values[i]['attr'],
                    fieldIsNotDisabled = true;

                  if (customAttributes) {
                    for (let i = 0, len = customAttributes.length; i < len; i++) {
                      for (let attrName in customAttributes[i]) {
                        let attrValue = customAttributes[i][attrName];
                        $input.setAttribute(attrName, attrValue);
                        if (attrName === 'disabled') {
                          fieldIsNotDisabled = false;
                        }
                      }
                    }
                  }

                  if (fieldIsNotDisabled) {
                    $input.value = $input.textContent = values[i]['text'];
                  } else {
                    $input.textContent = values[i]['text'];
                  }
                }
                $field = $selectBlock;
              } else {
                $field = _.createEl(options.fieldTag);
                $title = _.createEl(options.fieldTitleTag);
                $input = _.createEl(fieldTag);
                // $pseudoInp = _.createEl('span');

                // Создаем атрибут name (radio-0, radio-1 и т.д.)
                if (fieldType === 'radio') {
                  fiteldsNameAttr = 'radio-' + _.radioCount;
                } else {
                  fiteldsNameAttr = 'checkbox-' + _.checkboxCount;
                }

                if (typeof values[i] === 'string') {
                  $input.value = $title.textContent = values[i];
                } else {
                  let customAttributes = values[i]['attr'];
                  $input.value = $title.textContent = values[i]['text'];

                  if (customAttributes) {
                    for (let i = 0, len = customAttributes.length; i < len; i++) {
                      for (let attrName in customAttributes[i]) {
                        let attrValue = customAttributes[i][attrName];
                        $input.setAttribute(attrName, attrValue);
                        if (attrName === 'disabled') {
                          fieldIsNotDisabled = false;
                        }
                      }
                    }
                  }
                }

                $input.name = fiteldsNameAttr;
                $input.type = fieldType;
                // $pseudoInp.className = fieldClass + '-pseudo-inp';
                $field.className = fieldClass;
                $input.className = fieldClass + '-inp' + (required ? ' required' : '');
                if (required) {
                  $input.setAttribute('required', '');
                }
                // $input.dataset.required = required ? 1 : 0;
              }

              if ($title) {
                $title.className = fieldClass + '-title';
                fieldObject.title = $title;
              }

              fieldObject.input = $input;
              fieldObject.field = $field;

              $field.appendChild($input);

              // if ($pseudoInp) {
              // $field.appendChild($pseudoInp);
              // }

              if ($title) {
                $field.appendChild($title);
              }

              if ($groupBlock && fieldType !== 'select') {
                $groupBlock.appendChild($field);
              }

              obj.fieldsArray.push(fieldObject);
            } // endfor values

            if ($groupBlock) {
              if ($selectLabel) {
                $groupBlock.appendChild($selectLabel);
              }
              obj.html.push($groupBlock);
              // obj.html = $groupBlock;
              // _.$body.appendChild($groupBlock);
            } else if ($selectLabel) {
              obj.html.push($selectLabel);
              // obj.html = $selectLabel;
              // _.$body.appendChild($selectLabel);
            }
          }

        } // endfor fields

        if (fieldsType === 'radio') {
          _.radioCount++;
        }

        if (fieldsType === 'checkbox') {
          _.checkboxCount++;
        }

        return obj;
      };

      Quiz.prototype.parseExtraFields = function(extrafields) {
        let _ = this,
          extrafieldsObject = {};

        for (let value in extrafields) {
          let extrafield = extrafields[value],
            parsedExtrafields = _.parseFields(extrafield, true);

          extrafieldsObject[value] = parsedExtrafields;
        }

        return extrafieldsObject;
      };

      Quiz.prototype.clearPrevStep = function() {
        let _ = this,
          quizBody = _.$body,
          prevStep = _.$prevStep;
        formParent = _.$form.parentElement;

        if (prevStep) {
          // Если предыдущий шаг это форма заявки
          if (prevStep === _.$form) {
            formParent.setAttribute('hidden', '');
            // _.$quiz.replaceChild(quizBody, formParent);
            // _.$body.removeChild(_.$form); // Удалим форму из боди
            _.$result.value = ''; // Чистим ответы
          } else {
            let prevHtml = prevStep.html, // Массив полей предыдущего шага
              prevExtrafields = prevStep.extrafields; // Доп. поля предыдушего шага

            if (prevHtml) {
              for (let i = 0, len = prevHtml.length; i < len; i++) {
                quizBody.removeChild(prevHtml[i]); // Удаляем со страницы поля предыдущего шага
              }
            }

            if (prevExtrafields) {
              for (let key in prevExtrafields) {
                let prevExtrafieldsHtml = prevExtrafields[key].html; // Массив html доп. полей предыдущего шага
                for (let i = 0, len = prevExtrafieldsHtml.length; i < len; i++) {
                  if (quizBody.contains(prevExtrafieldsHtml[i])) {
                    quizBody.removeChild(prevExtrafieldsHtml[i]);
                  }
                }
              }
            }
          }
        }

      };

      Quiz.prototype.printStep = function(num, dir) {
        dir = dir || 'next';
        let _ = this,
          options = _.options,
          quizBody = _.$body,
          prevStep = _.$prevStep,
          currentHtml = _.$currentStep['html'], // html если нет ветвления ответов или шаг 1
          prevStepObject = prevStep && prevStep.value,
          prevStepValue; // Будем искать значение предыдущего шага для ветвления ответов

        formParent = _.$form.parentElement;

        // Если финальный шаг
        if (_.$currentStep === _.$form) {
          formParent.removeAttribute('hidden');
          quizBody.setAttribute('hidden', '');
          // formParent.style.display = 'block';
          // quizBody.style.display = 'none';
          // _.$quiz.replaceChild(formParent, quizBody);
          _.$quiz.classList.add('final-step');

          if (options.finalStepTitle) {
            _.$stepsTitle.textContent = options.finalStepTitle
          }

          // Заполняем поле с результатом
          for (let i = 0, len = _.result.length; i < len; i++) {
            let item = _.result[i];

            for (let key in item) {
              let value = item[key].join(', ');
              _.$result.value += key + ': ' + value + '\n';
            }

          }
          // Убираем поля предыдущего шага, если они есть
          _.clearPrevStep();
          _.setProgress(100, dir);
          return;
        } else {
          if (_.currentStep === 0) {
            _.setProgress(0, dir);
          } else {
            let percent = Math.ceil((_.currentStep + 1) / _.stepsLength * 100);
            _.setProgress(percent, dir);
          }
        }

        // Если нет готового html для вставки, значит есть ветвление
        if (!currentHtml) {
          if (prevStepObject) {
            // Перебираем ответы, которые были даны в предыдущем шаге
            for (let key in prevStepObject) {
              let values = prevStepObject[key], // Массив ответов предыдущего шага
                doBreak = false; // Для прерывания цикла в дочерних циклах

              // Если в массиве всего 1 значение, то преобразуем его в строку
              if (values.length === 1) {
                values = '' + values;
                // console.log(values, 'один в массиве, ищу');
                // Пробуем найти внутри вариантов текущего шага
                if (_.$currentStep[values]) {
                  prevStepValue = values; // Подставляем значение
                  // console.log('есть совпадение с ', values);
                  // console.log('Общий цикл прерван на ', values);
                  break; // Прерываем цикл

                  // Если значение не найдено, то ищем его в каждом варианте текущего шага
                } else {
                  // console.log('нет совпадения с', values);
                  for (let currentStepValue in _.$currentStep) {
                    // console.log('ищу', values, 'в', currentStepValue);
                    if (currentStepValue.indexOf(values) !== -1) {
                      prevStepValue = currentStepValue;
                      doBreak = true;
                      // console.log('есть совпадение', values, 'в', currentStepValue);
                      break;
                    }
                  }
                }
                // Если в массиве несколько значений, то нужно перебирать их
              } else {
                 // console.log(values, 'не один в массиве, перебираю');
                for (let i = 0, len = values.length; i < len; i++) {
                  for (let currentStepValue in _.$currentStep) {
                     // console.log('ищу', values[i], 'в', currentStepValue);
                    if (currentStepValue.indexOf(values[i]) !== -1) {
                      prevStepValue = currentStepValue;
                      doBreak = true;
                      // console.log('есть совпадение', values[i], 'в', currentStepValue);
                      break;
                    }
                  }
                  if (doBreak) {
                    // console.log('Цикл прерван на', values[i]);
                    break;
                  }
                }
              }

              if (doBreak) {
                // console.log('Общий цикл прерван на ', values);
                break;
              }

            }

          } // endif prevStepObject

          if (prevStepValue) {
            _.$currentStep = _.$currentStep[prevStepValue]; // Подставляем значение в текущий шаг
            currentHtml = _.$currentStep['html']; // Подставляем значение html
          }

        } // endelse

        // Если ничего нет вообще, то надо делать следующий шаг
        if (!currentHtml) {
          if (dir === 'prev') {
            _.prevStepHandler();
          } else {
            _.nextStep(false);
            _.currentStep--;
          }
          return;
        }

        if (_.$prevStep === _.$form) {
          formParent.setAttribute('hidden', '');
          // formParent.style.display = 'none';
        } else {
          // Убираем поля предыдущего шага, если они есть
          _.clearPrevStep();
        }
        
        // Вставляем html на страницу
        for (let key in currentHtml) {
          let block = currentHtml[key];
          quizBody.appendChild(block);
        }

        _.$stepsTitle.textContent = _.$currentStep['step-title']; // устанавливаем заголовок для шага

        _.$fieldsOnThisStep = qa('select, input, textarea', quizBody, true); // Собираем все поля с шага

        // Приводим все поля в изначальное состояние
        for (var i = _.$fieldsOnThisStep.length - 1; i >= 0; i--) {
          let $field = _.$fieldsOnThisStep[i],
            fieldType = $field.type;

          if ($field.checked) {
            $field.checked = false; // снимаем выделение
          }

          if (fieldType === 'text' || fieldType === 'textarea' || fieldType === 'number') {
            $field.value = ''; // Чистим поля ввода
          }

          if ($field.tagName === 'SELECT') {
            if ($field.dataset.initialSelected) {
              $field.selectedIndex = $field.dataset.initialSelected;
            } else {
              $field.selectedIndex = 0; // Устанавливаем селект в изначальное положение 0
            }
          }
        } // end for

      };

      Quiz.prototype.input = function(evt) {
        let _ = this,
          options = _.options,
          target = evt.target,
          extrafields = _.$currentStep.extrafields, // доп. поля на текущем шаге

          $radioButtons = [],
          $checkboxes = [],
          $select = [],
          $requiredFields = [], // список обязательных полей
          $emptyRequiredFields = [], // пустые обязательные к заполнению поля (val === '')
          $filledRequiredFields = [], // не пустые обязательные к заполнению поля (val !== '')
          $filledFields = [], // все не пустые поля (val !== '')

          radioGroupIsRequired = false, // группа радиокнопок является обязательной
          radioGroupIsChecked = true, // выбрана хотя бы одна радиокнопка
          checkboxesGroupIsRequired = false, // группа чекбоксов является обязательной
          checkboxesGroupIsChecked = true; // выбран хотя бы один чекбокс
        /*
          Будем перебирать все поля в текущем шаге
          И искать обязательные, заполненные, чекнутые и т.д.
          Потом проверять, чтобы кол-во обязательных === кол-во заполненных
          И хотя бы одна радиокнопка и хотя бы один чекбокс выбран
          И тогда разблокировать кнопку далее, иначе блокировать
        */
        for (let i = _.$fieldsOnThisStep.length - 1; i >= 0; i--) {
          // Переменные для сокращения записи
          let $field = _.$fieldsOnThisStep[i],
            type = $field.type,
            value = $field.value,
            tagName = $field.tagName,
            checked = $field.checked;

          if (type === 'radio') {
            $radioButtons[$radioButtons.length] = $field;
            /*
              Если есть доп. поля и есть доп. поле у текущего значения
              Перебираем эти поля и если радиокнопка выбрана
              Вставялем доп. поле и обновляем массив существующих полей в шаге
              Иначе, удаляем
            */
            if (extrafields && extrafields[value]) {
              extrafields[value].html.forEach(function($field) {
                let bodyContainsField = _.$body.contains($field), // переменная для сокр. записи
                  $fieldInput = q('input', $field); // ищем инпут внутри доп поля, для добавления в массив полей

                if (checked) {
                  if (!bodyContainsField) {
                    $fieldInput.value = ''; // Очищаем поле
                    _.$body.appendChild($field); // Добавляем доп. поле на страницу
                    _.$fieldsOnThisStep.push($fieldInput); // Добавляем в массив текущего шага
                    if ($fieldInput.dataset.focus) {
                      $fieldInput.focus(); // Устанавливаем фокус на этом поле
                    }
                    // Если доп. поле обязательное, то добавляем его в массив обязательных полей
                    if ($fieldInput.classList.contains('required')) {
                      $requiredFields.push($fieldInput);
                    }
                  }
                } else {
                  if (bodyContainsField) {
                    $fieldInput.value = ''; // Очищаем поле
                    _.$body.removeChild($field); // Удаляем доп. поле со страницы

                    // Ищем номер поля в массивах, для его удаления оттуда
                    let indxInFieldsOnThisStep = _.$fieldsOnThisStep.indexOf($fieldInput),
                      indxInRequiredFields = $requiredFields.indexOf($fieldInput),
                      indxInFilledFields = $filledRequiredFields.indexOf($fieldInput);


                    // Удаляем доп. поле из массива текущего шага
                    if (indxInFieldsOnThisStep !== -1) {
                      _.$fieldsOnThisStep.splice(indxInFieldsOnThisStep, 1);
                    }
                    // Удаляем доп. поле из массива обязательных полей
                    if (indxInRequiredFields !== -1) {
                      $requiredFields.splice(indxInRequiredFields, 1);
                    }
                    // Удаляем доп. поле из массива заполненных полей
                    if (indxInFilledFields !== -1) {
                      $filledRequiredFields.splice(indxInFilledFields, 1);
                    }
                  }
                }
              }); // endforeach
            }
          } else if (type === 'checkbox') {
            $checkboxes[$checkboxes.length] = $field;
          } else if (tagName === 'select') {
            $select[$select.length] = $field;
          }

          if ($field.classList.contains('required')) {
            $requiredFields[$requiredFields.length] = $field;
            if (value === '') {
              $emptyRequiredFields[$emptyRequiredFields.length] = $field;
            } else {
              $filledRequiredFields[$filledRequiredFields.length] = $field;
            }
          }

          if (value !== '') {
            // Убираем не выбранные радиокнопки и чекбоксы из массива заполненных полей
            if ((type === 'radio' || type === 'checkbox') && !checked) {
              continue;
            }
            $filledFields[$filledFields.length] = $field;
          }

        } //endfor

        // если есть радиокнопки, то проверяем выбрана хотя бы одна или нет
        if ($radioButtons.length > 0) {
          radioGroupIsRequired = $radioButtons.some($field => $field.required);
          if (radioGroupIsRequired) {
            radioGroupIsChecked = $radioButtons.some($field => $field.checked);
          }
        }

        // если есть чекбоксы, то проверяем выбран хотя бы один или нет
        if ($checkboxes.length > 0) {
          checkboxesGroupIsRequired = $checkboxes.some($field => $field.required);
          if (checkboxesGroupIsRequired) {
            checkboxesGroupIsChecked = $checkboxes.some($field => $field.checked);
          }
        }


        // console.log('radio', $radioButtons);
        // console.log('checkboxes', $checkboxes);
        // console.log('select', $select);
        // console.log('required', $requiredFields);
        // console.log('empty', $emptyRequiredFields);
        // console.log('filled', $filledRequiredFields);
        // console.log('fieldsOnThisStep', _.$fieldsOnThisStep);

        // console.log('radio group checked is', radioGroupIsChecked);
        // console.log('checkboxes group checked is', checkboxesGroupIsChecked);

        // Если все обязательные поля заполнены
        // и хотя бы одна радиокнопка выбрана
        // и хотя бы один чекбокс выбран
        // то разрешаем идти дальше (делаем кнопку активной)
        if (($requiredFields.length === $filledRequiredFields.length || $requiredFields.length === 0) &&
          radioGroupIsChecked && checkboxesGroupIsChecked) {

          // Глобальная переменная с заполненными полями на этом шаге
          _.$filledFieldsOnThisStep = $filledFields;

          // Если стрелка "вперед" разрешена, то
          if (options.next) {
            if ($requiredFields.length === $filledRequiredFields.length &&
              radioGroupIsChecked && checkboxesGroupIsChecked) {
              _.$next.classList.remove('disabled');
              _.$next.addEventListener('click', _.nextStepHandler);
              _.$next.setAttribute('tabindex', '0');
            }
          } else {
            if (options.next) {
              // иначе, делаем кнопку не активной
              _.$next.classList.add('disabled');
              _.$next.removeEventListener('click', _.nextStepHandler);
              _.$next.setAttribute('tabindex', '-1');
            } else {
              _.nextStepHandler();
            }
          }
        } else {
          // Если стрелка "вперед" разрешена, то делаем ее неактивной
          if (options.next) {
            _.$next.classList.add('disabled');
            _.$next.removeEventListener('click', _.nextStepHandler);
            _.$next.setAttribute('tabindex', '-1');
          }
        }

      };

      /*
        При нажатии на кнопку next (срабатывании функции nextStep)
        Будем перебирать все заполненные поля из массива _.$filledFieldsOnThisStep
        Будем искать в их родителе тайтл для полей (data-field-title)
        И сформируем объект ответов:
          obj = {
            key: [value, value, value, ...]
          }
      */
      Quiz.prototype.nextStep = function(event) {
        // Если не передан event, то пропуск шага
        let _ = this,
          options = _.options,
          object = {}, // ключи-значения инпутов (title: [values])
          $filledFields = _.$filledFieldsOnThisStep;

        // Если нажали на кнопку (не автошаг, не пропкуск шага)
        if (event) {
          // Собираем в массив значения всех заполненных полей
          for (let i = 0, len = $filledFields.length; i < len; i++) {
            let $field = $filledFields[i], // текущее поля (для сокр. записи)
              fieldType = $field.type, // тип поля (для сокр. записи)
              $fieldParent = fieldType === 'radio' || fieldType === 'checkbox' ? $field.parentElement.parentElement : $field.parentElement, // родитель полей для поиска тайтла
              fieldTtile = (q('[data-field-title]', $fieldParent) || _.$stepsTitle).textContent; // текст-заголовок полей

            // Если заголовка у группы полей нет, то берется название шага!


            // Если ключа нет, то создаем его
            if (object[fieldTtile] === undefined) {
              object[fieldTtile] = [];
            }

            object[fieldTtile].push($field.value); // Добавляем значение в массив
          }

          _.result[_.result.length] = object; // вставляем пару ключ-значения в результат

          _.$prevStep = _.$currentStep; // Устанавливаем предыдущим шагом текущий

          _.$prevStep.value = object; // Вставляем в него объект собранных значений
        }

        _.currentStep++; // Увеличиваем индекс (делаем шаг вперед)

        _.$currentStep = _.$steps[_.currentStep]; // Делаем текущим шагом текущий шаг по индексу
        _.$nextStep = _.$steps[_.currentStep + 1]; // Делаем следующим шагом ща по индексу + 1


        _.printStep(_.currentStep); // Выводим поля

        // Если передан эвент, то есть если нажалли на кнопку
        if (event) {
          _.dispatchEvent(_.$quiz, 'nextstep', _.setEventDetails());

          // Делаем активной кнопку назад
          if (options.prev) {
            if (_.currentStep > 0) {
              _.$prev.classList.remove('disabled');
              _.$prev.addEventListener('click', _.prevStepHandler);
              _.$prev.setAttribute('tabindex', '0');
            }
          }

          // Делаем не активной кнопку дальше
          if (options.next) {
            _.$next.classList.add('disabled');
            _.$next.removeEventListener('click', _.nextStepHandler);
            _.$next.setAttribute('tabindex', '-1');
          }

          // Меняем активность точек-счетчиков
          if (options.dots) {
            _.$dots[_.currentStep - 1].classList.remove('active');
            _.$dots[_.currentStep].classList.add('active');
          }

          // Увеличиваем значение цифры счетчика
          if (options.counter) {
            _.$counterCurrentNum.textContent = _.currentStep + 1;
          }

          // Ищем самый первый элемент квиза и устанавливаем на нем фокус
          if (_.$currentStep.fields) {
            _.$currentStep.fields[0].input.focus();
          }

          // Добавляем пройденный шаг в массив пройденных шагов
          // для контроля шагов назад
          _.$filledSteps.push(_.$prevStep);
        }

      };

      Quiz.prototype.prevStep = function(event) {
        let _ = this,
          options = _.options;

        _.$prevStep = _.$currentStep; // Устанавливаем предыдущим шагом текущий

        _.currentStep--; // Уменьшаем индекс текущего шага (делаем шаг назад)

        _.$currentStep = _.$filledSteps[_.currentStep]; // Уст. текущим шагом предыдущий пройденный шаг

        _.$nextStep = _.$filledSteps[_.currentStep - 1]; // Уст. следующим шагом еще более ранний пройденный шаг

        // Убираем последнюю пару ключ-значение из результата
        _.result.pop();


        _.printStep(_.currentStep, 'prev'); // Выводим на экран необходимые шаги

        // Делаем активной или не активной кнопку назад
        if (options.prev) {
          _.$prev.classList.toggle('disabled', _.currentStep === 0);
          if (_.currentStep === 0) {
            _.$prev.removeEventListener('click', _.prevStepHandler);
            _.$prev.setAttribute('tabindex', '-1');
          }
        }

        // Делаем не активной кнопку дальше
        if (options.next) {
          _.$next.classList.add('disabled');
          _.$next.removeEventListener('click', _.nextStepHandler);
        }

        // Меняем активность точек-счетчиков
        if (options.dots) {
          _.$dots[_.currentStep].classList.add('active');
          _.$dots[_.currentStep + 1].classList.remove('active');
        }

        // Уменьшаем значение цифры счетчика
        if (options.counter) {
          _.$counterCurrentNum.textContent = _.currentStep + 1;
        }

        _.$quiz.classList.remove('final-step');

        // Убираем последний пройденный шаг из массива пройденных шагов
        _.$filledSteps.pop();
        // console.log('pop');

        _.$body.removeAttribute('hidden');
        _.dispatchEvent(_.$quiz, 'prevstep', _.setEventDetails());

      };

      Quiz.prototype.resetQuiz = function() {
        let _ = this.ctx || this;

        _.$prevStep = _.$currentStep;

        _.currentStep = 0;

        _.$currentStep = _.$steps[_.currentStep];
        _.$nextStep = _.$steps[_.currentStep + 1];

        _.printStep(_.currentStep);

        _.$filledSteps = [];
        _.$filledFieldsOnThisStep = [];
        _.$fieldsOnThisStep = qa('input, select, textarea', _.$body, true);
        _.result = [];

        _.$body.removeAttribute('hidden');
        _.$form.parentElement.setAttribute('hidden', '');
        _.$quiz.classList.remove('final-step');

      };

      Quiz.prototype.setProgress = function(percent, direction) {
        let _ = this,
          currentPercent = +_.$progressText.textContent.slice(0, -1),
          number = currentPercent,
          timer = setInterval(function() {

            if (direction === 'prev') {
              _.$progressText.textContent = --number + '%';
              if (number <= percent) {
                clearInterval(timer);
                _.$progressText.textContent = percent + '%';
              }
            } else {
              _.$progressText.textContent = ++number + '%';
              if (number >= percent) {
                clearInterval(timer);
                _.$progressText.textContent = percent + '%';
              }
            }

          }, 10);

        _.$progressBar.style.backgroundSize = percent + '%, 100%';
      };

      return Quiz;
    })();

    let xhr = new XMLHttpRequest();

    xhr.open('post', templateDir + '/quiz.json');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();

    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let response = JSON.parse(xhr.response);

        let quiz = new Quiz($quizBlock, {
          steps: response,
          finalStepTitle: 'Для получения расчета оставьте свои контактные данные',
          nextBtnClass: 'quiz__next btn btn_green btn_text-black',
          $form: $quizForm,
          $result: $quizResult
        }),
        loadTooltip = function() {
          let elementsWithTooltip = qa('[data-tooltip]', quiz);

          for (var i = elementsWithTooltip.length - 1; i >= 0; i--) {
            let tooltipIcon = document.createElement('span'),
              tooltipText = tooltipIcon.cloneNode(),
              parent = elementsWithTooltip[i].parentElement;

            tooltipIcon.textContent = 'i';
            tooltipIcon.className = 'tooltip-icon';

            tooltipText.textContent = elementsWithTooltip[i].dataset.tooltip;
            tooltipText.className = 'tooltip-text';

            parent.appendChild(tooltipIcon);
            parent.appendChild(tooltipText);
          }

        };

        loadTooltip();
        quiz.addEventListener('prevstep', loadTooltip);
        quiz.addEventListener('nextstep', loadTooltip);

      }
    });
  }

})();
;
(function() {
  let $filterForm = id('filter-form'),
    $housesCards = id('houses-cards'),
    $loadmoreBtn = id('loadmore-btn');

  if ($filterForm) {
    let housesOnPage = qa('.house', $housesCards),
      totalHouses = 0,
      numberposts = $filterForm.dataset.numberposts,
      postType = $filterForm.dataset.postType,
      filterTimer,
      loadHouses = function(event) {
        let eventType = event.type;

        if (eventType === 'change') {
          if (matchesMedia('(max-width:1023.98px)')) {
            return;
          }
          clearTimeout(filterTimer);

          filterTimer = setTimeout(function() {
            loadHouses(event.type = '');
          }, 1000);

          return;

        } else if (eventType === 'submit') {
          event.preventDefault();
        } else if (eventType === 'reset') {
          setTimeout(function() {
            loadHouses(event.type = '');
          });

          return;
        }

        let xhr = new XMLHttpRequest(),
          data = new FormData($filterForm);

        $housesCards.classList.add('loading');
        $filterForm.classList.add('loading');

        data.append('action', 'print_houses');
        data.append('numberposts', numberposts);
        data.append('post_type', postType);

        if (eventType === 'click') { // loadmore
          data.append('offset', housesOnPage.length);
        } else {
          $filterFormPopup.closePopup();
        }

        xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {

            $housesCards.classList.remove('loading');
            $filterForm.classList.remove('loading');

            let houses = xhr.response;

            if (eventType === 'click') {
              if ($housesCards.contains($loadmoreBtn)) {
                $housesCards.removeChild($loadmoreBtn);
              }
              $housesCards.insertAdjacentHTML('beforeend', houses);
            } else {
              $housesCards.innerHTML = houses;
            }

            $loadmoreBtn = id('loadmore-btn');

            housesOnPage = qa('.house', $housesCards);

            if ($loadmoreBtn) {
              $loadmoreBtn.dataset.housesOnPage = housesOnPage.length;
              totalHouses = $loadmoreBtn.dataset.totalHousesCount;

              if (housesOnPage.length < totalHouses) {
                $loadmoreBtn.removeAttribute('hidden');
              } else {
                $loadmoreBtn.setAttribute('hidden', '');
              }
            }
          }
        });
      };

    $filterFormPopup = new Popup('#filter-form', {
      openButtons: '#filter-form-call-btn',
      closeButtons: '.filter-form__close',
      clickToClose: false
    });

    $filterForm.addEventListener('submit', loadHouses);


    $housesCards.addEventListener('click', function(e) {
      let target = e.target;

      if (target.id === 'loadmore-btn') {
        loadHouses(e);
      }
    });

    $filterForm.addEventListener('click', function() {
      let target = event.target,
        targetParent = target.parentElement,
        height = 0;

      if (target.tagName === 'LEGEND' && targetParent.classList.contains('dropdown')) {
        if (targetParent.classList.contains('active')) {
          height = targetParent.dataset.height;
        } else {
          if (!targetParent.dataset.height) {
            targetParent.dataset.height = targetParent.offsetHeight;
          }
          height = targetParent.scrollHeight;
        }
        targetParent.classList.toggle('active');
        targetParent.style.maxHeight = height + 'px';
      }
    });


    $filterForm.addEventListener('reset', loadHouses);
    $filterForm.addEventListener('change', loadHouses);

    let sticky = function($el, fixThresholdDir, className) {
      $el = typeof $el === 'string' ? q($el) : $el;
      className = className || 'fixed';
      fixThresholdDir = fixThresholdDir || 'bottom';

      let fixThreshold = $el.getBoundingClientRect()[fixThresholdDir] + pageYOffset,
        $elClone = $el.cloneNode(true),
        $elParent = $el.parentElement,
        fixElement = function() {
          if (!$el.classList.contains(className) && pageYOffset >= fixThreshold) {
            $elParent.appendChild($elParent.replaceChild($elClone, $el));
            $el.classList.add(className);

            window.removeEventListener('scroll', fixElement);
            window.addEventListener('scroll', unfixElement);
          }
        },
        unfixElement = function() {
          if ($el.classList.contains(className) && pageYOffset <= fixThreshold) {
            $elParent.replaceChild($el, $elClone);
            $el.classList.remove(className);

            window.removeEventListener('scroll', unfixElement);
            window.addEventListener('scroll', fixElement);
          }
        };

      $elClone.classList.add('clone');
      fixElement();
      window.addEventListener('scroll', fixElement);
    };

    if (matchesMedia('(min-width:1023.98px)')) {
      // sticky($filterForm, 'top');
    } else {
      sticky('#filter-form-call-btn');
    }
  }

})();
;
(function() {
  let $newsSect = id('news-sect'),
    $loadmoreBtn = id('loadmore-btn');

  if ($newsSect && $loadmoreBtn) {
    let totalCountPosts = $newsSect.dataset.postsCount,
      numberposts = $newsSect.dataset.numberposts,
      pageUri = $newsSect.dataset.pageUri,
      postsOnPage = qa('.post', $newsSect),
      loadPosts = function(event) {
        $loadmoreBtn.classList.add('loading');
        $loadmoreBtn.blur();

        let xhr = new XMLHttpRequest(),
          data = 'action=print_posts&numberposts=' + numberposts + '&offset=' + postsOnPage.length;

        xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let posts = xhr.response;
            
            $loadmoreBtn.classList.remove('loading');
            $loadmoreBtn.insertAdjacentHTML('beforebegin', posts);
            postsOnPage = qa('.post', $newsSect);

            $newsSect.style.maxHeight = $newsSect.scrollHeight + 'px';

            if (postsOnPage.length == totalCountPosts) {
              $loadmoreBtn.setAttribute('hidden', '');
            } else {
              $loadmoreBtn.focus();
            }

          }
        });
      };

    $newsSect.style.maxHeight = $newsSect.scrollHeight + 'px';
    $newsSect.removeAttribute('data-page-uri');

    $loadmoreBtn.addEventListener('click', loadPosts);

    console.log('totalCountPosts', totalCountPosts);
    console.log('numberposts', numberposts);
  }

})();
(function() {
  thanksPopup = new Popup('.thanks-popup', {
    closeButtons: '.thanks-popup__close'
  });

  thanksPopup.addEventListener('popupbeforeopen', function() {
    clearTimeout(thanksPopupTimer);
  });

// Закрытие всех попапов вместе с закрытием окна спасибо
  // thanksPopup.addEventListener('popupbeforeclose', function() {
  //   let otherPopups = [callbackPopup, orderPopup];

  //   for (let i = 0; i < otherPopups.length; i++) {
  //     if (otherPopups[i].classList.contains('active')) {
  //       otherPopups[i].closePopup();
  //     }
  //   }
  // });

  if (matchesMedia('(max-width:1023.98px)')) {
    zoomPopup = new Popup('.zoom-popup', {
      closeButtons: '.zoom-popup__close',
      openButtons: '.house-slider__img'
    });

    zoomPopup.addEventListener('popupbeforeopen', function() {
      let closeBtn = q('.zoom-popup__close', zoomPopup),
        cnt = q('.zoom-popup__cnt', zoomPopup);

      q('.zoom-popup__img', zoomPopup).src = zoomPopup.caller.src;

      closeBtn.style.top = cnt.getBoundingClientRect().top - closeBtn.offsetHeight - 7.5 + 'px';
      if (matchesMedia('(min-width:1023.98px)')) {
        closeBtn.style.left = cnt.getBoundingClientRect().right - (closeBtn.offsetWidth / 2) + 'px';
      }
    });

    if (houseSlider && galleryPopup) {
      console.log(galleryPopup);
    }
  }

})()
;
(function() {
  let projectsSect = id('projects-sect'),
    // houseSlider = id('house-slider') переехал в глобальное пространство
    btns;

  if (projectsSect || houseSlider) {

    if (matchesMedia('(min-width:1023.98px) and (hover)')) {
      btns = '.project__img, .house-slider__img';
      if (zoomPopup) {
        console.log(zoomPopup);
      }
    } else {
      btns = '.project__img';
    }

    galleryPopup = new Popup('.gallery-popup', {
      openButtons: btns,
      closeButtons: '.gallery-popup__close'
    });

    let galleryPopupCnt = q('.gallery-popup__cnt', galleryPopup),
      slidesClass = 'gallery-popup__img',
      counterCurrentSlide = q('.slider-nav__counter-current', galleryPopupCnt),
      counterTotalSlides = q('.slider-nav__counter-total', galleryPopupCnt),
      $galleryPopupCnt = $(galleryPopupCnt);

    $galleryPopupCnt.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      counterCurrentSlide.textContent = nextSlide + 1;
    });

    galleryPopup.addEventListener('popupbeforeopen', function() {
      let caller = galleryPopup.caller,
        callerParent = caller.parentElement,
        allSlides = qa(btns, callerParent);

      caller.blur();

      if (galleryPopupCnt.classList.contains('slick-slider')) {
        if (galleryPopup.dataset.slider === caller.dataset.slider) {
          $galleryPopupCnt.slick('slickGoTo', caller.dataset.slickIndex, true);
          counterCurrentSlide.textContent = +caller.dataset.slickIndex + 1;
          return;
        } else {
          $galleryPopupCnt.slick('unslick');
          let childs = galleryPopupCnt.children;
          for (var i = childs.length - 1; i >= 0; i--) {
            if (childs[i].tagName === 'IMG') {
              galleryPopupCnt.removeChild(childs[i]);
            }
          }
        }
      }

      let initialSlide,
        counterTotal = allSlides.length;

      counterTotalSlides.textContent = counterTotal;

      for (let i = 0, len = allSlides.length; i < len; i++) {
        let img = document.createElement('img');

        img.classList.add(slidesClass);
        img.src = allSlides[i].src;
        img.alt = '';

        galleryPopupCnt.appendChild(img);

        if (allSlides[i].classList.contains('slick-current')) {
          initialSlide = i;
          img.setAttribute('autofocus', '');
        }

      }

      $galleryPopupCnt.on('init', function(event, slick) {
        setTimeout(function(){
          q('.slick-current', galleryPopupCnt).focus();
        }, 100);
      });

      $galleryPopupCnt.slick({
        slide: '.' + slidesClass,
        initialSlide: initialSlide,
        infinite: false,
        appendArrows: $('.gallery-popup__nav'),
        prevArrow: createArrow('gallery-popup__prev', smallArrowSvg),
        nextArrow: createArrow('gallery-popup__next', smallArrowSvg)
      });


      counterCurrentSlide.textContent = initialSlide + 1;

      galleryPopup.dataset.slider = caller.dataset.slider;


      // console.log(callerIndex);
    });
  }
})();
;(function() {
  let setCursorPosition = function(pos, inputElement) {
    inputElement.focus();
    if (inputElement.setSelectionRange) {
      inputElement.setSelectionRange(pos, pos);
    } else if (inputElement.createTextRange) {
      let range = inputElement.createTextRange();

      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  mask = function() {
    let pattern = '+7(___)___-__-__',
      i = 0,
      def = pattern.replace(/\D/g, ''),
      val = this.value.replace(/\D/g, '');

    if (def.length >= val.length) {
      val = def;
    }

    this.value = pattern.replace(/./g, function(match) {
      return /[_\d]/.test(match) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : match;
    });

    if (event.type === 'blur') {
      if (this.value.length === 2) {
        this.value = '';
        this.classList.remove('filled');
      }
    } else {
      setCursorPosition(this.value.length, this);
    }
  };


  let input = qa('[name=tel]');


  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('input', mask);
    input[i].addEventListener('focus', mask);
    input[i].addEventListener('blur', mask);
  }

})();

});