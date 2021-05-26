<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'];

$colored_class = $section['color'] ? ' quiz-sect_green' : '';
$quiz_sect_img = $template_directory . '/img/quiz-img';
if ( $section['color'] ) {
  $quiz_sect_img .= '-green.svg';
} else {
  $quiz_sect_img .= '.svg';
} ?>

<section class="quiz-sect sect<?php echo $colored_class ?>">
  <div class="quiz-sect__text">
    <h2 class="quiz-sect__title sect-title"><?php echo $sect_title ?></h2>
    <p class="quiz-sect__descr"><?php echo $sect_descr ?></p>
  </div>
  <div class="quiz-sect__quiz" id="quiz"> <?php
    echo do_shortcode( '[contact-form-7 id="319" html_class="quiz-form" html_id="quiz-form"]' ) ?>
  </div>
  <img src="#" data-src="<?php echo $quiz_sect_img ?>" alt="" class="quiz-sect__img lazy">
</section>