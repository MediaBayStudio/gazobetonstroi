<?php
// Добавляем кнопку для импорта в админ панель
add_action( 'admin_bar_menu', function() {
  global $wp_admin_bar;
  $wp_admin_bar->add_menu( [
    'id'    => 'import-btn',
    'title' => __('Импорт товаров'),
    'href'  => ''
  ] );
}, 100 );

add_action( 'wp_ajax_nopriv_import', 'import' ); 
add_action( 'wp_ajax_import', 'import' );

function remove_spaces( $input ) {
  $output = str_replace( "\"\n\"", "\",\"", $input );
  $output = str_replace( ["\r\n", "\r", "\n", "\t"], '', $output );
  return $output;
}


// Делаем первую букву заглавной
function my_mb_ucfirst( $str ) {
  $fc = mb_strtoupper( mb_substr( $str, 0, 1 ) );
  return $fc . mb_substr( $str, 1 );
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
    $product_row_names = str_getcsv( remove_spaces( array_shift( $csv_rows_array ) ) );

    // приводим все данные в читабельный вид
    foreach ( $csv_rows_array as $element ) {
      $element = str_getcsv( remove_spaces( $element ), ',' );
      $element = array_combine( $product_row_names, $element );

      // При необходимости поля можно отфильтровать

      $elements[] = $element; // Добавляем в массив
    }

    /*
      Будем сравнивать таблицы, которые будем ипортировать, с уже существующими записями
      Если есть совпадение по названию, то очищаем метаполя записи, устанавливаем новые
      delete_field( $key, $post_id );
      Удаляем изображения и берем новые wp_delete_attachment( $attachment_id, $force_delete = false );
      Категории будут очищены также через acf delete_field
      И задать категории можно также
    */

    $posts = get_posts( [
      'post_type' => $_POST['post-type'],
      'numberposts' => -1
    ] );

    // Существующие таксономии проектов
    $house_terms = get_terms( [
      'taxonomy' => 'house_properties',
      'hide_empty' => false
    ] );

    // Формируем удобный массив 'tax_name' => 'id'

    foreach ( $house_terms as $term ) {
      switch ( $term->name ) {
        case 'Кол-во этажей':
        case 'Материал':
          continue;
          break;
        default:
          $house_categories[ $term->name ] = $term->term_id;
          break;
      }
    }

    // var_dump( $house_categories );

    $i = 0;
    $response = [];
    foreach ( $elements as $elem ) {
      // Для проверки на существование
      $exist_post_id = false;
      // Сохраним нужные переменные для вставки в acf
      $house_area = $elem['S общ'];
      $house_name = $elem['Проект'];

      // Формируем название категории для площади дома
      if ( $house_area < 100 ) {
        $house_area_category = 'до 100м2';
      } else if ( $house_area > 100 && $house_area < 150 ) {
        $house_area_category = '100 - 150м2';
      } else if ( $house_area > 150 && $house_area < 200 ) {
        $house_area_category = '150 - 200м2';
      } else if ( $house_area > 200 && $house_area < 300 ) {
        $house_area_category = '200 - 300м2';
      } else {
        $house_area_category = 'более 300м2';
      }

      // Формируем название категории для кол-ва этажей
      switch ( $elem['Кол-во этажей'] ) {
        case '1':
          $house_floor = '1 этаж';
          break;
        case '2':
          $house_floor = '2 этажа';
          break;
        case '3':
          $house_floor = '3 этажа';
          break;
        case '4':
          $house_floor = '4 этажа';
          break;
      }
      if ( strtolower( $elem['Мансардный этаж'] ) === 'да' ) {
        $house_floor .= ' с мансардой';
      }

      // Формируем объект свойств (категорий)
      $house_props = [
        'Длина' => trim( str_replace( ',', '.', $elem['Длина'] ) ),
        'Ширина' => trim( str_replace( ',', '.', $elem['Ширина'] ) ),
        'S' => trim( str_replace( ',', '.', $elem['S общ'] ) ),
        'Площадь' => trim( $house_area_category ),
        'Материал' => my_mb_ucfirst( trim( $elem['Оптимизированный'] ) ),
        'Полное название материала стен' => my_mb_ucfirst( trim( $elem['Материал стен (подробный)'] ) ),
        'Первая цена' => trim( '1 000 000' ),
        'Первая цена подпись' => trim( 'Стандарт' ),
        'Вторая цена' => trim( '2 000 000' ),
        'Вторая цена подпись' => trim( 'Престиж' ),
        'Кол-во этажей' => trim( $house_floor )
      ];

      if ( strtolower( $elem['Второй свет'] ) !== 'нет') {
        $house_props['Второй свет'] = 'Да';
      }
      if ( strtolower( $elem['Сауна'] ) !== 'нет') {
        $house_props['Сауна'] = 'Да';
      }
      if ( strtolower( $elem['Бассейн'] ) !== 'нет') {
        $house_props['Бассейн'] = 'Да';
      }
      if ( strtolower( $elem['гараж'] ) !== 'нет' )  {
        $house_props['Гараж'] = $elem['гараж'];
      }

      // var_dump( $elem );

      // Будем искать элемент в существующих записях
      foreach ( $posts as $post ) {
        if ( strtolower( $post->post_title ) === strtolower( $house_name ) ) {
          // Элемент, который мы пытаемся добавить, по названию проекта совпал с тем, что уже есть в БД

          // Удаляем связь с миниатюрой
          delete_post_thumbnail( $post );

          // Получим поля галереи и удалим все картинки
          $gallery = get_field( 'house_fields', $post )['gallery'];

          if ( $gallery ) {
            foreach ( $gallery as $img ) {
              $img_id = attachment_url_to_postid( $img );
              wp_delete_attachment( $img_id, true ); // безвовратно удаляем
            }
          }

          // Очищаем остальные acf поля
          // Также очищаются категории
          delete_field( 'house_fields', $post->ID );

          // Собираем массив существуюших записей
          $resonse[] = fillFields( $post->ID, $house_name, $house_props, $house_categories );
          $exist_post_id = $post->ID;
        }
      } // end foreach posts

      // Если запись обновлена, то идем дальше
      if ( $exist_post_id ) {
        // if ( $i === 25 ) {
        //   break;
        // }
        continue;
      } else {
        // Иначе будем создавать новую запись

        // Данные записи
        $post_data = [
          'post_title'      => $house_name,
          'post_type'       => $_POST['post-type'],
          'post_content'    => '',
          'post_status'     => 'publish',
          'post_author'     => 1,
          'post_category'   => []
        ];

        // Вставляем запись в бд
        $post_id = wp_insert_post( $post_data );

        $response[] = fillFields( $post_id, $house_name, $house_props, $house_categories );
      }


      if ( $i === 25 ) {
        break;
      }
      $i++;
      var_dump( $response );
    } // endforeach elements
  }
  die();
}

