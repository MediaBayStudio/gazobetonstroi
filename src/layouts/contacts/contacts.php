<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'] ?>

<section class="contacts-sect sect lazy" data-src="" data-media="">
  <form action="#" class="contacts-form" id="contacts-form">
    <h2 class="contacts-sect__title sect-title"><?php echo $sect_title ?></h2>
    <p class="contacts-sect__descr sect-descr"><?php echo $sect_descr ?></p>
    <label class="field contacts-form__field contacts-form__field_name">
      <input type="text" name="user-name" class="field__inp">
      <span class="field__text">Имя</span>
    </label>
    <label class="field contacts-form__field contacts-form__field_tel">
      <input type="text" name="user-tel" class="field__inp">
      <span class="field__text">Телефон</span>
    </label>
    <label class="field contacts-form__field contacts-form__field_email">
      <input type="text" name="user-email" class="field__inp">
      <span class="field__text">E-mail</span>
    </label>
    <label class="field contacts-form__field">
      <textarea type="text" name="user-msg" class="field__textarea"></textarea>
      <span class="field__text">Напишите вопрос...</span>
    </label>
    <div class="contacts-form__files-upload-block">
      <label class="fileupload">
        <input type="file" multiple accept="image/*" class="fileupload__inp">
        <span class="fileupload__label">
          <span class="fileupload__text text_underline">Прикрепить файл</span>
          <img src="<?php echo $template_directory ?>/img/icon-paper-clip.svg" alt="Иконка" class="fileupload__icon">
        </span>
      </label>
      <div class="uploadedfiles">
        <span class="uploadedfiles__file">
          <span class="uploadedfiles__file-text">файл.jpg</span>
          <span class="uploadedfiles__file-icon">x</span>
        </span>
      </div>
    </div>
    <div class="contacts-form__bottom">
      <label class="check">
        <input type="checkbox" name="policy" value="Я соглашаюсь с условиями  Политики конфиденциальности" class="check__inp" checked>
        <span class="check__pseudo-inp"></span>
        <span class="check__text">Я принимаю условия <a href="policy.pdf" class="check__link text_underline" target="_blank" title="Посмотреть политику конфиденциальности"> политики конфиденциальности</a></span>
      </label>
      <button class="contacts-form__btn btn btn_green btn_text-black">Отправить</button>
    </div>
  </form>
  <div class="contacts-sect__contacts">
    <h2 class="contacts-sect__title sect-title">Контакты</h2> <?php
    if ( $address ) : ?>
      <div class="contacts-sect__contact address">
        <img src="<?php echo $template_directory . '/img/icon-geo.svg' ?>" alt="Иконка" class="contacts-sect__contact-icon">
        <span class="contacts-sect__contact-text"><?php echo $address ?></span>
      </div> <?php
    endif;
    if ( $tel_1 ) : ?>
      <div class="contacts-sect__contact tel">
        <img src="<?php echo $template_directory . '/img/icon-tel.svg' ?>" alt="Иконка" class="contacts-sect__contact-icon">
        <a href="tel:<?php echo $tel_1_dry ?>" class="contacts-sect__contact-text"><?php echo $tel_1 ?></a>
      </div> <?php
    endif;
    if ( $tel_2 ) : ?>
      <div class="contacts-sect__contact tel">
        <img src="<?php echo $template_directory . '/img/icon-tel.svg' ?>" alt="Иконка" class="contacts-sect__contact-icon">
        <a href="tel:<?php echo $tel_2_dry ?>" class="contacts-sect__contact-text"><?php echo $tel_2 ?></a>
      </div> <?php
    endif;
    if ( $tel_3 ) : ?>
      <div class="contacts-sect__contact tel">
        <img src="<?php echo $template_directory . '/img/icon-tel.svg' ?>" alt="Иконка" class="contacts-sect__contact-icon">
        <a href="tel:<?php echo $tel_3_dry ?>" class="contacts-sect__contact-text"><?php echo $tel_3 ?></a>
      </div> <?php
    endif;
    if ( $email ) : ?>
      <div class="contacts-sect__contact email">
        <img src="<?php echo $template_directory . '/img/icon-email.svg' ?>" alt="Иконка" class="contacts-sect__contact-icon">
        <a href="mailto:<?php echo $email ?>" class="contacts-sect__contact-text"><?php echo $email ?></a>
      </div> <?php
    endif;
    if ( $insta ) : ?>
      <div class="contacts-sect__link insta">
        <a href="<?php echo $insta ?>" rel="noopener noreferrer nofollow" target="_blank" class="insta__link">
          <svg class="insta__icon">
            <use xlink:href="<?php echo $template_directory ?>/img/icons-sprite.svg#insta"></use>
          </svg>
        </a>
      </div> <?php 
    endif ?>
  </div>
</section>