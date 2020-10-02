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

function print_houses( $posts=null, $section_class='' ) {
  global $post;
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
        <img src="#" data-src="<?php the_post_thumbnail_url() ?>" alt="<?php echo $post_title ?>" class="house__img lazy">
      </a>
    </div><?php
  endforeach;
  wp_reset_postdata();
}