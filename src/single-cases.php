<?php
/*
  Template name: Кейс
*/

get_header();

// Получаем поля по ID страницы-шаблона
$sections = get_field( 'sections', 403 );

foreach ( $sections as $section ) {
  require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();