;
(function() {
  let detailsBtnsblock = id('details-btns'),
    detailsTextBlock = id('details-text');

  if (detailsBtnsblock) {

    let tabsContents = detailsTextBlock.children,
      tabs = detailsBtnsblock.children,
      tabFocus = 0,
      changeTabs = function(event) {
        let target = event.target,
          parent = target.parentNode,
          grandparent = parent.parentNode,
          tabContent = q('#' + target.getAttribute('aria-controls'), grandparent.parentNode);


        // Убираем выделение с кнопок
        qa('[aria-selected="true"]', parent, true)
          .forEach(function(el) {
            el.setAttribute('aria-selected', false);
            el.classList.remove('is-active');
          });

        // Скрываем все тексты
        qa('[role="tabpanel"]', grandparent, true)
          .forEach(function(el) {
            el.setAttribute('aria-hidden', true);
            el.classList.remove('is-active');
          });

        // Делаем активной текущую кнопку-таб
        target.setAttribute('aria-selected', true);
        target.classList.add('is-active');

        // Показываем контент переключателя
        tabContent.removeAttribute('aria-hidden');
        tabContent.classList.add('is-active');

        // Устанавливаем фокус
        for (let i = tabs.length - 1; i >= 0; i--) {
          if (tabs[i] === target) {
            tabFocus = i;
            break;
          }
        }
      }

    detailsBtnsblock.addEventListener('click', changeTabs);



    detailsBtnsblock.addEventListener('keydown', function(event) {
      // Двигаемся вправо
      if (event.keyCode === 39 || event.keyCode === 37) {
        tabs[tabFocus].setAttribute('tabindex', -1);
        if (event.keyCode === 39) {
          tabFocus++;
          // Если дошли до конца, то начинаем сначала
          if (tabFocus >= tabs.length) {
            tabFocus = 0;
          }
          // Двигаемся влево
        } else if (event.keyCode === 37) {
          tabFocus--;
          // Если дошли до конца, то начинаем сначала
          if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
          }
        }

        tabs[tabFocus].setAttribute('tabindex', 0);
        tabs[tabFocus].focus();
      }
    });

  }


})();