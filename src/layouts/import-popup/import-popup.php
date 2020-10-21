<!-- <div style="opacity: 1 !important; visibility: visible !important;" class="import-popup popup stage-1" id="import-popup">
  <div class="import-popup__cnt popup__cnt">
    <button type="button" class="popup__close import-popup__close close" onclick="hideImportPopup()">
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
    <form action="wp-admin/admin-ajax.php" method="POST" enctype="multipart/form-data" id="import-form-block">
      <div class="import-popup__select-block">
        <span class="import-popup__select-title">Тип записей:</span>
        <select name="post-type" id="import-select">
          <option value="projects">projects</option>
          <option value="cases">cases</option>
        </select>
      </div>
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
      importPopupForm = document.getElementById('import-form-block');

    importPopupForm.addEventListener('submit', function() {
        
    });
  });
</script> -->