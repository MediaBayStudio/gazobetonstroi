<?php

  $post_type = $section['post_type'];
  $numberposts = $section['numberposts'];
  $page_factor = 1;
  // $numberposts = -1;
  $post_taxonomy = 'house_properties';

  // Получаем массив всех характеристик домов
  $terms = get_categories( [
    'taxonomy'  => $post_taxonomy,
    'hide_empty' => 0
  ] );

  if ( $_GET ) {
    if ( $_GET['catalogue_page'] ) {
      $page_factor = $_GET['catalogue_page'];
    }

    $filter_query = [];

     // Создаем новый массив, который содержит в значениях только массивы (это поля формы, отправленные в post запросе)
    $filtred_post_data = array_filter( $_GET, function( $el ) {
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
          'taxonomy' => $post_taxonomy,
          'terms' => $terms_id
        ];
      }

      $query = new WP_Query( [
        'post_type' => $post_type,
        'posts_per_page' => $numberposts * $page_factor,
        'post_status' => 'publish',
        'offset' => 0,
        'tax_query' => $filter_query
      ] );

      $posts = $query->posts;
      
      // Изменяем сформированный sql-запрос на подсчет кол-ва записей
        // Меняем SELECT ... FROM на SELECT count( * ) FROM
      $count_request = preg_replace( '/(?<=SELECT).*(?=FROM)/', ' count( * ) ', $query->request );
      $count_request = preg_replace( '/(?<=\'publish\'\)\)).*/', '', $count_request );
      // Получаем количество записей
      $count_posts = $wpdb->get_results( $count_request, ARRAY_A )[0]['count( * )'];
    } else {
      $posts = get_posts( [
        'post_type' => $post_type,
        'numberposts' => $numberposts * $page_factor
      ] );
      $count_posts = wp_count_posts( $post_type )->publish;
    }

  } else {
    // Если нет фильтра
    $posts = get_posts( [
      'post_type' => $post_type,
      'numberposts' => $numberposts * $page_factor
    ] );
    $count_posts = wp_count_posts( $post_type )->publish;
  }

  $loadmore_btn_attr = $numberposts * $page_factor > $count_posts ? ' hidden' : '';

  // Разбираем GET-параметр для установки его в ссылку
  $query_string = '?';
  if ( $_SERVER['QUERY_STRING'] ) {
    // Если страница уже есть, то прибавляем к ней 1, для перехода на следующую
    if ( strpos( $_SERVER['QUERY_STRING'], 'catalogue_page' ) !== false ) {
      $query_string .= preg_replace_callback( '/(?<=catalogue_page=)\d+/', function( $matches ) {
        return 1 + (int)$matches[0];
      }, $_SERVER['QUERY_STRING'] );
    } else {
      $query_string .= $_SERVER['QUERY_STRING'] . '&catalogue_page=2';
    }
  } else {
    $query_string = '?catalogue_page=2';
  } ?>
<span class="houses-count">Найдено проектов: <span class="houses-count-num"><?php echo $count_posts ?></span></span>
<div class="houses container">
  <form action="<?php the_permalink() ?>" method="get" class="filter-form popup" id="filter-form" data-numberposts="<?php echo $numberposts ?>" data-post-type="<?php echo $post_type ?>">
    <div class="filter-form__cnt">
      <button type="button" class="filter-form__close">
        <img src="<?php echo $template_directory ?>/img/icon-close.svg" alt="Иконка">
      </button>
      <span class="filter-form__title">Фильтр</span> <?php

      $parent_terms = [];
      $child_terms = [];

      for ( $i = 0, $len = count( $terms ); $i < $len; $i++ ) {
        $cat = $terms[$i];
        $parent_id = $cat->parent;
        $term_id = $cat->term_id;
        $cat_title = $cat->name;
        $cat_slug = $cat->slug;
        $cat_count = $cat->count;
        $show_cat_in_filters = get_field( 'show_in_filters', $cat );

        // Если у таксономии нет родителей, т.е. она сама родительская
        if ( $parent_id === 0 ) {
          if ( $post_type === 'projects' && $cat_title === 'Год постройки' ) {
            continue;
          }
          if ( $show_cat_in_filters ) {
            $parent_terms[ $term_id ] = [
              'title' => $cat_title,
              'slug'  => $cat_slug,
              'count' => $cat_count,
              'id'  => $term_id
            ];
          }
        // Дочерняя таксономия
        } else {
          if ( $show_cat_in_filters && $cat_count > 0 ) {
            // Поднимаем двойку в квадратном метре
            $cat_title = preg_replace( '/м2$/', 'м<sup>2</sup>', $cat_title );
            $child_terms[ $parent_id ][] = [
              'title' => $cat_title,
              'slug'  => $cat_slug,
              'count' => $cat_count,
              'id'  => $term_id
            ];
          }
        }
      }
      // var_dump( $parent_terms );

      foreach ( $parent_terms as $term ) :
        $childs = $child_terms[ $term['id'] ];
        $childs_count = count( $childs );
        // $fieldset_class = $childs_count > 5 ? ' dropdown' : '' ?>
        <fieldset class="filter-form__group<?php echo $fieldset_class ?>" id="i<?php echo $term['id'] ?>">
          <legend class="filter-form__group-title"><?php echo $term['title'] ?></legend> <?php
          // name чекбокса для сравнения с get
          $parent_name = $term['slug'];
          // Вывод чекбоксов
          foreach ( $childs as $child ) :
            // Сравнивание с GET парамтерами
            if ( $_GET && $_GET[ $parent_name ] ) {
              if ( array_search( $child['id'], $_GET[ $parent_name ] ) !== false ) {
                $checked_attr = ' checked';
              } else {
                $checked_attr = '';
              }
            } ?>
            <label class="check check_fill filter-form__check">
              <input type="checkbox"<?php echo $checked_attr ?> name="<?php echo $parent_name ?>[]" value="<?php echo $child['id'] ?>" class="check__inp">
              <span class="check__text"><?php echo $child['title'] ?></span>
            </label> <?php
          endforeach ?>
        </fieldset> <?php
      endforeach ?>
       <div class="filter-form__bottom">
        <button class="filter-form__btn btn btn_green btn_text-white">Применить</button>
        <button type="reset" class="filter-form__reset text_underline">Сбросить фильтр</button>
       </div>
     </div>
     <div class="filter-form__hint">
        <button type="button" class="filter-form__hint-close">x</button>
        <span>Найдено: </span><span class="filter-form__hint-num"><?php echo $count_posts ?></span>
        <button class="filter-form__hint-btn">Показать</button>
        <div class="loader">
          <div class="loader__circle"></div>
        </div>
     </div>
  </form>
  <button type="button" id="filter-form-call-btn"><img src="#" data-src="<?php echo $template_directory ?>/img/icon-filter.svg" alt="" class="lazy" style="padding-right:10px">Фильтр</button>
  <div class="houses__cards" id="houses-cards"> <?php
    print_houses( $posts, $post_type, $post_type, $numberposts, $count_posts ) ?>
  </div>
  <a onclick="event.preventDefault()" href="<?php echo $site_url . '/' . $post_type . '/' . $query_string ?>" <?php echo $loadmore_btn_attr ?> class="houses__loadmore loadmore" id="loadmore-btn"<?php echo $loadmore_data_filter ?>>
    <span class="loadmore__text">Показать еще</span>
    <img src="<?php echo $template_directory ?>/img/icon-loadmore.svg" alt="" class="loadmore__icon"></img>
  </a>
</div>