<div style="" class="import-popup popup stage-1" id="import-popup">
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
      numberposts = 20,
      offset = 0,
      max = -1,
      loadPosts = function() {
        if (max !== -1 && offset >= max) {
          console.log('Преравно');
          return;
        }
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
            }

            updatedPosts = response.updated;
            uploadedPosts = response.uploaded;

            console.log('Загружено: ' + uploadedPosts.length, uploadedPosts);
            console.log('Обновлено: ' + updatedPosts.length, updatedPosts);

            if (uploadedPosts.length + updatedPosts.length < totalPosts) {
              console.log('Загружаю еще...');
              offset += numberposts;
              loadPosts();
            } else {
              console.log('Загрузка завершена');
            }
          }
        });
      }

    importPopup = new Popup('#import-popup', {
      closeButtons: '.import-popup__close',
      openButtons: '#wp-admin-bar-import-btn'
    });

    importPopupForm.addEventListener('submit', function() {
      event.preventDefault();
      loadPosts();
    });
  });
</script>