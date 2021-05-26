<?php
$projects = $section['projects'] ?>
<section class="projects-sect container" id="projects-sect"> <?php
  for ( $i = 0, $len = count( $projects ); $i < $len; $i++ ) :
    $gallery = $projects[$i]['gallery'] ?><div class="project">
      <div class="project__slider">
      <div class="slider-nav project__nav">
        <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
      </div> <?php
        foreach ( $gallery as $img ) : ?>
          <a data-fancybox="images" href="<?php echo $img ?>" class="project__img-wrap"><img src="<?php echo $img ?>" alt="#" data-slider="<?php echo $i ?>" class="project__img"></a> <?php
        endforeach ?>
        <button type="button" class="project__prev-clone"></button>
        <button type="button" class="project__next-clone"></button>
      </div>
      <strong class="project__title"><?php echo $projects[$i]['title'] ?></strong>
      <p class="project__descr"><?php echo $projects[$i]['descr'] ?></p>
    </div><?php
  endfor ?>
</section>