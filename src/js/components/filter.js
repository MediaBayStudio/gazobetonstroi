;
(function() {
  let $filterForm = id('filter-form'),
    $housesCards = id('houses-cards'),
    $loadmoreBtn = id('loadmore-btn');

  if ($filterForm) {
    let housesOnPage = qa('.house', $housesCards),
      $filterFormBtn = q('.filter-form__btn', $filterForm),
      $filterFormHint = q('.filter-form__hint', $filterForm),
      $filterFormHintClose = q('.filter-form__hint-close', $filterFormHint),
      $filterFormHintNum = q('.filter-form__hint-num', $filterFormHint),
      $lastCheckedInput,
      $housesCountLine = q('.houses-count-num'),
    // Общее кол-во домов в базе данных, читается с #posts-count
      totalHouses = +q('#posts-count', $housesCards).textContent,
    // Кол-во домов, которые будем запрашивать
      numberposts = $filterForm.dataset.numberposts,
    // Тип домовв projects или cases
      postType = $filterForm.dataset.postType,
    // Таймер для срабатываения формы (отключили)
      // filterTimer,
      setTopTimer,
      setNumberTimer,
      setTopToHint = function() {
        if (!$lastCheckedInput) {
          return;
        }

        clearTimeout(setTopTimer);
        setTimeout(function() {
          let targetCoords = $lastCheckedInput.getBoundingClientRect(),
            formCoords = $filterForm.getBoundingClientRect();
          $filterFormHint.style.top = targetCoords.top - formCoords.top - $lastCheckedInput.offsetHeight / 2 + 'px';
        }, 500);
      },
      getHousesCount = function(e) {
        clearTimeout(setTopTimer);
        clearTimeout(setNumberTimer);
        $filterFormBtn.classList.add('loading');
        $filterFormHint.classList.add('loading');
        $filterForm.classList.add('visible-hint');

        let xhr = new XMLHttpRequest(),
          data = new FormData($filterForm),
          target = e.target,
          targetCoords = target.getBoundingClientRect(),
          formCoords = $filterForm.getBoundingClientRect();

        $lastCheckedInput = target;

        // Устанавливаем отступы элементу-подсказке
        $filterFormHint.style.top = targetCoords.top - formCoords.top - target.offsetHeight / 2 + 'px';
        $filterFormHint.style.left = target.parentElement.offsetWidth + 30 + 'px';

        data.append('action', 'get_count_houses');
        data.append('post_type', postType);

        xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            clearTimeout(setNumberTimer);
            let response = xhr.response;

            $filterFormBtn.dataset.housesCount = response;

            // Анимация прибавления и убавления числа проектов в подсказке
            // numberAnimInterval = setInterval(function() {
            //   let hintText = +$filterFormHintNum.textContent;

            //   if (hintText == response) {
            //     clearInterval(numberAnimInterval);
            //   }
            //   if (response < hintText) {
            //     $filterFormHintNum.textContent = hintText - 1;
            //   } else if (response > hintText) {
            //     $filterFormHintNum.textContent = hintText + 1;
            //   } else {
            //     $filterFormHintNum.textContent = response;
            //   }
            // }, 1);

            setNumberTimer = setTimeout(function() {
              $filterFormHintNum.textContent = response;
              $filterFormBtn.classList.remove('loading');
              $filterFormHint.classList.remove('loading');
            }, 1000);
          }
        });
      },
      loadHouses = function(e, reset) {
        let eventType = e.type,
          $formElements = $filterForm.elements;

        if (eventType !== 'reset') {
          e.preventDefault()
        }

        // Для нормального сброса
        if (eventType === 'reset' && !reset) {
          for (var i = $formElements.length - 1; i >= 0; i--) {
            $formElements[i].removeAttribute('checked');
          }
          setTimeout(function() {
            loadHouses(e, true);
          });
          return;
        }

        $filterForm.classList.remove('visible-hint');


        let xhr = new XMLHttpRequest(),
          data = new FormData($filterForm),
          formData = [];

        for (let i = 0, j = 0, len = $formElements.length; i < len; i++) {
          if ($formElements[i].tagName === 'INPUT') {
            if ($formElements[i].checked) {
              formData[j] = $formElements[i].name + '=' + $formElements[i].value;
              j++;
            }
          }
        }

        formData = formData.join('&');

        // Если кликнули по ссылке загрузить еще, то обновляем строку и href у кнопки, прибавляя ++pageFactor
        if (eventType === 'click') {
          history.replaceState(0, 0, $loadmoreBtn.href);
          $loadmoreBtn.href = $loadmoreBtn.href.replace(/catalogue_page=(\d+)/, function(match, pf) {
            if (match) {
              return 'catalogue_page=' + ++pf;
            }
          });
        } else {
          // Если просто оправка формы, то сбрасываем на первую страницу каталога
          $loadmoreBtn.href = $loadmoreBtn.href = '?catalogue_page=2';
          if (formData) {
            history.replaceState(0, 0, '?' + formData);
            $loadmoreBtn.href += '&' + formData;
          } else {
            history.replaceState(0, 0, siteUrl + '/' + postType + '/');
          }
        }

        $housesCards.classList.add('loading');
        $loadmoreBtn.classList.add('loading');
        $filterForm.classList.add('loading');
        $loadmoreBtn.blur();

        formData += '&action=print_houses&' + 'numberposts=' + numberposts + '&post_type=' + postType;

        data.append('action', 'print_houses');
        data.append('numberposts', numberposts);
        data.append('post_type', postType);

        if (eventType === 'click') { // loadmore
          data.append('offset', housesOnPage.length);
          formData += '&offset=' + housesOnPage.length;
        } else {
          $filterFormPopup.closePopup();
        }

        xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {

            $housesCards.classList.remove('loading');
            $loadmoreBtn.classList.remove('loading');
            $filterForm.classList.remove('loading');

            let houses = xhr.response;

            if (eventType === 'click') {
              // if ($housesCards.contains($loadmoreBtn)) {
              //   $housesCards.removeChild($loadmoreBtn);
              // }
              $housesCards.insertAdjacentHTML('beforeend', houses);
            } else {
              $housesCards.innerHTML = houses;
            }

            // lazy.refresh();

            $housesCards.style.maxHeight = $housesCards.scrollHeight + 'px';

            $loadmoreBtn = id('loadmore-btn');

            housesOnPage = qa('.house', $housesCards);

            totalHouses = +q('#posts-count', $housesCards).textContent;

            $housesCards.removeChild(q('#posts-count', $housesCards));

            $housesCountLine.textContent = totalHouses;

            // Анимация цифр на полоске "найдено проектов"
            // let interval = setInterval(function() {
            //   if ($housesCountLine.textContent == totalHouses) {
            //     clearInterval(interval);
            //   }
            //   if (totalHouses < $housesCountLine.textContent) {
            //     $housesCountLine.textContent = $housesCountLine.textContent - 1;
            //   } else if (totalHouses > $housesCountLine.textContent) {
            //     $housesCountLine.textContent = +$housesCountLine.textContent + 1;
            //   } else {
            //     $housesCountLine.textContent = totalHouses;
            //   }
            // }, 1);

            if ($loadmoreBtn) {
              // $loadmoreBtn.focus();
              $loadmoreBtn.dataset.housesOnPage = housesOnPage.length;
              // totalHouses = $loadmoreBtn.dataset.totalHousesCount;

              if (housesOnPage.length < totalHouses) {
                $loadmoreBtn.removeAttribute('hidden');
                $loadmoreBtn.dataset.page = +$loadmoreBtn.dataset.page + 1;
              } else {
                $loadmoreBtn.setAttribute('hidden', '');
              }
            }
          }
        });
      };

    $housesCards.removeChild(id('posts-count', $housesCards));

    $filterFormPopup = new Popup('#filter-form', {
      openButtons: '#filter-form-call-btn',
      closeButtons: '.filter-form__close',
      clickToClose: false
    });

    $filterForm.addEventListener('submit', loadHouses);


    $loadmoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loadHouses(e);
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

    $filterFormHintClose.addEventListener('click', function() {
      $filterForm.classList.remove('visible-hint');
    });
    $filterForm.addEventListener('reset', loadHouses);
    $filterForm.addEventListener('change', getHousesCount);
    $housesCards.style.maxHeight = $housesCards.scrollHeight + 'px';
    // $filterForm.addEventListener('change', loadHouses);

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
      windowFuncs.scroll.push(setTopToHint);
      $filterForm.children[0].addEventListener('scroll', setTopToHint);
      /*
        Много сложностей с фиксацией
        Нет высоты
        Закрывает футер
        Криво прелодер
      */
      // sticky($filterForm, 'top');
    } else {
      sticky('#filter-form-call-btn');
    }
  }

})();