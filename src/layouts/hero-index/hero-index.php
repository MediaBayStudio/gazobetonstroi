<?php
$sect_slides = $section['slides'];


$sect_descr_class = is_front_page() ? ' front-page' : '' ?>

<section class="hero-sect" id="hero-slider"> <?php
 $i = 0;
  foreach ( $sect_slides as $slide ) :
    if ( $slide['responsive'] ) {
      $data_src = 'linear-gradient(to top,rgba(0,0,0,.53)55%,rgba(0,0,0,0)97%), url(' . $slide['slide_img'] .')';
      $data_media = '(min-width:1023.98px){linear-gradient(to right,rgba(0,0,0,.53)55%,rgba(0,0,0,0)97%), url(' . $slide['slide_img'] .')}';
    } else {
      $slide_images = $slide['slide_images'];
      // Формируем строку изображений для lazyload
      $data_src = '';
      $data_media = '';
      $lg = 'linear-gradient(to top,rgba(0,0,0,.53)55%,rgba(0,0,0,0)97%)';
      foreach ( $slide_images as $slide_img ) {
        $img_width = $slide_img['width'];
        $img_id = $slide_img['id'];
        $img_path = get_attached_file( $img_id );

        if ( $webp_support ) {
          $img_webp_path = preg_replace( '/[^.]+$/', 'webp', $img_path );
          $webp_exists = file_exists( $img_webp_path );
        }

        if ( $webp_exists ) {
          $img_url = $wp_content_dir . preg_replace( '/.*(?=\/uploads)/', '', $img_webp_path );
        } else {
          $img_url = $slide_img['url'];
        }

        if ( $img_width <= 576 || $data_src === '') {
          $data_src = $lg . ',url(' . $img_url . ')';
        } else {
          if ( $img_width === 768 || $img_width > 576 && $img_width < 768 ) {
            $media_width = 576;
          } else if ( $img_width === 1024 || $img_width > 768 && $img_width < 1024 ) {
            $media_width = 768;
          } else if ( $img_width === 1440 || $img_width > 1024 && $img_width < 1440 ) {
            $media_width = 1024;
            $lg = 'linear-gradient(to right,rgba(0,0,0,.53)55%,rgba(0,0,0,0)97%)';
          } else if ( $img_width === 1920 || $img_width > 1440 ) {
            $media_width = 1440;
          } 
          $data_media .= '(min-width:' . ($media_width - 0.02) . 'px){' . $lg . ',url(' . $img_url . ')}';
        }
      }
    } ?>
    <div class="hero-sect__slide lazy" data-src="<?php echo $data_src ?>" data-media="<?php echo $data_media ?>"> <?php
    $slide_title = $slide['slide_title'];
    $slide_descr = str_replace( 'м2', 'м<sup>2</sup>', $slide['slide_descr']);
    $slide_link = $slide['link'];
    $title_tag = $i === 0 ? 'h1' : 'h2';
    echo "<{$title_tag} class=\"hero-sect__slide-title\">{$slide_title}</{$title_tag}>" ?>
    <p class="hero-sect__slide-descr"><?php echo $slide_descr ?></p> <?php
    if ( $slide_link ) : ?>
      <a href="<?php echo $slide_link['url'] ?>" class="hero-sect__slide-link btn btn_green">Узнать стоимость</a> <?php
    endif ?>
    </div> <?php
  $i++;
  endforeach ?>
</section>