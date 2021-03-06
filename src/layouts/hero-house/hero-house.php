<?php 
  $house_fields = get_field( 'house_fields' );
  $title = get_the_title();
  $excerpt = get_the_excerpt();
  $area = $house_fields['area'];
  // $area_other = $house_fields['area_other'];
  $length = $house_fields['length'];
  $width = $house_fields['width'];
  $material = $house_fields['material'];
  $garage = $house_fields['garage'];
  $first_price = $house_fields['first_price'];
  $second_price = $house_fields['second_price'];
  $flex_text = $house_fields['flexible'];
  $thumbnail = get_the_post_thumbnail_url();
  $gallery = $house_fields['gallery'];
  $props = $GLOBALS['house_props'];
  // Категории дома
  $house_terms = $GLOBALS['house_terms'];
  // Остальные категории (второй свет, гараж и т.д.)
  $other_terms = $GLOBALS['house_other_terms'];

  $props['Общая площадь'] = $area . ' м<sup style="margin-top:-5px">2</sup>';


  // if ( $area_other ) {
  //   $props['Площадь террасы/балконов/крылец'] = $area_other . 'м<sup>2</sup>';
  // }

  $props['Длина'] = $length . ' м';
  $props['Ширина'] = $width . ' м';

  if ( $garage ) {
    $props['Гараж'] = $garage;
  }

  $descr_list = $house_fields['includes'];


  if ( !$descr_list['standart'] && !$descr_list['prestige'] ) {
    $page_id = $post->post_type === 'cases' ? 403 : 248;
    $descr_list = get_field( 'includes', $page_id );
  }

  $first_price_tooltip = $descr_list['standart'] . '<br>';
  $second_price_tooltip = $descr_list['prestige'];
  $descr_list = $descr_list['standart'] . '<br><br>' . $descr_list['prestige'];

  // На случай если будет гараж и что-то еще (лучше не удалять)
  // $categories = get_the_terms( $post->ID, 'house_properties' );

  // $other_terms = [];

  // foreach ( $house_terms as $cat ) {
  //   $parent_id = $cat->parent;

  //   if ( $parent_id === 0 ) {
  //     $parent_cat = null;
  //   } else {
  //     $parent_cat = get_term( $parent_id );
  //   }

  //   if ( $parent_cat->name !== 'Площадь дома' ) {
  //     if ( $parent_cat->name === 'Другое' ) {
  //       if ( $cat->name !== 'Гараж' ) {
  //         $other_terms[] = $cat->name;
  //       }
  //     } else {
  //       $props[ $parent_cat->name ] = $cat->name;
  //     }
  //   }
  // }

  $title = $post->post_type === 'projects' ? 'Проект ' . $title : $title;

  if ( !$excerpt ) {
    $excerpt = $house_fields['excerpt'];
  }

  if ( is_array( $other_terms ) ) {
    foreach ( $other_terms as $other_cat ) {
      $props[ $other_cat ] = 'Да';
    }
  } ?>

 <section class="house-sect sect">
  <div class="house-sect__sliders">
    <div class="house-sect__gallery house-slider" id="house-slider"> <?php
      foreach ( $gallery as $img ) : ?>
        <a data-fancybox="images" href="<?php echo $img ?>" class="house-slider__img-wrap"><img src="<?php echo $img ?>" alt="<?php echo $title ?>" class="house-slider__img"></a> <?php
      endforeach ?>
      <button type="button" class="house-slider__prev-clone"></button>
      <button type="button" class="house-slider__next-clone"></button>
    </div>
    <div class="house-sect__gallery-nav slider-nav">
      <div class="slider-nav__counter"><span class="slider-nav__counter-current">1</span>/<span class="slider-nav__counter-total">6</span></div>
    </div>
    <div class="house-sect__gallery-bottom house-nav" id="house-nav"> <?php
      foreach ( $gallery as $img ) : ?>
        <img src="<?php echo $img ?>" alt="<?php echo $title ?>" class="house-nav__img"> <?php
      endforeach ?>
    </div>
  </div>
  <div class="house-sect__text">
    <div class="house-sect__heading-block">
      <h1 class="house-sect__title"><?php echo $title ?></h1> <?php
      if ( $excerpt ) : ?>
        <p class="house-sect__excerpt"><?php echo $excerpt ?></p> <?php
      endif ?>
    </div>
    <ul class="house-sect__list"> <?php
      foreach ( $props as $key => $value ) :
        if ( $key === 'Материал' ) {
          $value .= '<span class="tooltip"><span class="tooltip-icon">i</span><span class="tooltip-text">' . $material . '</span></span>';
        } else {
          $value = $value;
        } ?>
        <li class="house-sect__list-item">
          <span class="house-sect__list-item-text"><?php echo $key ?></span>
          <span class="house-sect__list-item-text"><?php echo $value ?></span>
        </li> <?php
      endforeach ?>
    </ul> <?php 
    if ( $first_price['price'] || $second_price['price'] ) : ?>
      <div class="house-sect__prices"> <?php
        $prices = [ $first_price, $second_price ];

        if ( $first_price_tooltip && $second_price_tooltip ) {
          $prices_tooltips = [ $first_price_tooltip, $second_price_tooltip ];
        } else {
           $prices_tooltips = null;
        }

        for ( $i = 0, $len = count( $prices ); $i < $len; $i++ ) : ?>
          <div class="house-sect__price">
            <b class="house-sect__price-num"><?php echo $prices[ $i ]['price'] ?></b>
            <span class="house-sect__price-text"><?php
              echo $prices[ $i ]['text'];
              if ( $prices_tooltips ) : ?>
                <span class="tooltip"><span class="tooltip-icon">i</span><span class="tooltip-text"><?php echo $prices_tooltips[ $i ] ?></span></span></span> <?php
              endif ?>
          </div> <?php
        endfor ?>
      </div> <?php
    endif ?>
  </div>
  <div class="house-sect__descr-block"> <?php
    if ( $flex_text ) :
      foreach ( $flex_text as $text ) :
        if ( $text['p'] ) : ?>
          <p class="house-sect__p"><?php echo $text['p'] ?></p> <?php
        endif;
      endforeach;
    endif ?>
    <img src="<?php echo $gallery[1] ?>" alt="<?php echo $title ?>" class="house-sect__img">
    <div class="house-sect__descr"> <?php
      echo $descr_list ?>
    </div>
  </div>
 </section>