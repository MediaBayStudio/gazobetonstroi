<?php
  $post_type = $section['post_type'];
  $numberposts = $section['numberposts'];

  if ( $_GET ) {
    // var_dump( $_GET );
    $filter = [];
    foreach ( $_GET as $cat_slug => $cat_id ) {
      if ( is_array( $cat_id ) ) {
        foreach ( $cat_id as $id ) {
          $filter[] = $id;
        }
      } else {
        $filter[] = $cat_id;
      }
    }

    $filter = [ [
      'taxonomy' => 'house_properties',
      'terms' => implode( ',', $filter )
    ] ];

  } else {
    $filter = '';
  }
  #var_dump( $filter );


  $posts = get_posts( [
    'post_type' => $post_type,
    'numberposts' => $numberposts,
    'tax_query' => $filter
  ] ) ?>

  <?php #var_dump( $posts ) ?>

<div class="houses sect">
  <form action="<?php the_permalink() ?>" method="get" class="houses__filter filter-form" id="filter-form">
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
      $parent_id = $categories[$i]->parent;
      $term_id = $categories[$i]->term_id;

      if ( $parent_id !== 0 ) {
        $child_terms[ $parent_id ][] = [
          'title' => $categories[$i]->name,
          'slug'  => $categories[$i]->slug,
          'count' => $categories[$i]->count,
          'id'  => $term_id
        ];
        
      } else {
        if ( get_field( 'show_in_filters', $categories[$i]) ) {
          $parent_terms[ $term_id ] = [
            'title' => $categories[$i]->name,
            'slug'  => $categories[$i]->slug,
            'count' => $categories[$i]->count,
            'id'  => $term_id
          ];
        }
      }
    }

    foreach ( $parent_terms as $term ) : ?>
      <fieldset class="filter-form__group">
        <legend class="filter-form__group-title"><?php echo $term['title'] ?></legend> <?php
        $childs = $child_terms[ $term['id'] ];
        foreach ( $childs as $child ) : ?>
          <label class="check filter-form__check">
            <input type="checkbox" name="<?php echo $term['slug'] ?>[]" value="<?php echo $child['id'] ?>" class="check__inp">
            <span class="check__checkbox"></span>
            <span class="check__text"><?php echo $child['title'] ?></span>
          </label> <?php
        endforeach ?>
      </fieldset> <?php
    endforeach ?>

     <div class="filter-form__bottom">
      <button class="filter-form__btn btn btn_green btn_text-white">Применить</button>
      <button type="reset" class="filter-form__reset text_underline">Сбросить фильтр</button>
     </div>
  </form>
  <div class="houses__cards"> <?php
    print_houses( $posts, 'houses' ) ?>
  </div>
</div>