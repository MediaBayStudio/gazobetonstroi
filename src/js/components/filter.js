;
(function() {
  let $filterForm = id('filter-form'),
    $housesCards = id('houses-cards'),
    $loadmoreBtn = id('loadmore-btn');

  if ($filterForm) {
    let housesOnPage = qa('.house', $housesCards),
      totalCountPosts = $loadmoreBtn ? $loadmoreBtn.dataset.postsCount : housesOnPage.length,
      numberposts = $filterForm.dataset.numberposts,
      postType = $filterForm.dataset.postType,
      loadHouses = function(byFilter) {
        let xhr = new XMLHttpRequest(),
          data;

        if (byFilter) {
          data = new FormData($filterForm);
          data.append('action', 'print_houses');
          data.append('numberposts', numberposts);
          data.append('post_type', postType);
          $filterFormPopup.closePopup();
        } else {
          let loadmoreFilter = $loadmoreBtn.dataset.filter;
          data = 'action=print_houses&numberposts=' + numberposts + '&post_type=' + postType + '&offset=' + housesOnPage.length;
          if (loadmoreFilter) {
            data += '&filter=' + loadmoreFilter;
          }
        }

        console.log(data);

        xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
        if (!byFilter) {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let houses = xhr.response;

            if (byFilter) {
              $housesCards.innerHTML = houses;
            } else {
              $housesCards.removeChild($loadmoreBtn);
              $housesCards.insertAdjacentHTML('beforeend', houses);
            }

            $loadmoreBtn = id('loadmore-btn');
            totalCountPosts = $loadmoreBtn && $loadmoreBtn.dataset.postsCount;

            
            housesOnPage = qa('.house', $housesCards);

            // $housesCards.style.maxHeight = $housesCards.scrollHeight + 'px';

            // if (housesOnPage.length == totalCountPosts) {
            //   $loadmoreBtn.setAttribute('hidden', '');
            // } else {
            //   $loadmoreBtn.focus();
            // }
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

      // let xhr = new XMLHttpRequest(),
      //   data = new FormData($filterForm);

      // data.append('action', 'print_houses');
      // data.append('numberposts', numberposts);
      // data.append('post_type', postType);

      // xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
      // xhr.send(data);

      // $filterFormPopup.closePopup();


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