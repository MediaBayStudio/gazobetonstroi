<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'];
$sect_images = $section['sect_images'];
$sect_btn = $section['sect_btn'];
// Формируем строку изображений для lazyload
$data_src = '';
$data_media = '';

foreach ( $sect_images as $sect_img ) {
  $img_width = $sect_img['width'];
  $img_id = $sect_img['id'];
  $img_path = get_attached_file( $img_id );

  if ( $webp_support ) {
    $img_webp_path = preg_replace( '/[^.]+$/', 'webp', $img_path );
    $webp_exists = file_exists( $img_webp_path );
  }

  if ( $webp_exists ) {
    $img_url = $wp_content_dir . preg_replace( '/.*(?=\/uploads)/', '', $img_webp_path );
  } else {
    $img_url = $sect_img['url'];
  }

  if ( $img_width <= 576 || $data_src === '') {
    $data_src = 'url(' . $img_url . ')';
  } else {
    if ( $img_width === 768 || $img_width > 576 && $img_width < 768 ) {
      $media_width = 576;
    } else if ( $img_width === 1024 || $img_width > 768 && $img_width < 1024 ) {
      $media_width = 768;
    } else if ( $img_width === 1440 || $img_width > 1024 && $img_width < 1440 ) {
      $media_width = 1024;
    } else if ( $img_width === 1920 || $img_width > 1440 ) {
      $media_width = 1440;
    } 
    $data_media .= '(min-width:' . ($media_width - 0.02) . 'px){url(' . $img_url . ')}';
  }

} ?>

<section class="hero-sect container lazy" data-src="<?php echo $data_src ?>" data-media="<?php echo $data_media ?>">
  <div class="hero-sect__text-block">
    <h1 class="hero-sect__title"><?php echo $sect_title ?></h1>
    <p class="hero-sect__descr"><?php echo $sect_descr ?></p> <?php
    if ( $sect_btn ) : ?>
      <button type="button" class="hero-sect__btn btn btn_green btn_text-white" data-scroll-target="<?php echo $section['sect_btn_target'] ?>"><?php echo $section['sect_btn_text'] ?></button> <?php
    endif ?>
  </div>
</section>