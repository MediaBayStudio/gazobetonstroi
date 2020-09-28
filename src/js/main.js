//polyfills
(function(){'use strict';function a(a){this.time=a.time,this.target=a.target,this.rootBounds=a.rootBounds,this.boundingClientRect=a.boundingClientRect,this.intersectionRect=a.intersectionRect||i(),this.isIntersecting=!!a.intersectionRect;var b=this.boundingClientRect,c=b.width*b.height,d=this.intersectionRect,e=d.width*d.height;this.intersectionRatio=c?+(e/c).toFixed(4):this.isIntersecting?1:0}function b(a,b){var c=b||{};if("function"!=typeof a)throw new Error("callback must be a function");if(c.root&&1!=c.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=d(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=a,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(c.rootMargin),this.thresholds=this._initThresholds(c.threshold),this.root=c.root||null,this.rootMargin=this._rootMarginValues.map(function(a){return a.value+a.unit}).join(" ")}function c(){return window.performance&&performance.now&&performance.now()}function d(a,b){var c=null;return function(){c||(c=setTimeout(function(){a(),c=null},b))}}function e(a,b,c,d){"function"==typeof a.addEventListener?a.addEventListener(b,c,d||!1):"function"==typeof a.attachEvent&&a.attachEvent("on"+b,c)}function f(a,b,c,d){"function"==typeof a.removeEventListener?a.removeEventListener(b,c,d||!1):"function"==typeof a.detatchEvent&&a.detatchEvent("on"+b,c)}function g(a,b){var c=Math.max(a.top,b.top),d=Math.min(a.bottom,b.bottom),e=Math.max(a.left,b.left),f=Math.min(a.right,b.right),g=f-e,h=d-c;return 0<=g&&0<=h&&{top:c,bottom:d,left:e,right:f,width:g,height:h}}function h(a){var b;try{b=a.getBoundingClientRect()}catch(a){}return b?(b.width&&b.height||(b={top:b.top,right:b.right,bottom:b.bottom,left:b.left,width:b.right-b.left,height:b.bottom-b.top}),b):i()}function i(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function j(a,b){for(var c=b;c;){if(c==a)return!0;c=k(c)}return!1}function k(a){var b=a.parentNode;return b&&11==b.nodeType&&b.host?b.host:b&&b.assignedSlot?b.assignedSlot.parentNode:b}if("object"==typeof window){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)return void("isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}}));var l=window.document,m=[];b.prototype.THROTTLE_TIMEOUT=100,b.prototype.POLL_INTERVAL=null,b.prototype.USE_MUTATION_OBSERVER=!0,b.prototype.observe=function(a){var b=this._observationTargets.some(function(b){return b.element==a});if(!b){if(!(a&&1==a.nodeType))throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:a,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},b.prototype.unobserve=function(a){this._observationTargets=this._observationTargets.filter(function(b){return b.element!=a}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},b.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},b.prototype.takeRecords=function(){var a=this._queuedEntries.slice();return this._queuedEntries=[],a},b.prototype._initThresholds=function(a){var b=a||[0];return Array.isArray(b)||(b=[b]),b.sort().filter(function(b,c,d){if("number"!=typeof b||isNaN(b)||0>b||1<b)throw new Error("threshold must be a number between 0 and 1 inclusively");return b!==d[c-1]})},b.prototype._parseRootMargin=function(a){var b=(a||"0px").split(/\s+/).map(function(a){var b=/^(-?\d*\.?\d+)(px|%)$/.exec(a);if(!b)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(b[1]),unit:b[2]}});return b[1]=b[1]||b[0],b[2]=b[2]||b[0],b[3]=b[3]||b[1],b},b.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(e(window,"resize",this._checkForIntersections,!0),e(l,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(l,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},b.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,f(window,"resize",this._checkForIntersections,!0),f(l,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},b.prototype._checkForIntersections=function(){var b=this._rootIsInDom(),d=b?this._getRootRect():i();this._observationTargets.forEach(function(e){var f=e.element,g=h(f),i=this._rootContainsTarget(f),j=e.entry,k=b&&i&&this._computeTargetAndRootIntersection(f,d),l=e.entry=new a({time:c(),target:f,boundingClientRect:g,rootBounds:d,intersectionRect:k});j?b&&i?this._hasCrossedThreshold(j,l)&&this._queuedEntries.push(l):j&&j.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},b.prototype._computeTargetAndRootIntersection=function(a,b){if("none"!=window.getComputedStyle(a).display){for(var c=h(a),d=c,e=k(a),f=!1;!f;){var i=null,j=1==e.nodeType?window.getComputedStyle(e):{};if("none"==j.display)return;if(e==this.root||e==l?(f=!0,i=b):e!=l.body&&e!=l.documentElement&&"visible"!=j.overflow&&(i=h(e)),i&&(d=g(i,d),!d))break;e=k(e)}return d}},b.prototype._getRootRect=function(){var a;if(this.root)a=h(this.root);else{var b=l.documentElement,c=l.body;a={top:0,left:0,right:b.clientWidth||c.clientWidth,width:b.clientWidth||c.clientWidth,bottom:b.clientHeight||c.clientHeight,height:b.clientHeight||c.clientHeight}}return this._expandRectByRootMargin(a)},b.prototype._expandRectByRootMargin=function(a){var b=this._rootMarginValues.map(function(b,c){return"px"==b.unit?b.value:b.value*(c%2?a.width:a.height)/100}),c={top:a.top-b[0],right:a.right+b[1],bottom:a.bottom+b[2],left:a.left-b[3]};return c.width=c.right-c.left,c.height=c.bottom-c.top,c},b.prototype._hasCrossedThreshold=function(a,b){var c=a&&a.isIntersecting?a.intersectionRatio||0:-1,d=b.isIntersecting?b.intersectionRatio||0:-1;if(c!==d)for(var e,f=0;f<this.thresholds.length;f++)if(e=this.thresholds[f],e==c||e==d||e<c!=e<d)return!0},b.prototype._rootIsInDom=function(){return!this.root||j(l,this.root)},b.prototype._rootContainsTarget=function(a){return j(this.root||l,a)},b.prototype._registerInstance=function(){0>m.indexOf(this)&&m.push(this)},b.prototype._unregisterInstance=function(){var a=m.indexOf(this);-1!=a&&m.splice(a,1)},window.IntersectionObserver=b,window.IntersectionObserverEntry=a}})();
(function(){function a(a,b){b=b||{bubbles:!1,cancelable:!1,detail:null};let c=document.createEvent("CustomEvent");return c.initCustomEvent(a,b.bubbles,b.cancelable,b.detail),c}return"function"!=typeof window.CustomEvent&&void(a.prototype=window.Event.prototype,window.CustomEvent=a)})();
let lazy,
  menu,
  hdr,
  overlay,
  thanksPopup,
  thanksPopupTimer,
  // callbackPopup,
  // orderPopup,
  fakeScrollbar,
  // siteurl = document.body.dataset.siteurl,
  // page = document.body.dataset.page,
  // mobileRegExp = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
  // mobile = mobileRegExp.test(navigator.userAgent),
  // IE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1,
  q = function(selector, element) {
    element = element || document.body;
    return element.querySelector(selector);
  },
  qa = function(selectors, element, toArray) {
    element = element || document.body;
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
  scrollToTarget  = function(target) {
    event.preventDefault();

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
          r = (targetTop < 0 ? Math.max(wndwY - progress/V, wndwY + targetTop) : Math.min(wndwY + progress/V, wndwY + targetTop));

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
    // clearSrc: true,
    // clearMedia: true
  });

  // фикс vh для элементов с 100vh
  window.addEventListener('resize', function() {
    setVh();
    // mobile = mobileRegExp.test(navigator.userAgent);
  });
  setVh();

  svg4everybody();
  
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
  let contactsForm = id('contacts-form'),
    $uploadFilesBlock = id('uploadedfiles'),
    errorsClass = 'invalid',
    $filesInput = id('files-input'),
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
    validationForm = function() {
      event.preventDefault();

      let errors = {},
        thisForm = this,
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
        if (event.type === 'submit') {
          submitHandler(thisForm);
        }
      } else {
        thisForm.addEventListener('change', validationForm);
        thisForm.addEventListener('input', validationForm);
        showErrors(thisForm, errors);
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
    submitHandler = function($form) {

      let xhr = new XMLHttpRequest(),
        data = new FormData($form);

      xhr.open($form.method, $form.action);
      xhr.send(data);

      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let $formElements = $form.elements,
            response = xhr.response;

          for (let i = 0; i < $formElements.length; i++) {
            hideError($formElements[i]);
            $formElements[i].classList.remove('filled');
          }

          $form.reset();
          $uploadFilesBlock.innerHTML = '';

          if (response == 1) {
            thanksPopup.openPopup();
            thanksPopupTimer = setTimeout(function() {
              thanksPopup.closePopup();
            }, 3000);
          }

        }
      });

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

  contactsForm.setAttribute('novalidate', '');

  contactsForm.addEventListener('submit', validationForm);
  contactsForm.addEventListener('input', toggleInputsClass);

  // $uploadFilesBlock.addEventListener('click', function() {
  //   let $target = event.target,
  //     targetText = $target.firstChild.textContent;

  //   if ($target.classList.contains('uploadedfiles__file')) {
  //     for (let i = 0, len = $filesInput.files.length; i < len; i++) {
  //       if ($filesInput.files[i].name === targetText) {
  //         for (let j = 0, len = $filesInput.filesArray.length; j < len; j++) {
  //           if ($filesInput.filesArray[j].name === targetText) {
  //             $filesInput.filesArray.splice(j, 1);
  //             break;
  //           }
  //         }
  //         $uploadFilesBlock.removeChild($target);
  //         break;
  //       }
  //     }
  //   }
  // });


})();
;
(function() {
  let detailsBtnsblock = id('details-btns'),
    detailsTextBlock = id('details-text');

  if (detailsBtnsblock) {

    let tabsContents = detailsTextBlock.children,
      tabs = detailsBtnsblock.children,
      tabFocus = 0,
      changeTabs = function(event) {
        let target = event.target,
          parent = target.parentNode,
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

    detailsBtnsblock.addEventListener('click', changeTabs);



    detailsBtnsblock.addEventListener('keydown', function(event) {
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


})();

});