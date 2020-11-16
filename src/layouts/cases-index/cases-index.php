<?php 
  $sect_title = $section['sect_title'];
  $sect_link = $section['link'];
  $orderby = $section['houses_sort'];
  $posts_count = $section['posts_count'];
  $houses = $section['houses'];
  $post_type = 'projects';

  if ( $orderby === 'manual' ) {
    $posts = $houses;
  } else {
    $posts = get_posts( [
      'post_type' => $post_type,
      'numberposts' => $posts_count,
      'orderby' => $orderby
    ] );
  } ?>
<section class="cases-sect sect">
  <h2 class="cases-sect__title sect-title"><?php echo $sect_title ?></h2>
  <a href="<?php echo $sect_link['url'] ?>" class="cases-sect__link link">
    <span class="link__text"><?php echo $sect_link['title'] ?></span>
    <svg class="link__arrow" width="17" height="8" viewBox="0 0 17 8" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <use xlink:href="<?php echo $template_directory ?>/img/icon-arrow.svg#icon"></use>
    </svg>
  </a>
  <div class="cases-sect__cases" id="cases"> <?php
    foreach ( $posts as $post ) :
      setup_postdata( $post );
      $post_cat = get_the_terms( get_the_ID(), 'house_properties' );
      $post_title = ($post_type === 'projects' ? 'Проект ' : '') . $post->post_title ?><div class="house cases-sect__house">
        <a href="<?php the_permalink() ?>" class="house__link">
          <strong class="house__title"><?php echo $post_title ?></strong>
          <span class="house__descr have-rows"> <?php

          $parent_categories_ids = [];
          $categories_values = [];

            foreach ( $post_cat as $cat ) :
              if ( $cat->parent ) {
                $parent_categories_ids[] = $cat->parent;
                $categories_values[] = $cat->name;
              }
            endforeach;

            $categories_parents = get_categories( [
              'taxonomy' => 'house_properties',
              'include' => $parent_categories_ids,
              'orderby' => 'include'
            ] );

            for ( $i = 0, $len = count( $categories_parents ); $i < $len; $i++ ) :
              $show_in_card = get_field( 'show_in_card', $categories_parents[$i] );

              if ( $show_in_card ) :
                $col_class = $categories_parents[$i]->slug;
                $left_col = get_field( 'title_in_card', $categories_parents[$i] );
                $right_col = $categories_values[$i];

                if ( $left_col === 'Площадь' ) {
                  $right_col = get_field( 'house_fields' )['area'] . 'м<sup>2</sup>';
                } ?>
                <span class="house__row <?php echo $col_class ?>">
                  <span class="house__left-col"><?php echo $left_col ?></span>
                  <span class="house__right-col"><?php echo $right_col ?></span>
                </span> <?php
              endif;
            endfor ?>
          </span>
        </a>
        <a href="<?php the_permalink() ?>">
          <img src="#" data-src="<?php the_post_thumbnail_url() ?>" alt="<?php echo $post_title ?>" class="house__img lazy">
        </a>
      </div><?php
    endforeach;
    wp_reset_postdata() ?>
  </div>
  <div class="slider-nav cases__nav">
    <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
  </div>
</section>