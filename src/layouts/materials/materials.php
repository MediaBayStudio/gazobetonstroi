<?php
  $sect_title = $section['sect_title'];
  $paragraphs = $section['paragraphs'];
  $images = $section['images'] ?>

<section class="material-sect sect">
  <img src="#" data-src="<?php echo $template_directory ?>/img/materials-decor.png" alt="#" class="material-sect__decor lazy">
  <div class="material-sect__text">
    <h2 class="material-sect__title sect-title"><?php echo $sect_title ?></h2> <?php
    foreach ( $paragraphs as $p )  :?>
      <p class="material-sect__descr"><?php echo $p['p'] ?></p> <?php
    endforeach ?>
  </div>
  <div class="material-sect__images" id="materials-slider"> <?php
    foreach ( $images as $img ) : ?>
      <figure class="material-sect__figure">
        <img src="#" data-src="<?php echo $img['img'] ?>" alt="<?php echo $img['text'] ?>" class="material-sect__img lazy">
        <figcaption class="material-sect__figcaption"><?php echo $img['text'] ?></figcaption>
      </figure> <?php
    endforeach ?>
    <div class="slider-nav material-sect__nav">
      <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
    </div>
  </div>
</section>