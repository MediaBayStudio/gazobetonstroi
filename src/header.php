<?php
  global 
    $site_url,
    $template_directory,
    $is_front_page,
    $is_404,
    $webp_support,
    $address,
    $tel_1,
    $tel_1_dry,
    $tel_2,
    $tel_2_dry,
    $tel_3,
    $tel_3_dry,
    $email,
    $insta ?>
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
  
  <!-- favicons -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#616161">
  <meta name="theme-color" content="#ffffff"> <?php
  wp_head() ?>
</head>

<body> <?php
  wp_body_open() ?>
  <noscript>
    <!-- <noindex> -->Для полноценного использования сайта включите JavaScript в настройках вашего браузера.<!-- </noindex> -->
  </noscript>
  <header class="hdr container">
  <a href="/" class="hdr__logo"><img src="#" data-src="<?php echo $template_directory ?>/img/logo.svg" alt="Логотип Газобетонстрой" class="hdr__logo-img lazy"></a> <?php 
  wp_nav_menu( [
    'theme_location'  => 'header_menu',
    'container'       => 'nav',
    'container_class' => 'hdr__nav',
    'menu_class'      => 'hdr__nav-list',
    'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
  ] ) ?>
  <button type="button" class="hdr__burger">
    <span class="hdr__burger-box">
      <span class="hdr__burger-inner"></span>
    </span>
  </button> <?php
  require 'template-parts/mobile-menu.php' ?>
  </header>

