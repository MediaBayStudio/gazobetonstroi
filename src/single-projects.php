<?php
/*
  Template name: Проект
*/

get_header();

require 'template-parts/hero-house.php';

$sections = get_field( 'sections', 248 );

foreach ( $sections as $section ) {
  require 'template-parts/' . $section['acf_fc_layout'] . '.php';
}

get_footer();