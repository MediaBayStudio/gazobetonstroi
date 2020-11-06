;
(function() {
  smallArrowSvg = '<svg class="arrow__svg" width="18" height="8" viewBox="0 0 18 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.3536 4.52494C17.5488 4.32968 17.5488 4.0131 17.3536 3.81783L14.1716 0.635853C13.9763 0.440591 13.6597 0.440591 13.4645 0.635853C13.2692 0.831115 13.2692 1.1477 13.4645 1.34296L16.2929 4.17139L13.4645 6.99981C13.2692 7.19508 13.2692 7.51166 13.4645 7.70692C13.6597 7.90218 13.9763 7.90218 14.1716 7.70692L17.3536 4.52494ZM0 4.67139H17V3.67139H0L0 4.67139Z" fill="currentColor"/></svg>';

  createArrow = function(className, inside) {

    className = (className.indexOf('prev') === -1 ? 'next ' : 'prev ') + className;

    return `<button type="button" class="arrow arrow__${className}">${inside}</button>`;
  };

  let dot = '<button type="button" class="hero-sect__dot dot"></button>',
    nextArrow = '<button type="button" class="arrow"></button>',
    prevArrow = '<button type="button" class="arrow"></button>',
    // longArrowSvg = '<svg class="arrow__svg" width="106" height="9" fill="url(#gradient)" xmlns="http://www.w3.org/2000/svg"><path d="M105.354 4.828a.5.5 0 000-.707L102.172.939a.501.501 0 00-.708.707l2.829 2.828-2.829 2.829a.5.5 0 00.708.707l3.182-3.182zM0 4.974h105v-1H0v1z" fill="inherit" /><defs><linearGradient id="gradient"><stop offset="0%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: transparent"></stop><stop offset="50%" style="stop-color: currentColor"></stop><stop offset="100%" style="stop-color: currentColor"></stop></linearGradient></defs></svg>',
    longArrowSvg = '<svg class="arrow__svg" width="106" height="9" fill="inherit" xmlns="http://www.w3.org/2000/svg"><path d="M105.354 4.828a.5.5 0 000-.707L102.172.939a.501.501 0 00-.708.707l2.829 2.828-2.829 2.829a.5.5 0 00.708.707l3.182-3.182zM0 4.974h105v-1H0v1z" fill="inherit" /></svg>',
    cornerArrowSvg = '<svg class="arrow__svg" width="11" height="20" viewBox="0 0 11 20" xmlns="http://www.w3.org/2000/svg" fill="none"><path d="M1 1l9 9-9 9" stroke="currentColor"/></svg>',

    counterCurrentSelector = '.slider-nav__counter-current',
    counterTotalSelector = '.slider-nav__counter-total',

    slickSliderClass = 'slick-slider',

    hasSlickClass = function($el) {
      return $el.hasClass('slick-slider');
    },
    unslick = function($el) {
      $el.slick('unslick');
    },

    heroSlider = id('hero-slider'),
    heroSlidesSelector = '.hero-sect__slide',
    heroSlides = heroSlider && qa(heroSlidesSelector, heroSlider),

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

    // houseSlider = id('house-slider'), переехал в глоабльное пространство
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

    // Медиазапросы для сокращения записи
    mw576 = '(min-width: 575.98px)',
    mw767 = '(min-width: 767.98px)',
    mw1024 = '(min-width: 1023.98px)',
    mw1440 = '(min-width: 1439.98px)';

  // Слайдер проектов
  // Слайдер в главной секции на страницах
  $('.project__slider, .hero-page-sect__figure').each(function() {
    let $slider = $(this),
      slidesSelector = $slider.hasClass('project__slider') ? '.project__img' : '.hero-page-sect__img',
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
  });


  if (heroSlider && heroSlides.length && heroSlides.length > 1) {
    let $heroSlider = $(heroSlider),
      buildHeroSlider = function() {
        if (hasSlickClass($heroSlider)) {
          // слайдер уже создан
          return;
        }
        $heroSlider.slick({
          arrows: false,
          slide: heroSlidesSelector,
          infinite: false,
          variableWidth: true,
          dots: true,
          dotsClass: 'hero-sect__dots',
          customPaging: function() {
            return dot;
          }
        });
      }

    // buildSlidersFunctions.push(buildReviewsSlider);
    windowFuncs.resize.push(buildHeroSlider);
  }


  if (reviewsSlider && reviewsSlides.length && reviewsSlides.length > 1) {
    let $reviewsSlider = $(reviewsSlider),
      counterCurrentSlide = q(counterCurrentSelector, reviewsSlider),
      counterTotalSlides = q(counterTotalSelector, reviewsSlider),
      buildReviewsSlider = function() {
        // если ширина экрана больше 576px и слайдов меньше 3, то слайдера не будет
        // показываем по 2 слайда
        if (matchesMedia(mw576) && reviewsSlides.length < 3) {
          if (hasSlickClass($reviewsSlider)) {
            unslick($reviewsSlider);
          }
          // если ширина экрана больше 1024px и слайдов меньше 5, то слайдера не будет
          // показываем по 4 слайда
        } else if (matchesMedia(mw767) && reviewsSlides.length < 3) {
          if (hasSlickClass($reviewsSlider)) {
            unslick($reviewsSlider);
          }
          // в других случаях делаем слайдер
        } else if (matchesMedia(mw1440) && reviewsSlides.length < 4) {
          if (hasSlickClass($reviewsSlider)) {
            unslick($reviewsSlider);
          }
          // в других случаях делаем слайдер
        } else {
          if (hasSlickClass($reviewsSlider)) {
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

          if (matchesMedia(mw1440)) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia(mw576)) {
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

    // buildSlidersFunctions.push(buildReviewsSlider);
    windowFuncs.resize.push(buildReviewsSlider);
  }

  if (casesSlider && casesSlides.length && casesSlides.length > 1) {
    let $casesSlider = $(casesSlider),
      casesSliderParent = casesSlider.parentElement,
      counterCurrentSlide = q(counterCurrentSelector, casesSliderParent),
      counterTotalSlides = q(counterTotalSelector, casesSliderParent),
      buildCasesSlider = function() {
        if (matchesMedia(mw576)) {
          if (hasSlickClass($casesSlider)) {
            unslick($casesSlider);
          }
        } else {
          if (hasSlickClass($casesSlider)) {
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

    // buildSlidersFunctions.push(buildCasesSlider);
    windowFuncs.resize.push(buildCasesSlider);
  }

  if (stagesSlider && stagesSlides.length && stagesSlides.length > 1) {
    let $stagesSlider = $(stagesSlider),
      counterCurrentSlide = q(counterCurrentSelector, stagesSlider),
      counterTotalSlides = q(counterTotalSelector, stagesSlider),
      buildStagesSlider = function() {
        if (hasSlickClass($stagesSlider)) {
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

    // buildSlidersFunctions.push(buildStagesSlider);
    windowFuncs.resize.push(buildStagesSlider);
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
        if (matchesMedia(mw576) && featuresSlides.length < 3) {
          if (hasSlickClass($featuresSlider)) {
            unslick($featuresSlider);
          }
          // если ширина экрана больше 1024px и слайдов меньше 5, то слайдера не будет
          // показываем по 4 слайда
        } else if (matchesMedia(mw1440) && featuresSlides.length < 4) {
          if (hasSlickClass($featuresSlider)) {
            unslick($featuresSlider);
          }
          // в других случаях делаем слайдер
        } else {
          if (hasSlickClass($featuresSlider)) {
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

          if (matchesMedia(mw1440)) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia(mw576)) {
            counterTotal--;;
          }

          counterTotalSlides.textContent = counterTotal;

          $featuresSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    // buildSlidersFunctions.push(buildFeaturesSlider);
    windowFuncs.resize.push(buildFeaturesSlider);
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
          draggable: false
        });

        counterTotalSlides.textContent = counterTotal;

        $houseSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
          let houseNavSlidesNextEl = houseSlidesNav[nextSlide];

          counterCurrentSlide.textContent = nextSlide + 1;
          for (var i = houseSlidesNav.length - 1; i >= 0; i--) {
            houseSlidesNav[i].classList.remove('active');
          }

          houseNavSlidesNextEl.classList.add('active');

          let activeSlides = qa('.slick-active', houseSliderNav),
            activeSlideLeft = false; // Активный слайд ушел из области просмотра (4 слайда)

          for (var i = activeSlides.length - 1; i >= 0; i--) {
            if (activeSlides[i] === houseNavSlidesNextEl) {
              activeSlideLeft = false;
              break;
            }
            activeSlideLeft = true;
          }

          if (activeSlideLeft) {
            if (currentSlide < nextSlide) {
              $houseSliderNav.slick('slickNext');
            } else {
              $houseSliderNav.slick('slickPrev');
            }
          }
        });

        houseSlidesNav[0].classList.add('active');

        houseSliderNav.addEventListener('click', function() {
          let target = event.target,
            tragetIndex = houseSlidesNav.indexOf(target);

          $houseSlider.slick('slickGoTo', tragetIndex);

        });
      },
      buildNavSlider = function() {
        $houseSliderNav.slick({
          arrows: false,
          infinite: false,
          slidesToShow: 4,
          slidesToScroll: 4
        });
      };


    // buildSlidersFunctions.push(buildHousesSlider, buildNavSlider);
    windowFuncs.resize.push(buildHousesSlider, buildNavSlider);
  }

  if (featsSlider) {
    let $featsSlider = $(featsSlider),
      counterCurrentSlide = q(counterCurrentSelector, featsSlider),
      counterTotalSlides = q(counterTotalSelector, featsSlider),
      buildFeatsSlider = function() {
        // Если размер экрана больше 768px и если есть слайдер, то уберем его
        if (matchesMedia(mw768)) {
          if (hasSlickClass($featsSlider)) {
            unslick($featsSlider);
          }
        } else {
          if (hasSlickClass($featsSlider)) {
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

          if (matchesMedia(mw1440)) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia(mw576)) {
            counterTotal--;
          }

          counterTotalSlides.textContent = counterTotal;

          $featsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    // buildSlidersFunctions.push(buildFeatsSlider);
    windowFuncs.resize.push(buildFeatsSlider);
  }

  if (teamSlider && teamSlides.length && teamSlides.length > 1) {
    let $teamSlider = $(teamSlider),
      $teamSliderParent = teamSlider.parentElement,
      counterCurrentSlide = q(counterCurrentSelector, $teamSliderParent),
      counterTotalSlides = q(counterTotalSelector, $teamSliderParent),
      buildTeamSlider = function() {
        if (matchesMedia(mw576) && teamSlides.length < 3) {
          if (hasSlickClass($teamSlider)) {
            unslick($teamSlider);
          }
        } else if (matchesMedia(mw1024) && teamSlides.length < 4) {
          if (hasSlickClass($teamSlider)) {
            unslick($teamSlider);
          }
        } else if (matchesMedia(mw1440) && teamSlides.length < 5) {
          if (hasSlickClass($teamSlider)) {
            unslick($teamSlider);
          }
        } else {
          if (hasSlickClass($teamSlider)) {
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

          if (matchesMedia(mw1440)) {
            counterTotal = counterTotal - 3;
          } else if (matchesMedia(mw1024)) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia(mw576)) {
            counterTotal--;
          }

          counterTotalSlides.textContent = counterTotal;

          $teamSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    // buildSlidersFunctions.push(buildTeamSlider);
    windowFuncs.resize.push(buildTeamSlider);
  }

  if (materialsSlider) {
    let $materialsSlider = $(materialsSlider),
      counterCurrentSlide = q(counterCurrentSelector, materialsSlider),
      counterTotalSlides = q(counterTotalSelector, materialsSlider),
      buildFeatsSlider = function() {
        if (matchesMedia(mw576)) {
          if (hasSlickClass($materialsSlider)) {
            unslick($materialsSlider);
          }
        } else {
          if (hasSlickClass($materialsSlider)) {
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

    // buildSlidersFunctions.push(buildFeatsSlider);
    windowFuncs.resize.push(buildFeatsSlider);
  }

  if (newsSlider && newsSlides.length && newsSlides.length > 1) {
    let $newsSlider = $(newsSlider),
      newsSliderParent = newsSlider.parentElement,
      counterCurrentSlide = q(counterCurrentSelector, newsSliderParent),
      counterTotalSlides = q(counterTotalSelector, newsSliderParent),
      buildTeamSlider = function() {
        if (matchesMedia(mw576) && newsSlides.length < 3) {
          if (hasSlickClass($newsSlider)) {
            unslick($newsSlider);
          }
        } else if (matchesMedia(mw1024) && newsSlides.length < 4) {
          if (hasSlickClass($newsSlider)) {
            unslick($newsSlider);
          }
        } else if (matchesMedia(mw1440) && newsSlides.length < 5) {
          if (hasSlickClass($newsSlider)) {
            unslick($newsSlider);
          }
        } else {
          if (hasSlickClass($newsSlider)) {
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

          if (matchesMedia(mw1440)) {
            counterTotal = counterTotal - 3;
          } else if (matchesMedia(mw1024)) {
            counterTotal = counterTotal - 2;
          } else if (matchesMedia(mw576)) {
            counterTotal--;
          }

          counterTotalSlides.textContent = counterTotal;

          $newsSlider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            counterCurrentSlide.textContent = nextSlide + 1;
          });
        }
      }

    // buildSlidersFunctions.push(buildTeamSlider);
    windowFuncs.resize.push(buildTeamSlider);
  }

  // if (buildSlidersFunctions.length > 0) {
  //   window.addEventListener('resize', buildSliders);
  //   buildSliders();
  // }

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