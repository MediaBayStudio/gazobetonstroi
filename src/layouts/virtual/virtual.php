<?php
$sect_title = $section['sect_title'];
$paragraphs = $section['paragraphs'];
$sect_img = $section['img'];
$callback_form = $section['callback_form'];
$text_block = $section['text_block'];
$text_block_title = $text_block['title'];
$text_block_descr = $text_block['descr'];
$features = $section['features'] ?>

<section class="virtual-sect sect">
  <div class="virtual-sect__text">
    <h2 class="virtual-sect__title sect-title"><?php echo $sect_title ?></h2> <?php
    for ( $i = 0, $len = count( $paragraphs ); $i < $len; $i++ ) :
      $order_class = $paragraphs[$i + 1] ? '' : ' last' ?>
      <p class="virtual-sect__descr<?php echo $order_class ?>"><?php echo $paragraphs[$i]['p'] ?></p> <?php
    endfor ?>
  </div><img src="#" data-src="<?php echo $sect_img ?>" alt="<?php echo $sect_title ?>" class="virtual-sect__img lazy"><div class="virtual-sect__text-block">
    <b class="b"><?php echo $text_block_title ?></b>
  </div><?php
  if ( $callback_form ) {
    require 'callback.php';
  } ?>
  <div class="virtual-sect__features" id="features-slider">
    <div class="slider-nav features__nav">
      <div class="slider-nav__counter features__counter"><span class="features__counter-current">1</span>/<span class="features__counter-total">6</span></div>
    </div> <?php
    for ( $i = 0, $len = count( $features ); $i < $len; $i++ ) :
      $order_class = $features[$i + 1] ? '' : ' last' ?>
      <div class="feat">
        <img src="#" data-lazy="<?php echo $features[$i]['img'] ?>" alt="" class="feat__img">
        <strong class="feat__title"><?php echo $features[$i]['title'] ?></strong>
      </div> <?php
    endfor ?>
  </div>
</section>