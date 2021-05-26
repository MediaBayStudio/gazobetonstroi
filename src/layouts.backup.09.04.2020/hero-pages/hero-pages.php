<?php
  $sect_title = $section['sect_title'];
  $paragraphs = $section['paragraphs'];
  $sect_img = $section['sect_img'];
  $features = $section['features'];
  $sect_decor = $section['sect_decor'] ?>

<section class="hero-page-sect container">
  <h1 class="hero-page-sect__title"><?php echo $sect_title ?></h1>
  <div class="hero-page-sect__text"> <?php
    foreach ( $paragraphs as $p ) : ?>
      <p class="hero-page-sect__descr"><?php echo $p['p'] ?></p> <?php
    endforeach ?>
  </div> <?php
  if ( $sect_img ) : ?>
    <div class="hero-page-sect__figure"> <?php
    if ( $sect_decor ) : ?>
      <img src="#" data-src="<?php echo $template_directory ?>/img/about-decor-img.png" alt="" class="hero-page-sect__decor lazy"> <?php
    endif;
    $is_gallery = is_array( $sect_img );
    if ( $is_gallery && count( $sect_img ) > 1 ) :
      foreach ( $sect_img as $img ) : ?>
        <img src="<?php echo $img ?>" alt="" class="hero-page-sect__img"> <?php
      endforeach ?>
      <div class="slider-nav hero-page-sect__figure-nav">
        <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
      </div> <?php
    else :
      $sect_img = $is_gallery ? $sect_img[0] : $sect_img ?>
      <img src="#" data-src="<?php echo $sect_img ?>" alt="" class="hero-page-sect__img lazy"> <?php
    endif ?>
    </div> <?php
  endif ?>
</section> <?php
if ( $features ) : ?>
  <div class="hero-page-sect__features container" id="feats-slider"><?php
    foreach ($features as $feat) : ?><div class="feat">
        <span class="feat__title"><?php echo $feat['title'] ?></span>
        <p class="feat__descr"><?php echo $feat['descr'] ?></p>
      </div><?php
    endforeach ?>
    <div class="slider-nav hero-page-sect__nav">
      <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
    </div>
  </div> <?php
endif ?>