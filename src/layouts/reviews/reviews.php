<?php
$sect_title = $section['sect_title'];
$reviews = $section['reviews'];
$data_src = '';
$data_media = ''; ?>

<section class="reviews-sect container lazy" data-src="<?php echo $data_src ?>" data-media="<?php echo $data_media ?>">
  <h1 class="reviews-sect__title"><?php echo $sect_title ?></h1>
  <div class="reviews"> <?php
    foreach ( $reviews as $review ) :
      $current_review = $review['review'] ?>
      <div class="review">
        <div class="review__hdr">
          <span class="review__title"><?php echo $current_review['title'] ?></span>
          <span class="review__subtitle"><?php echo $current_review['subtitle'] ?></span>
        </div>
        <p class="review__descr"><?php echo $current_review['descr'] ?></p>
      </div> <?php

    endforeach ?>
  </div>
</section>