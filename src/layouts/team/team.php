<?php 
  $sect_title = $section['sect_title'];
  $team = $section['team'] ?>

<div class="team-sect sect">
  <h2 class="team-sect__title sect-title"><?php echo $sect_title ?></h2>
  <div class="team-sect__team" id="team-slider"> <?php
    foreach ( $team as $char )  : ?><div class="char">
        <div class="char__text">
          <span class="char__name"><?php echo $char['name'] ?></span>
          <span class="char__position"><?php echo $char['position'] ?></span>
        </div>
        <img src="#" data-src="<?php echo $char['photo'] ?>" alt="<?php echo $char['name'] ?>" class="char__photo lazy">
      </div><?php
    endforeach ?>
  </div>
  <div class="slider-nav team-sect__nav">
    <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
  </div>
</div>
