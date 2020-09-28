<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'] ?>

<section class="contacts-sect sect lazy" data-src="" data-media="">
  <?php echo do_shortcode( '[contact-form-7 id="10" html_class="contacts-form" html_id="contacts-form"]' ) ?>
  <!-- <form action="<?php #echo $template_directory ?>/single.php" method="POST" class="contacts-form" id="contacts-form"> -->
    <!-- <h2 class="contacts-sect__title sect-title"><?php #echo $sect_title ?></h2>
    <p class="contacts-sect__descr sect-descr"><?php #echo $sect_descr ?></p>
    <label class="field contacts-form__field contacts-form__field_name">
      <input type="text" name="name" class="field__inp">
      <span class="field__text">Имя</span>
    </label>
    <label class="field contacts-form__field contacts-form__field_tel">
      <input type="text" name="tel" class="field__inp">
      <span class="field__text">Телефон</span>
    </label>
    <label class="field contacts-form__field contacts-form__field_email">
      <input type="text" name="email" class="field__inp">
      <span class="field__text">E-mail</span>
    </label>
    <label class="field contacts-form__field contacts-form__field_msg">
      <textarea type="text" name="msg" class="field__textarea"></textarea>
      <span class="field__text">Напишите вопрос...</span>
    </label>
    <div class="contacts-form__files-upload-block">
      <label class="fileupload">
        <input type="file" name="file[]" id="files-input" multiple accept="image/*" class="fileupload__inp">
        <span class="fileupload__label">
          <span class="fileupload__text text_underline">Прикрепить файл</span>
          <img src="<?php #echo $template_directory ?>/img/icon-paper-clip.svg" alt="Иконка" class="fileupload__icon">
        </span>
      </label>
      <div class="uploadedfiles" id="uploadedfiles"></div>
    </div>
    <div class="contacts-form__bottom">
      <label class="check">
        <input type="checkbox" name="policy" value="Я соглашаюсь с условиями  Политики конфиденциальности" class="check__inp" checked>
        <span class="check__pseudo-inp"></span>
        <span class="check__text">Я принимаю условия <a href="policy.pdf" class="check__link text_underline" target="_blank" title="Посмотреть политику конфиденциальности"> политики конфиденциальности</a></span>
      </label>
      <button class="contacts-form__btn btn btn_green btn_text-black">Отправить</button>
    </div> -->
  <!-- </form> -->
  <div class="contacts-sect__contacts">
    <h2 class="contacts-sect__title sect-title">Контакты</h2>
    <!-- <div class="contacts-sect__contacts-wrap"> --> <?php
      if ( $address ) : ?>
        <div class="contacts-block contacts-block_geo">
          <img src="<?php echo $template_directory . '/img/icon-geo.svg' ?>" alt="Иконка" class="contacts-block__img">
          <span class="contacts-block__text"><?php echo $address ?></span>
        </div> <?php
      endif;
      if ( $email ) : ?>
        <div class="contacts-block contacts-block_email">
          <img src="<?php echo $template_directory . '/img/icon-email.svg' ?>" alt="Иконка" class="contacts-block__img">
          <a href="mailto:<?php echo $email ?>" class="contacts-block__text"><?php echo $email ?></a>
        </div> <?php
      endif;
      if ( $tel_1 ) : ?>
        <div class="contacts-block">
          <img src="<?php echo $template_directory . '/img/icon-tel.svg' ?>" alt="Иконка" class="contacts-block__img">
          <a href="tel:<?php echo $tel_1_dry ?>" class="contacts-block__text"><?php echo $tel_1 ?></a>
        </div> <?php
      endif;
      if ( $tel_2 ) : ?>
        <div class="contacts-block">
          <img src="<?php echo $template_directory . '/img/icon-tel.svg' ?>" alt="Иконка" class="contacts-block__img">
          <a href="tel:<?php echo $tel_2_dry ?>" class="contacts-block__text"><?php echo $tel_2 ?></a>
        </div> <?php
      endif;
      if ( $tel_3 ) : ?>
        <div class="contacts-block">
          <img src="<?php echo $template_directory . '/img/icon-tel.svg' ?>" alt="Иконка" class="contacts-block__img">
          <a href="tel:<?php echo $tel_3_dry ?>" class="contacts-block__text"><?php echo $tel_3 ?></a>
        </div> <?php
      endif;
      if ( $insta ) : ?>
        <div class="contacts-block contacts-block_insta">
          <img src="<?php echo $template_directory . '/img/icon-insta.svg' ?>" alt="Иконка" class="contacts-block__img">
          <a href="tel:<?php echo $insta ?>" class="contacts-block__text">Мы в Instagram</a>
        </div> <?php 
      endif ?>
    <!-- </div> -->
  </div>
</section>