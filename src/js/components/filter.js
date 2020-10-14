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