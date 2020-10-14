<?php
  $post_type = $section['post_type'];
  // $numberposts = $section['numberposts'];
  $numberposts = 2;
  $count_posts = wp_count_posts( $post_type )->publish;

  $posts = get_posts( [
    'post_type' => $post_type,
    'numberposts' => $numberposts
  ] ); ?>

  <?php #var_dump( $posts ) ?>

<div class="houses container">
  <form action="<?php the_permalink() ?>" method="get" class="filter-form popup" id="filter-form" data-numberposts="<?php echo $numberposts ?>" data-post-type="<?php echo $post_type ?>">
    <button type="button" class="filter-form__close">
      <img src="<?php echo $template_directory ?>/img/icon-close.svg" alt="Иконка">
    </button>
    <span class="filter-form__title">Фильтр</span> <?php
    $categories = get_categories( [
      'taxonomy'  => 'house_properties',
      'hide_empty' => 0
    ] );

    $parent_terms = [];
    $child_terms = [];

    for ( $i = 0, $len = count( $categories ); $i < $len; $i++ ) {
      $cat = $categories[$i];
      $parent_id = $cat->parent;
      $term_id = $cat->term_id;
      $cat_title = $cat->name;
      $cat_slug = $cat->slug;
      $cat_count = $cat->count;
      $show_cat_in_filters = get_field( 'show_in_filters', $cat );

      // Если у таксономии нет родителей, т.е. она сама родительская
      if ( $parent_id === 0 ) {
        if ( $show_cat_in_filters ) {
          $parent_terms[ $term_id ] = [
            'title' => $cat_title,
            'slug'  => $cat_slug,
            'count' => $cat_count,
            'id'  => $term_id
          ];
        }
      // Дочерняя таксономия
      } else {
        if ( $show_cat_in_filters && $cat_count > 0 ) {
          // Поднимаем двойку в квадратном метре
          $cat_title = preg_replace( '/м2$/', 'м<sup>2</sup>', $cat_title );
          $child_terms[ $parent_id ][] = [
            'title' => $cat_title,
            'slug'  => $cat_slug,
            'count' => $cat_count,
            'id'  => $term_id
          ];
        }
      }
    }

    foreach ( $parent_terms as $term ) :
      $childs = $child_terms[ $term['id'] ];
      $childs_count = count( $childs );
      $fieldset_class = $childs_count > 3 ? ' dropdown' : '' ?>
      <fieldset class="filter-form__group<?php echo $fieldset_class ?>">
        <legend class="filter-form__group-title"><?php echo $term['title'] ?></legend> <?php
        foreach ( $childs as $child ) : ?>
          <label class="check check_fill filter-form__check">
            <input type="checkbox" name="<?php echo $term['slug'] ?>[]" value="<?php echo $child['id'] ?>" class="check__inp">
            <span class="check__text"><?php echo $child['title'] ?></span>
          </label> <?php
        endforeach ?>
      </fieldset> <?php
    endforeach ?>

     <div class="filter-form__bottom">
      <button type="reset" class="filter-form__reset text_underline">Сбросить фильтр</button>
     </div>
  </form>
  <button type="button" id="filter-form-call-btn"><img src="#" data-src="<?php echo $template_directory ?>/img/icon-filter.svg" alt="" class="lazy" style="padding-right:10px">Фильтр</button>
  <div class="houses__cards" id="houses-cards"> <?php
    print_houses( $posts, $post_type, $post_type, $numberposts, $count_posts ) ?>
  </div>
</div>