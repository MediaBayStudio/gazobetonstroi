<style>
  .close {
    width: 17.5px;
    height: 17.5px;
    padding: 2.5px;
    transition: color .4s;
    stroke: #fff;
    border: 0;
    background: 0 0;
  }

  .close:active {
    transform: scale(.95);
  }

  .close__svg {
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  .popup {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 20px 20px 40px;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.75);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.5s, visibility 0.5s;
    overflow: auto;
    z-index: 5;
  }
.popup.active {
  opacity: 1;
  visibility: visible;
}
.popup__cnt {
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  color: #000;
  text-align: center;
  position: relative;
}
.popup__close {
  top: -25px;
  right: -15px;
  position: absolute;
}
.popup__title {
  margin: 0 0 15px;
  display: block;
  font: bold 18px/140% Montserrat;
  color: #87a731;
}
.popup__descr {
  font: 16px/140% Montserrat;
}

  .import-popup {
  z-index: 3;
}
.import-popup__cnt .btn {
  margin: 25px auto 0;
  display: flex;
  justify-content: center;
  padding: 12px 12px;
  min-width: 185px;
  min-height: 42px;
  font: bold 16px/140% Montserrat;
  border-radius: 5px;
  transition: background .5s, color .5s;
  background: rgb(135, 167, 49);
  border: 0;
  cursor: pointer;
}

.import-popup__cnt .btn.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.import-popup__cnt .btn:active {
  transform: scale(0.95);
}
.import-popup__notice {
  display: none;
}
.import-popup__list {
  font: 16px/140% Montserrat;
}
.import-popup__list-item {
  margin: 0 0 5px;
}
.import-popup__select-block {
  margin: 0 auto 20px;
  width: 270px;
  text-align: left;
  font: 16px/140% Montserrat;
}
.import-popup__check {
  margin: 0 auto 20px;
}
.import-stage-2 {
  display: none;
}
#import-form-block {
  margin-top: 30px;
  display: flex;
  flex-flow: column;
  align-items: center;
}
#import-select {
  width: 100%;
  appearance: none;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
  display: block;
  margin-top: 5px;
}
.import-popup .result {
  margin-top: 5px;
}
.import-popup .result p {
  margin: 0 0 3px;
}
@media  (min-width:767.98px) {
  .import-popup__cnt {
    padding: 50px;
  }
}
</style>
<div class="import-popup popup stage-1" id="import-popup">
  <div class="import-popup__cnt popup__cnt">
    <button type="button" class="popup__close import-popup__close close">
      <svg class="close__svg" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="inherit" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.6777 1.99994L2 19.6776" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.00006 2.00006L19.6777 19.6777" stroke="inherit" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <span class="popup__descr import-popup__notice">При загрузке произошел сбой. Удалось загрузить <span></span> шт. </span>
    <div class="import-stage-1">
      <span class="popup__title">Импортирование проектов</span>
      <p class="popup__descr">Загрузите файл с базой данных в формате .csv</p>
    </div>
    <div class="import-stage-2">
      <span class="popup__title">Импорт прошел удачно</span>
      <p class="popup__descr">Импортированно: <span class="import-popup__count"></span> шт.</p>
      <div class="import-popup__list">
        <span class="import-popup__list-title">Список товаров:</span>
        <ul class="import-popup__list-inner">
          <li class="import-popup__list-item"></li>
        </ul>
      </div>
    </div>
    <form action="<?php echo site_url() ?>/wp-admin/admin-ajax.php" method="POST" enctype="multipart/form-data" id="import-form-block">
      <div class="import-popup__select-block">
        <span class="import-popup__select-title">Тип записей:</span>
        <select name="post-type" id="import-select">
          <option value="projects">projects</option>
          <option value="cases">cases</option>
        </select>
      </div>
      <label class="import-popup__check check check_fill">
        <input type="checkbox" name="refresh" class="check__inp" checked>
        <span class="check__text">Обновлять существующие (дольше)</span>
      </label>
      <input type="file" name="csv" id="csv-inp">
      <button class="btn btn_green" id="import-btn">Отправить</button>
      <div class="result"></div>
    </form>
    <div class="loader">
      <div class="loader__inner"></div>
    </div>
  </div>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    let importPopup = document.getElementById('import-popup'),
      importPopupForm = document.getElementById('import-form-block'),
      importPopupOpenBtn = document.getElementById('wp-admin-bar-import-btn'),
      importPopupCloseBtn = document.querySelector('.import-popup__close'),
      result = importPopup.querySelector('.result'),
      startImportBtn = importPopup.querySelector('#import-btn'),
      numberposts = 20,
      // numberposts = -1,
      offset = 0,
      max = -1,
      loadPosts = function() {
        if (max !== -1 && offset >= max) {
          console.log('Преравно');
          return;
        }
        console.log('Загружаю...');
        result.insertAdjacentHTML('beforeend', '<p>Начинается загрузка...</p>');
        startImportBtn.classList.add('disabled');
        let xhr = new XMLHttpRequest(),
          data = new FormData(importPopupForm),
          totalPosts,
          updatedPosts,
          uploadedPosts;

        data.append('action', 'import');
        data.append('numberposts', numberposts);
        data.append('offset', offset);
        data.append('max', max);

                xhr.open(importPopupForm.method, importPopupForm.action);
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // console.log(xhr.response);
            // return;
            let response = JSON.parse(xhr.response);

            if (!totalPosts) {
              totalPosts = response.total;
              console.log('Всего записей: ' + totalPosts);
              result.insertAdjacentHTML('beforeend', '<p>Необходимо загрузить: ' + totalPosts + '</p>');
            }

            updatedPosts = response.updated;
            uploadedPosts = response.uploaded;

            console.log('Загружено: ' + uploadedPosts.length, uploadedPosts);
            console.log('Обновлено: ' + updatedPosts.length, updatedPosts);

            result.insertAdjacentHTML('beforeend', '<p>Загружено: ' + uploadedPosts.length + '</p>');
            result.insertAdjacentHTML('beforeend', '<p>Обновлено: ' + updatedPosts.length + '</p>');

            if (uploadedPosts.length + updatedPosts.length < totalPosts) {
              // console.log('стоп');
              console.log('Загружаю еще...');
              result.insertAdjacentHTML('beforeend', '<p>Загружаю еще...</p>');
              offset += numberposts;
              loadPosts();
            } else {
              startImportBtn.classList.remove('disabled');
              console.log('Загрузка завершена');
              result.insertAdjacentHTML('beforeend', '<p>Загрузка завершена</p>');
            }
          }
        });
      }

    // importPopup = new Popup('#import-popup', {
    //   closeButtons: '.import-popup__close',
    //   openButtons: '#wp-admin-bar-import-btn'
    // });

    importPopupOpenBtn.addEventListener('click', function() {
      importPopup.classList.add('active');
    });

    importPopupCloseBtn.addEventListener('click', function() {
      importPopup.classList.remove('active');
    });

    importPopupForm.addEventListener('submit', function() {
      event.preventDefault();
      loadPosts();
    });
  });
</script>