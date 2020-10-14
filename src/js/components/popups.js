(function() {
  thanksPopup = new Popup('.thanks-popup', {
    closeButtons: '.thanks-popup__close'
  });

  thanksPopup.addEventListener('popupbeforeopen', function() {
    clearTimeout(thanksPopupTimer);
  });

// Закрытие всех попапов вместе с закрытием окна спасибо
  // thanksPopup.addEventListener('popupbeforeclose', function() {
  //   let otherPopups = [callbackPopup, orderPopup];

  //   for (let i = 0; i < otherPopups.length; i++) {
  //     if (otherPopups[i].classList.contains('active')) {
  //       otherPopups[i].closePopup();
  //     }
  //   }
  // });

  zoomPopup = new Popup('.zoom-popup', {
    closeButtons: '.zoom-popup__close',
    openButtons: '.house-slider__img'
  });

  zoomPopup.addEventListener('popupbeforeopen', function() {
    let closeBtn = q('.zoom-popup__close', zoomPopup),
      cnt = q('.zoom-popup__cnt', zoomPopup);

    q('.zoom-popup__img', zoomPopup).src = zoomPopup.caller.src;

    closeBtn.style.top = cnt.getBoundingClientRect().top - closeBtn.offsetHeight - 7.5 + 'px';
    if (matchesMedia('(min-width:1023.98px)')) {
      closeBtn.style.left = cnt.getBoundingClientRect().right - (closeBtn.offsetWidth / 2) + 'px';
    }


  });

})()