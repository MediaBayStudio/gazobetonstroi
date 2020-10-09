<?php
  $is_sect = $section['is_sect'];

  if ( $text_block ) {
    unset( $text_block );
  } else {
    $text_block = $section['text_block'];
    $text_block_title = $text_block['title'];
    $text_block_descr = $text_block['descr'];
  }

if ( $is_sect ) : ?>
  <section class="callback-sect sect"> <?php
endif;
if ( $text_block ) :?>
  <div class="callback-sect__text-block">
    <b class="b"><?php echo $text_block_title ?></b>
    <p class="p"><?php echo $text_block_descr ?></p>
  </div><?php
endif ?><div class="callback-form-wrap lazy" data-src="url(<?php echo $template_directory ?>/img/callback-form-img.png)"> <?php
echo do_shortcode( '[contact-form-7 id="380" html_class="callback-form" html_id="callback-form"]' ) ?>
</div> <?php
if ( $is_sect ) : ?>
  </section> <?php
endif ?>