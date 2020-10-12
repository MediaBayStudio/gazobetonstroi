;
(function() {
  let $filterForm = id('filter-form'),
    $housesCards = id('houses-cards'),
    $loadmoreBtn = id('loadmore-btn');

  if ($filterForm) {
    let housesOnPage = qa('.house', $housesCards),
      totalHouses = 0,
      $filterHint = id('filter-form-hint'),
      numberposts = $filterForm.dataset.numberposts,
      postType = $filterForm.dataset.postType,
      filterTimer,
      setCountHouses = function(event) {
        if (event && event.type === 'change') {
          clearTimeout(filterTimer);

          filterTimer = setTimeout(function() {
            $filterForm.classList.add('loading');

            let eventTragetParent = event.target.parentElement,
              xhr = new XMLHttpRequest(),
              data = new FormData($filterForm);

            data.append('action', 'get_count_houses');
            data.append('post_type', postType);

            xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
            xhr.send(data);

            xhr.addEventListener('readystatechange', function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                let countHouses = xhr.response,
                  coords = eventTragetParent.offsetTop;

                $filterForm.classList.remove('loading');

                $filterHint.style.top = coords + 'px';
                $filterHint.style.opacity = 1;

                $filterHint.dataset.countHouses = countHouses;
              }
            });
          }, 1000);

        }
      },
      loadHouses = function(byFilter) {
        $housesCards.classList.add('loading');
        $filterForm.classList.add('loading');

        let xhr = new XMLHttpRequest(),
          data = new FormData($filterForm);

        data.append('action', 'print_houses');
        data.append('numberposts', numberposts);
        data.append('post_type', postType);

        if (byFilter) {
          $filterFormPopup.closePopup();
        } else {
          data.append('offset', housesOnPage.length);
        }

        xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {

            $housesCards.classList.remove('loading');
            $filterForm.classList.remove('loading');

            let houses = xhr.response;

            if (byFilter) {
              $housesCards.innerHTML = houses;
            } else {
              if ($housesCards.contains($loadmoreBtn)) {
                $housesCards.removeChild($loadmoreBtn);
              }
              $housesCards.insertAdjacentHTML('beforeend', houses);
            }

            $loadmoreBtn = id('loadmore-btn');

            housesOnPage = qa('.house', $housesCards);

            $filterHint.style.opacity = 0;

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

    $filterForm.addEventListener('submit', function() {
      event.preventDefault();
      loadHouses(true);
    });

    $housesCards.addEventListener('click', function(e) {
      let target = e.target;

      if (target.id === 'loadmore-btn') {
        loadHouses(false);
      }
    });

    // $housesCards.style.maxHeight = $housesCards.scrollHeight + 'px';

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

    $filterForm.addEventListener('reset', function() {
      clearTimeout(filterTimer);

      filterTimer = setTimeout(function() {
        $filterHint.style.opacity = 0;
        loadHouses(true);
      });
    });

    $filterForm.addEventListener('change', setCountHouses);

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