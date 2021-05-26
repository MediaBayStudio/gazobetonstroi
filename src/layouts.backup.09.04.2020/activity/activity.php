<?php 
  $sect_links = $section['sect_links'] ?>

<div class="activity-block sect"> <?php
  foreach ( $sect_links as $link )  :
    $href = $link['link']['url'] ?><!-- 
     --><div class="activity">
      <div class="activity__text">
        <strong class="activity__title"><?php echo $link['link']['title'] ?></strong>
        <p class="activity__descr"><?php echo $link['descr'] ?></p>
        <ul class="activity__list"> <?php
          foreach ( $link['list'] as $li ) : ?>
            <li class="activity__list-item">– <?php echo $li['list_item'] ?></li><?php
          endforeach ?>
        </ul>
        <a href="<?php echo $href ?>" class="activity__link btn btn_yellow btn_text-black">Подробнее</a>
      </div><!-- 
       --><img src="#" data-src="<?php echo $link['img'] ?>" alt="" class="activity__img lazy">
    </div><!--   --><?php
  endforeach ?>
</div>
