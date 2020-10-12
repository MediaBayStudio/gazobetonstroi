;
(function() {
  let projectsSect = id('projects-sect');

  if (projectsSect) {

    galleryPopup = new Popup('.gallery-popup', {
      openButtons: '.project__img',
      closeButtons: '.gallery-popup__close'
    });

    let galleryPopupCnt = q('.gallery-popup__cnt', galleryPopup),
      $galleryPopupCnt = $(galleryPopupCnt);

    galleryPopup.addEventListener('popupbeforeopen', function() {
      let caller = galleryPopup.caller,
        callerParent = caller.parentElement,
        allSlides = qa('.project__img', callerParent);


      if (galleryPopupCnt.classList.contains('slick-slider')) {

      } else {
        let initialSlide,
          slidesClass = 'gallery-popup__img',
          counterCurrentSlide = q('.slider-nav__counter-current', galleryPopupCnt),
          counterTotalSlides = q('.slider-nav__counter-total', galleryPopupCnt),
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
          }

        }

        $galleryPopupCnt.slick({
          slide: '.' + slidesClass,
          initialSlide: initialSlide,
          infinite: false,
          appendArrows: $('.gallery-popup__nav'),
          prevArrow: createArrow('gallery-popup__prev', smallArrowSvg),
          nextArrow: createArrow('gallery-popup__next', smallArrowSvg),
          // mobileFirst: true,
          // responsive: [{
          //   breakpoint: 1023.98,
          //   settings: {
          //   }
          // }]
        });

        $galleryPopupCnt.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          counterCurrentSlide.textContent = nextSlide + 1;
        });
      }




      // console.log(callerIndex);
    });
  }
})();