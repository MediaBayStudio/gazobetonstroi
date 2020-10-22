<?php
// Добавляем кнопку для импорта в админ панель
add_action( 'admin_bar_menu', function() {
  global $wp_admin_bar;
  $wp_admin_bar->add_menu( [
    'id'    => 'import-btn',
    'title' => __('Импорт товаров'),
    'href'  => '',
    'meta'  => [
      'onclick' => 'showImportPopup()' // функция инициализирована в js/components/main/_utils.js и объявлена в js/components/main/_importCatalog.js
    ]
  ] );
}, 100 );

add_action( 'wp_ajax_nopriv_import', 'import' ); 
add_action( 'wp_ajax_import', 'import' );

function removeSpaces( $input ) {
  $output = str_replace( "\"\n\"", "\",\"", $input );
  $output = str_replace( ["\r\n", "\r", "\n", "\t"], '', $output );
  return $output;
}

function import() {

  if ( isset( $_FILES['csv'] ) ) {
    // менеям кодировку
    $file_encodings = ['cp1251','UTF-8'];
    $csv_content = trim( file_get_contents( $_FILES['csv']['tmp_name'] ) );
    $encoded_content = mb_convert_encoding( $csv_content, 'UTF-8', mb_detect_encoding( $csv_content, $file_encoding ) );

    // поулчаем число импортов за 1 раз
    // почему-то на 25-м товаре ошибка
    // $number = $_POST['number'];

    // делим строку на массив по разделителю строк (! они могут быть разные !)
    $csv_rows_array = preg_split( '/\n/', $encoded_content );

    // получаем первую строку из таблицы (названия полей: post_title и т.д.)
    $product_row_names = str_getcsv( removeSpaces( array_shift( $csv_rows_array ) ) );

    // приводим все данные в читабельный вид
    foreach ( $csv_rows_array as $element ) {
      $element = str_getcsv( removeSpaces( $element ), ',' );
      $element = array_combine( $product_row_names, $element );

      // При необходимости поля можно отфильтровать

      $elements[] = $element; // Добавляем в массив
    }

    // var_dump( $elements );

    /*
      Будем сравнивать таблицы, которые будем ипортировать, с уже существующими записями
      Если есть совпадение по названию, то очищаем метаполя записи, устанавливаем новые
      delete_post_meta( $post_id, $key, $value );
      Удаляем изображения и берем новые wp_delete_attachment( $attachment_id, $force_delete = false );
      Очищаем категории и устанавливаем новые wp_set_post_terms( $post_ID, $tags, $taxonomy, $append );
    */

      $posts = get_posts( [
        'post_type' => $_POST['post-type'],
        'numberposts' => -1
      ] );
      $i = 0;
      foreach ( $elements as $elem ) {
        // var_dump( $elem );
        // Будем искать элемент в существующих записях
        foreach ( $posts as $post ) {
          if ( strtolower( $post->post_title ) === strtolower( $elem['Проект'] ) ) {
            // Элемент, который мы пытаемся добавить, по названию проекта совпал с тем, что уже есть в БД
          }
        }
        if ( $i === 3 ) {
          break;
        }
        $i++;
      }

      // var_dump( $posts );
  }
  // var_dump( $_POST );
  // var_dump( $_FILES );
  die();
}