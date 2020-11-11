<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'] ?>

<section class="contacts-sect sect_bg lazy" data-src="linear-gradient(1deg, rgba(242, 236, 233, 0.8), rgba(242, 236, 233, 0.8)), url(<?php echo $template_directory ?>/img/contacts-bg.jpg)" data-media="">
  <?php echo do_shortcode( '[contact-form-7 id="10" html_class="contacts-form" html_id="contacts-form"]' ) ?>
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