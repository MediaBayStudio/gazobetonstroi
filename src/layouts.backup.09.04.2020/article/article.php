<?php 
$post_datetime = get_the_date( 'Y-m-d' );
$post_date = get_the_date( 'd.m.Y' ) ?>
<article class="article" id="article">
  <h1 class="article__title"><?php the_title() ?></h1>
  <p class="article__descr"><?php the_excerpt() ?></p>
  <time datetime="<?php echo $post_datetime ?>" class="article__date"><?php echo $post_date ?></time>
  <img src="<?php the_post_thumbnail_url() ?>" alt="" class="article__thumbnail"> <?php
  the_content() ?>
</article>