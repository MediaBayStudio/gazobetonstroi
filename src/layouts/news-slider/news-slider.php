<?php
  $sect_title = $section['sect_title'];
  $last_news = $section['last_news'];
  $other_news = $section['other_news'];
  if ( $last_news ) {
    $numberposts = -1;
    $orderby = 'date';
    $block_id = ' id="news-slider"';
    $sect_id = ' id="news-slider-sect"';
  } else if ( $other_news ) {
    $numberposts = 4;
    $orderby = 'rand';
    $block_id = '';
    $sect_id = '';
  }
  $posts = get_posts( [
    'numberposts' => $numberposts,
    'orderby' => $orderby
  ] );

if ( $posts ) : ?>
  <section class="news-slider sect"<?php echo $sect_id ?>>
    <h2 class="news-slider__title sect-title"><?php echo $sect_title ?></h2>
    <div class="news-slider__posts"<?php echo $block_id ?>> <?php
      print_posts( $posts ) ?>
    </div> <?php
    if ( $last_news ) : ?>
      <div class="slider-nav news-slider__nav">
        <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
      </div> <?php
    elseif ( $other_news ) : ?>
      <a href="/news/" class="news-slider__link text_underline">Все новости</a> <?php
    endif;
    unset( $numberposts );
    unset( $orderby );
    unset( $block_id );
    unset( $sect_id );
    wp_reset_postdata() ?>
  </section> <?php
endif ?>