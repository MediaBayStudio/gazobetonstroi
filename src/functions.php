<?php
$template_directory = get_template_directory_uri();
$template_dir = get_template_directory();
$wp_content_dir = content_url();
$site_url = site_url();
$is_front_page = is_front_page();
$is_404 = is_404();
$is_category = is_category();
// $is_admin = is_admin();
// $is_single = is_single();

$address = get_option( 'contacts_address' );
$tel_1 = get_option( 'contacts_tel_1' );
$tel_1_dry = preg_replace( '/\s/', '', $tel_1 );
$tel_2 = get_option( 'contacts_tel_2' );
$tel_2_dry = preg_replace( '/\s/', '', $tel_2 );
$tel_3 = get_option( 'contacts_tel_3' );
$tel_3_dry = preg_replace( '/\s/', '', $tel_3 );
$email = get_option( 'contacts_email' );
$insta = get_option( 'contacts_insta' );

// Тайтлы у домов
add_filter( 'aioseop_title_single', function( $title ) {
  global $post;

  if ( is_singular( ['cases', 'projects'] )) {
    $GLOBALS['house_terms'] = get_the_terms( $post->ID, 'house_properties' );
    $house_terms = $GLOBALS['house_terms'];

    foreach ( $house_terms as $term ) {
      $parent_id = $term->parent;

      if ( $parent_id === 0 ) {
        $parent_cat = null;
      } else {
        $parent_cat = get_term( $parent_id );
      }

      if ( $parent_cat->name !== 'Площадь дома' ) {
        if ( $parent_cat->name === 'Другое' ) {
          if ( $term->name !== 'Гараж' ) {
            $GLOBALS['house_other_terms'][] = $term->name;
          }
        } else {
          $GLOBALS['house_props'][ $parent_cat->name ] = $term->name;
        }
      }
    }

    $material = mb_strtolower( $GLOBALS['house_props']['Материал'] );
    $house_fields = get_field( 'house_fields' );
    $post_title = $post->post_title;
    $area = round( $house_fields['area'] );
    $type = $GLOBALS['house_props']['Тип строения'];

    if ( strpos( $material, 'кирпич') !== false ) {
      $material = 'кирпич';
    }

    if ( strpos( $type, 'Гараж' ) !== false ) {
      $type = 'Гараж';
    }

    if ( strpos( $type, 'дом' ) !== false ) {
      $type = 'Дом';
    }

    $title = str_replace( ['%type%', '%material%', '%area%'], [$type, $material . 'a', $area], $title );
  }

  return $title; 
} , 10, 1 ); 


// Дескрипшины у домов
add_filter( 'aioseop_description', function( $description ) { 
  global $post;

  if ( is_singular( ['cases', 'projects'] )) {
    $house_terms = get_the_terms( $post->ID, 'house_properties' );

    foreach ( $house_terms as $term ) {
      $parent_id = $term->parent;

      if ( $parent_id === 0 ) {
        $parent_cat = null;
      } else {
        $parent_cat = get_term( $parent_id );
      }

      if ( $parent_cat->name !== 'Площадь дома' ) {
        if ( $parent_cat->name === 'Другое' ) {
          if ( $term->name !== 'Гараж' ) {
            $terms['house_other_terms'][] = $term->name;
          }
        } else {
          $terms['house_props'][ $parent_cat->name ] = $term->name;
        }
      }
    }

    $material = mb_strtolower( $terms['house_props']['Материал'] );
    $house_fields = get_field( 'house_fields' );
    $post_title = $post->post_title;
    $area = round( $house_fields['area'] );
    $type = $terms['house_props']['Тип строения'];

    if ( strpos( $material, 'кирпич') !== false ) {
      $material = 'кирпича';
    } else if ( strpos( $material, 'газобетон') !== false ) {
      $material = 'газобетона';
    }

    if ( stripos( $type, 'Гараж' ) !== false ) {
      $type = 'гаража';
    } else if ( stripos( $type, 'дом' ) !== false ) {
      $type = 'дома';
    } else if ( stripos( $type, 'Баня' ) !== false ) {
      $type = 'бани';
    } else if ( stripos( $type, 'Банный комплекс' ) !== false ) {
      $type = 'банного комплекса';
    } else if ( stripos( $type, 'Таунхаус' ) !== false ) {
      $type = 'таунхауса';
    } else if ( stripos( $type, 'Хозблок' ) !== false ) {
      $type = 'хозблока';
    }

    if ( is_singular( 'projects' ) ) {
      $description = "Заказать строительство %type% из %material% площадью %area% м² в Санкт-Петербурге и ЛО. Проект %type% – %post_title% от компании Газобетонстрой.";
    } else {
      $description = "Готовый " . $post_title . " площадью %area% м² в каталоге готовых проектов. Строим дома из газобетона и поризованного кирпича в Санкт-Петербурге и ЛО.";
    }

    $description = str_replace( ['%type%', '%material%', '%area%'], [$type, $material, $area], $description );
  }
  return $description; 
} , 10, 1 ); 