function fillFields( $post_id=null, $post_title=null, $house_props=null, $house_categories=null ) {
  if ( is_null( $post_id) ) {
    return false;
  }
  // Будем формировать массив id категорий
  foreach ( $house_props as $key => $value ) {
    if ( $house_categories[ $key ] ) {
      $terms_ids[] = $house_categories[ $key ];
      // var_dump( 'Найдено ' . $key );
    } else if ( $house_categories[ $value ] ) {
      $terms_ids[] = $house_categories[ $value ];
      // var_dump( 'Найдено ' . $value );
    } else {
      // var_dump( 'Не найдено ' . $key . ' || ' . $value );
    }
  }

  // Вставим изображения и миниатюру
  $images_data = insertImages( $post_title, $post_id );

  $gallery = $images_data['ids']; // Для вставки в acf
  $images_urls = $images_data['urls']; // Для отчета

  // Массив для вставки в группу полей house_fields
  $values = [
    'garage' => $house_props['Гараж'],
    'length' => $house_props['Длина'],
    'width' => $house_props['Ширина'],
    'material' => $house_props['Полное название материала стен'],
    'first_price' => [
      'price' => $house_props['Первая цена'],
      'text' => $house_props['Первая цена подпись']
    ],
    'second_price' => [
      'price' => $house_props['Вторая цена'],
      'text' => $house_props['Вторая цена подпись']
    ],
    'area' => $house_props['S'],
    'props' => $terms_ids,
    'gallery' => $gallery
  ];

  // Обновляем поля
  update_field( 'house_fields', $values, $post_id );

  $response = [
    'name' => $post_title,
    'images' => $images_urls,
    'props' => $values
  ];

  return $response;
}

