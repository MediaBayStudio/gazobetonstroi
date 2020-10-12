<?php
$projects = $section['projects'] ?>
<section class="projects-sect container" id="projects-sect"> <?php
  foreach ( $projects as $project ) :
    $gallery = $project['gallery'] ?>
    <div class="project">
      <div class="project__slider">
      <div class="slider-nav project__nav">
        <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
      </div> <?php
        foreach ( $gallery as $img ) : ?>
          <img src="<?php echo $img ?>" alt="" class="project__img"> <?php
        endforeach ?>
      </div>
      <strong class="project__title"><?php echo $project['title'] ?></strong>
      <p class="project__descr"><?php echo $project['descr'] ?></p>
    </div> <?php
  endforeach ?>
</section>