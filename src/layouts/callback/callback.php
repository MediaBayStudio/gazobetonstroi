<div class="callback-form-wrap lazy" data-src="url(<?php echo $template_directory ?>/img/callback-form-img.png)">
  <form action="" class="callback-form">
    <h3 class="callback-form__title">Запишитесь на просмотр проектов в шлеме виртуальной реальности.</h2>
    <label class="field callback-form__field callback-form__field_name">
      <input type="text" name="name" class="field__inp">
      <span class="field__text">Имя</span>
    </label>
    <label class="field callback-form__field callback-form__field_tel">
      <input type="text" name="tel" class="field__inp">
      <span class="field__text">Телефон</span>
    </label>
    <label class="field callback-form__field callback-form__field_email">
      <input type="text" name="email" class="field__inp">
      <span class="field__text">E-mail</span>
    </label>
    <div class="callback-form__bottom">
      <label class="check form__check">
        <input type="checkbox" name="policy" value="Я соглашаюсь с условиями  Политики конфиденциальности" class="check__inp" checked>
        <span class="check__checkbox"></span>
        <span class="check__text">Я принимаю условия <a href="policy.pdf" class="check__link text_underline" target="_blank" title="Посмотреть политику конфиденциальности"> политики конфиденциальности</a></span>
      </label>
      <button class="callback-form__btn btn btn_green btn_text-black">Зписаться</button>
    </div>
  </form>
</div>