// Проверка поддержки webp браузером
if ( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], ' Chrome/' ) !== false ) {
  $webp_support = true; // webp поддерживается
} else {
  $webp_support = false; // webp не поддерживается
}


// Удаление неправильного атрибута у html тегов honeypot
add_filter( 'wpcf7_honeypot_html_output', function( $html, $args ) {
    return str_replace( ' autocomplete="nope"', '', $html );
}, 10, 2 );


// Пишем в админку
add_action( 'admin_head', function() {
  print
  '<script>
    document.addEventListener("DOMContentLoaded", function() {
      let taxonomiesChildrenLists = document.querySelectorAll(\'#house_propertieschecklist ul.children\');

      for (let list of taxonomiesChildrenLists) {
        let label = list.previousElementSibling,
          input = label.children[0];

        label.style.cssText = "pointer-events:none;position:relative";
        input.style.cssText = "position:absolute;opacity:0;pointer-events:none";
      }

      console.log(taxonomiesChildrenLists)
    });
  </script>';
} );

function get_excerpt( $args = '' ){
  global $post;

  if( is_string($args) )
    parse_str( $args, $args );

  $rg = (object) array_merge( array(
    'maxchar'     => 350,
    'text'        => '', 
    'autop'       => true,
    'save_tags'   => '',
    'more_text'   => 'Читать дальше...',
    'ignore_more' => false
  ), $args );

  $rg = apply_filters( 'kama_excerpt_args', $rg );

  if( ! $rg->text )
    $rg->text = $post->post_excerpt ?: $post->post_content;

  $text = $rg->text;
  // убираем блочные шорткоды: [foo]some data[/foo]. Учитывает markdown
  $text = preg_replace( '~\[([a-z0-9_-]+)[^\]]*\](?!\().*?\[/\1\]~is', '', $text );
  // убираем шоткоды: [singlepic id=3]. Учитывает markdown
  $text = preg_replace( '~\[/?[^\]]*\](?!\()~', '', $text );
  $text = trim( $text );

  // <!--more-->
  if( ! $rg->ignore_more  &&  strpos( $text, '<!--more-->') ){
    preg_match('/(.*)<!--more-->/s', $text, $mm );

    $text = trim( $mm[1] );

    $text_append = ' <a href="'. get_permalink( $post ) .'#more-'. $post->ID .'">'. $rg->more_text .'</a>';
  }
  // text, excerpt, content
  else {
    $text = trim( strip_tags($text, $rg->save_tags) );

    // Обрезаем
    if( mb_strlen($text) > $rg->maxchar ){
      $text = mb_substr( $text, 0, $rg->maxchar );
      $text = preg_replace( '~(.*)\s[^\s]*$~s', '\\1...', $text ); // кил последнее слово, оно 99% неполное
    }
  }

  // сохраняем переносы строк. Упрощенный аналог wpautop()
  if( $rg->autop ){
    $text = preg_replace(
      array("/\r/", "/\n{2,}/", "/\n/",   '~</p><br ?/?>~'),
      array('',     '</p><p>',  '<br />', '</p>'),
      $text
    );
  }

  $text = apply_filters( 'kama_excerpt', $text, $rg );

  if( isset($text_append) )
    $text .= $text_append;

  return ( $rg->autop && $text ) ? "<p>$text</p>" : $text;
}


// Удаление разных скриптов и стилей от wp
// Отключаем гутенберг
// Отключаем emoji
// Отключаем весь css-файл CF7
// Отключаем генерацию некоторых лишнех тегов
require $template_dir . '/inc/disable-wp-scripts-and-styles.php';

// Поддержки темой, настройка thumbnails
require $template_dir . '/inc/theme-support-and-thumbnails.php';

// Подключение стилей и скриптов, чистка лишнего в html-тегах, настройка атрибутов
require $template_dir . '/inc/enqueue-styles-and-scripts.php';

// Настройка доп. полей в панели настройки->общее
require $template_dir . '/inc/options-fields.php';

// Подключение и настройка меню, атрибутов, классов, id
require $template_dir . '/inc/menus.php';

// Регистрация новых типов записей (проекты и кейсы) и таксономий для них
require $template_dir . '/inc/register-post-types-and-taxonomies.php';

// Функция вывода посов-новостей
require $template_dir . '/inc/print-posts.php';

// Функция вывода постов-домов
require $template_dir . '/inc/print-houses.php';

// Функция получения кол-ва домов по фильтрам
require $template_dir . '/inc/get-count-houses.php';

if ( is_super_admin() || is_admin_bar_showing() ) {
  // Функция иморта проектов из csv файла
  require $template_dir . '/inc/import.php';
  // Функция вывода дополнительных параметров в админке
  require $template_dir . '/inc/posts-columns.php';
}