;
(function() {
  smallArrowSvg = '<svg class="arrow__svg" width="18" height="8" viewBox="0 0 18 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.3536 4.52494C17.5488 4.32968 17.5488 4.0131 17.3536 3.81783L14.1716 0.635853C13.9763 0.440591 13.6597 0.440591 13.4645 0.635853C13.2692 0.831115 13.2692 1.1477 13.4645 1.34296L16.2929 4.17139L13.4645 6.99981C13.2692 7.19508 13.2692 7.51166 13.4645 7.70692C13.6597 7.90218 13.9763 7.90218 14.1716 7.70692L17.3536 4.52494ZM0 4.67139H17V3.67139H0L0 4.67139Z" fill="currentColor"/></svg>';

  createArrow = function(className, inside) {

    className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;

    return `<button type="button" class="arrow arrow__${className}">${inside}</button>`;
  };

  let nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    longArrowSvg = '<svg class="arrow__svg" width="106" height="9" fill="url(#gradient)" xmlns="http://www.w3.org/2000/svg"><path d="M105.354 4.828a.5.5 0 000-.707L102.172.939a.501.501 0 00-.708.707l2.829 2.828-2.829 2.829a.5.5 0 00.708.707l3.182-3.182zM0 4.974h105v-1H0v1z" fill="inherit" /><defs><linearGradient id="gradient"><stop offset="0%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: currentColor"></stop><stop offset="100%" style="stop-color: currentColor"></stop></linearGradient></defs></svg>',
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

    houseSlider = id('house-slider'),
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

  $('.project__slider').each(function() {
    let $slider = $(this),
      slidesSelector = '.project__img',
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
  })

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
          infinite: false,
          mobileFirst: true,
          responsive: [{
            breakpoint: 1023.98,
            settings: {
              prevArrow: createArrow(prevArrowClass, smallArrowSvg),
              nextArrow: createArrow(nextArrowClass, smallArrowSvg)
            }
          }, {
            breakpoint: 1439.98,
            settings: {
              prevArrow: createArrow(prevArrowClass, longArrowSvg),
              nextArrow: createArrow(nextArrowClass, longArrowSvg)
            }
          }]
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
      }

    buildSlidersFunctions.push(buildHousesSlider);
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