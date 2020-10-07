;
(function() {
  let $filterForm = id('filter-form');

  if ($filterForm) {
    $filterFormPopup = new Popup('#filter-form', {
      openButtons: '#filter-form-call-btn',
      closeButtons: '.filter-form__close',
      clickToClose: false
    });

    // Сворачиваем списки фильтров, при закрытии окна
    // $filterFormPopup.addEventListener('popupclose', function() {
    //   let $fieldSets = qa('.dropdown', $filterForm);
    //   for (let i = $fieldSets.length - 1; i >= 0; i--) {
    //     let dataHeight = $fieldSets[i].dataset.height;
    //     $fieldSets[i].classList.remove('active');
    //     if (dataHeight) {
    //       $fieldSets[i].style.maxHeight = dataHeight + 'px';
    //     }
    //   }
    // });

    $filterForm.addEventListener('submit', function() {
      event.preventDefault();

      let xhr = new XMLHttpRequest();

      xhr.open($filterForm.method, $filterForm.action);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send();

      xhr.addEventListener('readystatechange', function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let response = xhr.response;
          console.log(response);
        }
      });
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