// Функция для поиска и вставки картинок в галерею и миниатюру
// возвращает массив id вставленных картинок и массив их url
function insertImages( $house_name=null, $post_id=null ) {
  if ( !is_null( $house_name ) ) {
  /*
  Будем искать изображения для галереи
    переносить их в нужную папку
    связывать с записью и вставлять в бд
    устанавливать миниатюру записи
    формировать массив id для вставки в acf
  */
    $ids = [];
    $urls = [];
    // Директория сайта
    $site_dir = preg_replace( '/wp-content.*/', '',  get_template_directory() );
    // Папка с файлами текущего дома
    $images_dir = $site_dir . 'images/' . $house_name . '/';

    // Массив файлов в папке (содержит также какой-то мусор!)
    $images_in_dir = scandir( $images_dir );

    // Ищем миниатюру поста
    // судя по всему это самый большой по размеру файл



    // Название файла, который будет миниатюрой
    // $uppercase_thumbnail_file_name = strtoupper( $house_name ) . '.jpg';
    // Запасное название файла миниатюры
    // $uppercase_thumbnail_file_name_viz = strtoupper( $house_name ) . '_viz.jpg';
    $thumbnail = '';
    $thumbnail_id = false;
    $thumbnail_url = false;
    foreach ( $images_in_dir as $img ) {
      // Полный путь к картинке
      $img_path = $images_dir . $img;

      // Если нашлась миниатюра, то создадим условный тег is_thumb

      // Обязательно проверяем существование файла
          // т.к. в массиве папки присутсвует какой-то мусор
      if ( file_exists( $img_path ) && $img !== '.' && $img !== '..' ) {
        /*
          Соберем все нужные данные
            для корректной вставки файла в базу данных
            и в папку uploads
          Также собираем в массив id вложений для вставки в acf поле галереи
          Также найдем самый большой по размеру файл
        */
        // Получаем код картинки для вставки в новый файл
        $img_cnt = file_get_contents( $img_path );
        // Путь к папке с медиа
        $wp_upload_dir = wp_upload_dir();
        // Имя файла с типом
        $basename = basename( $img_path );
        // Тип файла
        $filetype = wp_check_filetype( $basename, null );
        // Папка для вставки файлов
        $upload_dir = $wp_upload_dir['path'] ? $wp_upload_dir['path'] : $wp_upload_dir['url'];
        // Будущее размещение файла
        $filename = $upload_dir . '/' . $basename;

        // Создаем файл с картинкой в новом месте
        file_put_contents( $filename, $img_cnt );
        // Подготовим массив с необходимыми данными для вставки в бд
        $attachment = [
          'guid'           => $wp_upload_dir['url'] . '/' . $basename, 
          'post_mime_type' => $filetype['type'],
          'post_title'     => preg_replace( '/\.[^.]+$/', '', $basename ),
          'post_content'   => '',
          'post_status'    => 'inherit'
        ];

        // Вставляем запись в бд и связываем с текущей записью через $post->ID
        $attach_id = wp_insert_attachment( $attachment, $filename, $post_id );

        // wp_generate_attachment_metadata() зависит от этого файла
        require_once( ABSPATH . 'wp-admin/includes/image.php' );

        // Создадим нарезки thumbnail и прочие метаданные в бд
        $attach_data = wp_generate_attachment_metadata( $attach_id, $filename );
        wp_update_attachment_metadata( $attach_id, $attach_data );

        // Получаем url картинки
        $img_url = wp_get_attachment_url( $attach_id );

        if ( $thumbnail === '' ) {
          $thumbnail = $img_path;
          $thumbnail_id = $attach_id;
          $thumbnail_url = $img_url;
        }

        $thumbnail_filesize = filesize( $thumbnail );
        $img_filesize = filesize( $img_path );

        if ( $img_filesize > $thumbnail_filesize ) {
          $thumbnail = $img_path;
          $thumbnail_id = $attach_id;
          $thumbnail_url = $img_url;
        }
        
        // Вставляем id в массив галереи
        $ids[] = $attach_id;

        // Вставляем ссылки в массив для отчета
        $urls[] = $attach_id;
      }
    }

    // Устанавливаем миниатюру записи
    if ( $thumbnail_id ) {
      set_post_thumbnail( $post_id, $thumbnail_id );
    }

    for ( $i = 0, $len = count( $urls ); $i < $len; $i++ ) { 
      if ( $urls[ $i ] === $thumbnail_url ) {
        array_splice( $urls, $i, 1 );
        array_splice( $ids, $i, 1 );
        break;
      }
    }

    array_unshift( $urls, $thumbnail_url );
    array_unshift( $ids, $thumbnail_id );

    return [
      'urls' => $urls,
      'ids' => $ids
    ];
  }
}