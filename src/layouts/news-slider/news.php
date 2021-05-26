<?php
  $numberposts = 12;
  $count_posts = wp_count_posts()->publish;
  $posts = get_posts( [
    'numberposts' => $numberposts
  ] ) ?>
<section class="news-sect sect" id="news-sect" data-posts-count="<?php echo $count_posts ?>" data-numberposts="<?php echo $numberposts ?>" data-page-uri="<?php the_permalink( $post ) ?>"> <?php
  print_posts( $posts );
  if ( $count_posts > $numberposts ) : ?>
    <button type="button" class="news-sect__loadmore" id="loadmore-btn">
      <span class="news-sect__loadmore-text">Показать еще</span>
      <img src="#" data-src="<?php echo $template_directory ?>/img/icon-loadmore.svg" alt="#" class="news-sect__loadmore-icon lazy"></img>
    </button> <?php
  endif ?>
</section>