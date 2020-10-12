<?php
add_action( 'wp_ajax_nopriv_print_houses', 'print_houses' ); 
add_action( 'wp_ajax_print_houses', 'print_houses' );

function print_houses( $posts=0, $post_type='projects', $section_class='', $numberposts=0, $count_posts=0 ) {
  global $post, $wpdb, $template_directory;

  if ( $_POST && $_POST['action'] === 'print_houses' ) {
    $section_class = $post_type;

    $filter_query = []; // Параметры запроса, будет вставлено в tax_query
    $numberposts = $_POST['numberposts'];
    $post_type = $_POST['post_type'];
    $taxonomy_slug = 'house_properties';

    // Создаем новый массив, который содержит в значениях только массивы (это поля формы, отправленные в post запросе)
    $filtred_post_data = array_filter( $_POST, function( $el ) {
      return is_array( $el );
    });

    // Если есть параметры для фильтрации записей
    if ( $filtred_post_data ) {
      $filters_length = count( $filtred_post_data ); // Берем их длину для формирования AND

      foreach ( $filtred_post_data as $term_slug => $terms_id ) {
        if ( $filters_length > 1 ) {
          if ( !$filter_query['relation'] ) {
            $filter_query['relation'] = 'AND';
          }
        }
        $filter_query[] = [
          'taxonomy' => $taxonomy_slug,
          'terms' => $terms_id
        ];
      }

      $query = new WP_Query( [
        'post_type' => $post_type,
        'posts_per_page' => $numberposts,
        'numberposts' => $numberposts,
        'offset' => $_POST['offset'],
        'tax_query' => $filter_query,
        'post_status' => 'publish'
      ] );

      $posts = $query->posts;
      
      // Изменяем сформированный sql-запрос на подсчет кол-ва записей
      $count_request = preg_replace( '/(?<=SELECT).*(?=FROM)/', ' count( * ) ', $query->request );
      $count_request = preg_replace( '/(?<=\'publish\'\)\)).*/', '', $count_request );
      // Получаем количество записей
      $count_posts = $wpdb->get_results( $count_request, ARRAY_A )[0]['count( * )'];
    } else {
      // Если нет фильтра
      $posts = get_posts( [
        'post_type' => $post_type,
        'posts_per_page' => $numberposts,
        'numberposts' => $numberposts,
        'offset' => $_POST['offset']
      ] );
      $count_posts = wp_count_posts( $post_type )->publish;
    }

  }

  if ( $section_class ) {
    $section_class = ' ' . $section_class . '__house';
  }
  if ( $posts ) {
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
      <button type="button" class="houses__loadmore loadmore" id="loadmore-btn" data-total-houses-count="<?php echo $count_posts ?>"<?php echo $loadmore_data_filter ?>>
        <span class="loadmore__text">Показать еще</span>
        <img src="<?php echo $template_directory ?>/img/icon-loadmore.svg" alt="" class="loadmore__icon"></img>
      </button> <?php
    endif;
  } else {
    echo '<p>С указанными параметрами ничего не найдено</p>';
  }
  if ( isset( $_POST ) && $_POST['action'] === 'print_houses' ) {
    unset( $section_class );
    unset( $filter_query );
    unset( $post_filter );
    unset( $numberposts );
    unset( $post_type );
    unset( $taxonomy_slug );
    unset( $filtred_post_data );
    unset( $filters_length );
    unset( $query );
    unset( $posts );
    unset( $count_request );
    unset( $count_posts );
    die();
  }
}