;
(function() {
  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    smallArrowSvg = '<svg class="arrow__svg" width="18" height="8" viewBox="0 0 18 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.3536 4.52494C17.5488 4.32968 17.5488 4.0131 17.3536 3.81783L14.1716 0.635853C13.9763 0.440591 13.6597 0.440591 13.4645 0.635853C13.2692 0.831115 13.2692 1.1477 13.4645 1.34296L16.2929 4.17139L13.4645 6.99981C13.2692 7.19508 13.2692 7.51166 13.4645 7.70692C13.6597 7.90218 13.9763 7.90218 14.1716 7.70692L17.3536 4.52494ZM0 4.67139H17V3.67139H0L0 4.67139Z" fill="currentColor"/></svg>',
    longArrowSvg = '<svg class="arrow__svg" width="106" height="9" fill="url(#gradient)" xmlns="http://www.w3.org/2000/svg"><path d="M105.354 4.828a.5.5 0 000-.707L102.172.939a.501.501 0 00-.708.707l2.829 2.828-2.829 2.829a.5.5 0 00.708.707l3.182-3.182zM0 4.974h105v-1H0v1z" fill="inherit" /><defs><linearGradient id="gradient"><stop offset="0%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: currentColor"></stop><stop offset="100%" style="stop-color: currentColor"></stop></linearGradient></defs></svg>',
    cornerArrowSvg = '<svg class="arrow__svg" width="11" height="20" viewBox="0 0 11 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M1 1l9 9-9 9" stroke="currentColor"/></svg>',

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

    createArrow = function(className, inside) {

      className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;

      return `<button type="button" class="arrow arrow__${className}">${inside}</button>`;
    },
    buildSliders = function() {
      for (let i = buildSlidersFunctions.length - 1; i >= 0; i--) {
        buildSlidersFunctions[i]();
      }
    },
    buildSlidersFunctions = [];

  if (reviewsSlider && reviewsSlides.length && reviewsSlides.length > 1) {
    let $reviewsSlider = $(reviewsSlider),
      counterCurrentSlide = q('.slider-nav__counter-current', reviewsSlider),
      counterTotalSlides = q('.slider-nav__counter-total', reviewsSlider),
      buildReviewsSlider = function() {
        // если ширина экрана больше 576px и слайдов меньше 3, то слайдера не будет
        // показываем по 2 слайда
        if (matchesMedia('(min-width: 575.98px)') && reviewsSlides.length < 3) {
          if (reviewsSlider.classList.contains('slick-slider')) {
            $reviewsSlider.slick('unslick');
          }
          // если ширина экрана больше 1024px и слайдов меньше 5, то слайдера не будет
          // показываем по 4 слайда
        } else if (matchesMedia('(min-width: 767.98px)') && reviewsSlides.length < 3) {
          if (reviewsSlider.classList.contains('slick-slider')) {
            $reviewsSlider.slick('unslick');
          }
          // в других случаях делаем слайдер
        } else if (matchesMedia('(min-width: 1439.98px)') && reviewsSlides.length < 4) {
          if (reviewsSlider.classList.contains('slick-slider')) {
            $reviewsSlider.slick('unslick');
          }
          // в других случаях делаем слайдер
        } else {
          if (reviewsSlider.classList.contains('slick-slider')) {
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

          if (matchesMedia('(min-width:575.98px)')) {
            counterTotal--;
          } else if (matchesMedia('(min-width:1439.98px)')) {
            counterTotal = Math.ceil(counterTotal / 3);
          } else {
            counterTotal = reviewsSlides.length;
          }

          counterTotalSlides.textContent = counterTotal;

          $reviewsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions[0] = buildReviewsSlider;
  }

  if (casesSlider && casesSlides.length && casesSlides.length > 1) {
    let $casesSlider = $(casesSlider),
      casesSliderParent = casesSlider.parentElement,
      counterCurrentSlide = q('.slider-nav__counter-current', casesSliderParent),
      counterTotalSlides = q('.slider-nav__counter-total', casesSliderParent),
      buildCasesSlider = function() {
        if (matchesMedia('(min-width: 575.98px)')) {
          if (casesSlider.classList.contains('slick-slider')) {
            $casesSlider.slick('unslick');
          }
        } else {
          if (casesSlider.classList.contains('slick-slider')) {
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

    buildSlidersFunctions[1] = buildCasesSlider;
  }

  if (stagesSlider && stagesSlides.length && stagesSlides.length > 1) {
    let $stagesSlider = $(stagesSlider),
      counterCurrentSlide = q('.stages__counter-current', stagesSlider),
      counterTotalSlides = q('.stages__counter-total', stagesSlider),
      buildStagesSlider = function() {
        if (stagesSlider.classList.contains('slick-slider')) {
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

    buildSlidersFunctions[2] = buildStagesSlider;
  }

  if (featuresSlider && featuresSlides.length && featuresSlides.length > 1) {
    let $featuresSlider = $(featuresSlider),
      counterCurrentSlide = q('.features__counter-current', featuresSlider),
      counterTotalSlides = q('.features__counter-total', featuresSlider),
      buildFeaturesSlider = function() {
        // если ширина экрана больше 576px и слайдов меньше 3, то слайдера не будет
        // показываем по 2 слайда
        if (matchesMedia('(min-width: 575.98px)') && featuresSlides.length < 3) {
          if (featuresSlider.classList.contains('slick-slider')) {
            $featuresSlider.slick('unslick');
          }
          // если ширина экрана больше 1024px и слайдов меньше 5, то слайдера не будет
          // показываем по 4 слайда
        } else if (matchesMedia('(min-width: 1439.98px)') && featuresSlides.length < 4) {
          if (featuresSlider.classList.contains('slick-slider')) {
            $featuresSlider.slick('unslick');
          }
          // в других случаях делаем слайдер
        } else {
          if (featuresSlider.classList.contains('slick-slider')) {
            // слайдер уже создан
            return;
          }
          $featuresSlider.slick({
            appendArrows: $('.features__nav'),
            prevArrow: createArrow('features__prev', smallArrowSvg),
            nextArrow: createArrow('features__next', smallArrowSvg),
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
                prevArrow: createArrow('features__prev', cornerArrowSvg),
                nextArrow: createArrow('features__next', cornerArrowSvg)
              }
            }, {
              breakpoint: 1439.98,
              settings: {
                slidesToShow: 4,
                centerMode: false,
                prevArrow: createArrow('features__prev', cornerArrowSvg),
                nextArrow: createArrow('features__next', cornerArrowSvg)
              }
            }]
          });

          let counterTotal = featuresSlides.length;

          if (matchesMedia('(min-width:575.98px)')) {
            counterTotal--;
          } else if (matchesMedia('(min-width:1439.98px)')) {
            counterTotal = Math.ceil(counterTotal / 3);
          }

          counterTotalSlides.textContent = counterTotal;

          $featuresSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    buildSlidersFunctions[3] = buildFeaturesSlider;
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