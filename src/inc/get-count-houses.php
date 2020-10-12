<?php
add_action( 'wp_ajax_nopriv_get_count_houses', 'get_count_houses' ); 
add_action( 'wp_ajax_get_count_houses', 'get_count_houses' );

function get_count_houses() {
  global $wpdb;

  $filter_query = []; // Параметры запроса, будет вставлено в tax_query
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
      'posts_per_page' => -1,
      'offset' => 0,
      'tax_query' => $filter_query,
      'post_status' => 'publish'
    ] );    

    // Изменяем сформированный sql-запрос на подсчет кол-ва записей
    $count_request = preg_replace( '/(?<=SELECT).*(?=FROM)/', ' count( * ) ', $query->request );
    $count_request = preg_replace( '/(?<=\'publish\'\)\)).*/', '', $count_request );

    // Получаем количество записей
    $count_posts = $wpdb->get_results( $count_request, ARRAY_A )[0]['count( * )'];
  } else {
    $count_posts = wp_count_posts( $post_type )->publish;
  }

  echo $count_posts;
  die();
}