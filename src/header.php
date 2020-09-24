<?php
  global 
    $site_url,
    $template_directory,
    $is_front_page,
    $is_404 ?>
<!DOCTYPE html>
<html <?php language_attributes() ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no, user-scalable=no, viewport-fit=cover">
  <meta http-equiv="X-UA-Compatible" content="ie=edge"> <?php 
  # Fonts preload
  $fonts = [
    'Montserrat-Regular.woff',
    'Montserrat-Medium.woff',
    'Montserrat-SemiBold.woff',
    'Montserrat-Bold.woff',
    'SegoeUI-SemiBold.woff'
  ];
  foreach ( $fonts as $font ) : ?>
    
  <link rel="preload" href="<?php echo $template_directory . '/fonts/' . $font ?>" as="font" type="font/woff" crossorigin="anonymous" /> <?php
  endforeach ?>
  
  <!-- favicons --> <?php
  wp_head() ?>
</head>

<body> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <header class="hdr container"> <?php 
  wp_nav_menu( [
    'theme_location'  => 'header_menu',
    'container'       => 'nav',
    'container_class' => 'hdr__nav',
    'menu_class'      => 'hdr__nav-list',
    'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
  ] ) ?>
  <button type="button" class="hdr__burger" onclick="this.classList.toggle('active')">
    <span class="hdr__burger-box">
      <span class="hdr__burger-inner"></span>
    </span>
  </button>
  </header>

