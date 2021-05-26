<?php
$sect_title = $section['sect_title'];
$stages = $section['stages_repeater'];
$img_path = $template_directory . '/img/stages-bg.';
$lg = 'linear-gradient(1deg, #fff, #fff),';
$data_src = $lg . ' url(' . $img_path . '1920.jpg)';
// $data_src = $lg . ' url(' . $img_path . '576.jpg)';
/*$data_media = '(min-width:575.98px){'.$lg.' url(' . $img_path . '768.jpg)}(min-width:767.98px){'.$lg.' url(' . $img_path . '1024.jpg)}(min-width:1023.98px){'.$lg.' url(' . $img_path . '1440.jpg)}(min-width:1439.98px){'.$lg.' url(' . $img_path . '1920.jpg)}'*/ ?>

<section class="stages-sect sect lazy" data-src="<?php echo $data_src ?>" data-title="<?php echo $sect_title ?>">
  <h2 class="stages-sect__title sect-title"><?php echo $sect_title ?></h2>
  <div class="stages-sect__stages" id="stages-slider">
    <div class="slider-nav stages__nav"></div>
    <div class="slider-nav__counter stages__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div> <?php
    for ( $i = 0, $len = count( $stages ); $i < $len; $i++ ) :
      $order_class = $stages[$i + 1] ? '' : ' last' ?>
      <div class="stage<?php echo $order_class ?>">
        <span class="stage__number">Этап <?php echo $i + 1 ?></span>
        <h3 class="stage__title"><?php echo $stages[$i]['title'] ?></h3>
        <p class="stage__descr"><?php echo $stages[$i]['descr'] ?></p>
      </div> <?php
    endfor ?>
  </div>
</section>