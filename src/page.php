<?php
/*
  Template name: Страница
*/

  get_header();

  $sections = get_field( 'sections' );

  foreach ( $sections as $section ) {
    require 'template-parts/' . $section['acf_fc_layout'] . '.php';
  }

  get_footer();