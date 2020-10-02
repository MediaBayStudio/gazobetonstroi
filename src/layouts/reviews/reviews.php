<?php
$sect_title = $section['sect_title'];
$reviews = $section['reviews'];
$data_src = '';
$data_media = ''; ?>

<section class="reviews-sect sect lazy" id="reviews-slider" data-src="<?php echo $data_src ?>" data-media="<?php echo $data_media ?>">
  <h1 class="reviews-sect__title sect-title"><?php echo $sect_title ?></h1>
  <div class="slider-nav reviews-sect__nav">
    <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
  </div> <?php
  for ( $i = 0, $len = count( $reviews ); $i < $len; $i++ ) :
    $order_class = $reviews[$i + 1] ? '' : ' last' ?><div class="review<?php echo $order_class ?>">
      <div class="review__hdr">
        <h3 class="review__title"><?php echo $reviews[$i]['name'] ?></h3>
        <span class="review__subtitle"><?php echo $reviews[$i]['project'] ?></span>
      </div>
      <p class="review__descr"><?php echo $reviews[$i]['descr'] ?></p>
    </div><?php
  endfor ?>
</section>