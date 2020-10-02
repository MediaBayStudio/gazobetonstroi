<?php
$sect_title = $section['sect_title'];
$sect_descr = $section['sect_descr'];

$colored_class = $section['color'] ? ' quiz-sect_green' : '' ?>

<section class="quiz-sect sect<?php echo $colored_class ?>">
  <div class="quiz-sect__text">
    <h2 class="quiz-sect__title sect-title"><?php echo $sect_title ?></h2>
    <p class="quiz-sect__descr"><?php echo $sect_descr ?></p>
  </div>
  <div class="quiz-sect__quiz" id="quiz">
    <div class="quiz-form-wrap">
      <form action="" id="quiz-form">
        <textarea name="quiz-result" class="quiz__form-result"></textarea>
      </form>
    </div>
  </div>
</section>