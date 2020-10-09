<?php
add_action( 'wp_ajax_nopriv_print_houses', 'print_houses' ); 
add_action( 'wp_ajax_print_houses', 'print_houses' );

function print_houses( $posts=null, $section_class='', $numberposts=null, $count_posts=null ) {
  global $post;

  if ( $_POST && $_POST['action'] === 'print_houses' ) {
    $section_class = 'houses';

    $filter = [];
    $post_filter = $_POST['filter'];
    $numberposts = $_POST['numberposts'];
    $post_type = $_POST['post_type'];
    $count_posts = 0;

    if ( $post_filter ) {
      $filter = [ [
        'taxonomy' => 'house_properties',
        'operator' => 'AND',
        'terms' => explode( ',', $post_filter )
      ] ];
      $loadmore_data_filter = ' data-filter="' . $post_filter . '"';
    } else {
      foreach ( $_POST as $cat_slug => $cat_id ) {
        switch ( $cat_slug ) {
          case 'action':
          case 'numberposts':
          case 'offset':
          case 'post_type':
            continue;
            break;
          default:
            if ( is_array( $cat_id ) ) {
              foreach ( $cat_id as $id ) {
                $filter[] = $id;
                $count_posts += (int)get_term_by( 'id', $id, 'house_properties' )->count;
              }
            } else {
              $filter[] = $cat_id;
            }
            break;
        } // end switch case
      } // end foreach
    }

    if ( empty( $filter ) ) {
      $filter = '';
      $loadmore_data_filter = '';
      $count_posts = wp_count_posts( $post_type )->publish;
    } else {
      if ( !$post_filter ) {
        $loadmore_data_filter = ' data-filter="' . implode( ',', $filter ) . '"';
        $filter = [ [
          'taxonomy' => 'house_properties',
          'operator' => 'AND',
          'terms' => $filter
        ] ];
        var_dump( $count_posts );
      }
    }

    $posts = get_posts( [
      'post_type' => $post_type,
      'numberposts' => $numberposts,
      'offset' => $_POST['offset'],
      'tax_query' => $filter
    ] );
  }

  if ( $section_class ) {
    $section_class = ' ' . $section_class . '__house';
  }

  foreach ( $posts as $post ) :
    setup_postdata( $post );
    $post_cat = get_the_terms( $post->ID, 'house_properties' );
    $post_title = $post->post_title ?><div class="house<?php echo $section_class ?>">
      <a href="<?php the_permalink() ?>" class="house__link">
        <strong class="house__title"><?php echo $post_title ?></strong>
        <span class="house__descr"> <?php

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
        <img src="<?php the_post_thumbnail_url() ?>" alt="<?php echo $post_title ?>" class="house__img">
      </a>
    </div><?php
  endforeach;
  wp_reset_postdata();
  if ( $count_posts > $numberposts ) : ?>
    <button type="button" class="houses__loadmore loadmore" id="loadmore-btn" data-posts-count="<?php echo $count_posts ?>"<?php echo $loadmore_data_filter ?>>
      <span class="loadmore__text">Показать еще</span>
      <img src="#" data-src="<?php echo get_template_directory_uri() ?>/img/icon-loadmore.svg" alt="" class="loadmore__icon lazy"></img>
    </button> <?php
  endif;
  if ( isset( $_POST ) && $_POST['action'] === 'print_houses' ) {
    unset( $filter );
    unset( $count_posts );
    unset( $numberposts );
    unset( $post_filter );
    unset( $post_type );
    unset( $loadmore_data_filter );
    unset( $section_class );
    die();
  }
}