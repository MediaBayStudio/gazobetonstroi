<?php 
  $house_fields = get_field( 'house_fields' );
  $title = get_the_title();
  $excerpt = get_the_excerpt();
  $area = $house_fields['area'];
  // $area_other = $house_fields['area_other'];
  $length = $house_fields['length'];
  $width = $house_fields['width'];
  $material = $house_fields['material'];
  $first_price = $house_fields['first_price'];
  $second_price = $house_fields['second_price'];
  $flex_text = $house_fields['flexible'];
  $thumbnail = get_the_post_thumbnail_url();
  $gallery = $house_fields['gallery'];
  $categories = get_categories( [
    'taxonomy'  => 'house_properties',
    'hide_empty' => 0
  ] );
  // array_unshift( $gallery, $thumbnail );

  $props = [
    'Общая площадь' => $area . 'м<sup>2</sup>'
  ];

  // if ( $area_other ) {
  //   $props['Площадь террасы/балконов/крылец'] = $area_other . 'м<sup>2</sup>';
  // }

  $props['Длина'] = $length . 'м';
  $props['Ширина'] = $width . 'м';


  $categories = get_the_terms( $post->ID, 'house_properties' );

  foreach ( $categories as $cat ) {
    $parent_id = $cat->parent;

    if ( $parent_id === 0 ) {
      $parent_cat = null;
    } else {
      $parent_cat = get_term( $parent_id );
    }

    if ( $parent_cat->name !== 'Площадь дома' ) {
      $props[ $parent_cat->name ] = $cat->name;
    }
    
  }

 ?>

 <section class="house-sect sect">
  <div class="house-sect__sliders">
    <div class="house-sect__gallery house-slider" id="house-slider"> <?php
      foreach ( $gallery as $img ) : ?>
        <img src="<?php echo $img ?>" alt="" class="house-slider__img"> <?php
      endforeach ?>
    </div>
    <div class="house-sect__gallery-nav slider-nav">
      <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
    </div>
    <div class="house-sect__gallery-bottom house-nav" id="house-nav"> <?php
      foreach ( $gallery as $img ) : ?>
        <img src="<?php echo $img ?>" alt="" class="house-nav__img"> <?php
      endforeach ?>
    </div>
  </div>
  <div class="house-sect__text">
    <h1 class="house-sect__title">Проект <?php echo $title ?></h1> <?php
    if ( $excerpt ) : ?>
      <p class="house-sect__descr"><?php echo $excerpt ?></p> <?php
    endif ?>
    <ul class="house-sect__list"> <?php
      foreach ( $props as $key => $value ) : ?>
        <li class="house-sect__list-item">
          <span class="house-sect__list-item-text"><?php echo $key ?></span>
          <span class="house-sect__list-item-text"><?php echo $value ?></span>
        </li> <?php
      endforeach ?>
    </ul>
    <div class="house-sect__prices">
      <div class="house-sect__price">
        <b class="house-sect__price-num"><?php echo $first_price['price'] ?></b>
        <span class="house-sect__price-text"><?php echo $first_price['text'] ?></span>
      </div>
      <div class="house-sect__price">
        <b class="house-sect__price-num"><?php echo $second_price['price'] ?></b>
        <span class="house-sect__price-text"><?php echo $second_price['text'] ?></span>
      </div>
    </div>
  </div>
  <div class="house-sect__descr-block">
    <div class="house-sect__descr"> <?php
      echo $house_fields['descr_list'] ?>
    </div>
    <img src="<?php echo $gallery[1] ?>" alt="" class="house-sect__img">
  </div>
 </section>