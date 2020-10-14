<?php
/*
  Template name: Новость
*/

get_header();

// Получаем поля по ID страницы-шаблона
$sections = get_field( 'sections', 424 );

foreach ( $sections as $section ) {
  require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();