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
        // variableWidth: true,
        adaptiveHeight: true,
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