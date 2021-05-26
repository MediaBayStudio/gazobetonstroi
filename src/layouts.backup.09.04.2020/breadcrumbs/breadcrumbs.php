<?php

$parent = wp_get_post_parent_id( $post );

if ( $parent !== 0 ) {
  $href = get_the_permalink( $parent );
  $text = get_the_title( $parent );
} else if ( is_singular( 'projects' ) ) {
  $href = 'projects';
  $text = 'Проекты';
} else if ( is_singular( 'cases' ) ) {
  $href = 'cases';
  $text = 'Наши работы';
} else if ( is_single() ) {
  $href = 'news';
  $text = 'Новости';
} ?>

<div class="breadcrumbs container">
  <ul class="breadcrumbs__list">
    <li class="breadcrumbs__item">
      <a href="<?php echo $href ?>" class="breadcrumbs__link"><?php echo $text ?></a>
    </li>
    <li class="breadcrumbs__item current">
      <a href="<?php the_permalink() ?>" class="breadcrumbs__link"><?php the_title() ?></a>
    </li>
  </ul>
</div>