<?php
$template_directory = get_template_directory_uri();
$template_dir = get_template_directory();
$wp_content_dir = content_url();
$site_url = site_url();
$is_front_page = is_front_page();
$is_404 = is_404();
$is_category = is_category();

$address = get_option( 'contacts_address' );
$tel_1 = get_option( 'contacts_tel_1' );
$tel_1_dry = preg_replace( '/\s/', '', $tel_1 );
$tel_2 = get_option( 'contacts_tel_2' );
$tel_2_dry = preg_replace( '/\s/', '', $tel_2 );
$tel_3 = get_option( 'contacts_tel_3' );
$tel_3_dry = preg_replace( '/\s/', '', $tel_3 );
$email = get_option( 'contacts_email' );
$insta = get_option( 'contacts_insta' );

// Проверка поддержки webp браузером
if ( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], ' Chrome/' ) !== false ) {
  $webp_support = true; // webp поддерживается
} else {
  $webp_support = false; // webp не поддерживается
}


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