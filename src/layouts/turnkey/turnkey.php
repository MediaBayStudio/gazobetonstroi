<?php
  $sect_title = $section['sect_title'];
  $paragraphs = $section['text'];
  $sect_tabs = $section['tabs'];
  $tabs_id = $section['tabs_id'];
  $text_id = $section['text_id'];
  $turnkey_text = '' ?>

<section class="turnkey-sect sect">
  <img src="#" data-src="<?php echo $template_directory ?>/img/turnkey-decor.png" alt="" class="turnkey-sect__decor lazy">
  <h2 class="turnkey-sect__title sect-title"><?php echo $sect_title ?></h2>
  <div class="turnkey-sect__text"> <?php
  foreach ( $paragraphs as $p ) : ?>
    <p class="turnkey-sect__descr"><?php echo $p['p'] ?></p> <?php
  endforeach ?>
  </div>
  <div class="turnkey-sect__tabs-btns" id="turnkey-tabs-btns"> <?php
    for ( $i = 0, $len = count( $sect_tabs ); $i < $len; $i++ ) :
      $current_tabs_tabindex = $i === 0 ? '0' : '-1';
      $current_aria_selected = $i === 0 ? 'true' : 'false';
      $current_aria_hidden = $i === 0 ? 'false' : 'true';
      $current_class = $i === 0 ? ' is-active' : '';
      $current_text_id = $text_id . '-' . $i;
      $current_tabs_id = $tabs_id . '-' . $i;

      $btn = '<button type="button" role="tab" aria-selected="'.$current_aria_selected.'" aria-controls="'.$current_text_id.'" id="'.$current_tabs_id.'" tabindex="'.$current_tabs_tabindex.'" class="turnkey-sect__btn'.$current_class.'"><span class="turnkey-sect__btn-text">'.$sect_tabs[$i]['btn'].'</span></button>';
      echo $btn;

      $text = '<div id="'.$current_text_id.'" role="tabpanel" tabindex="0" aria-labelledby="'.$current_tabs_id.'" aria-hidden="'.$current_aria_hidden.'" class="turnkey-sect__tab-cnt'.$current_class.'"><span class="turnkey-sect__tab-cnt-title">'.$sect_tabs[$i]['btn'].'</span><p class="turnkey-sect__tab-cnt-descr">'.$sect_tabs[$i]['descr'].'</p></div>';

      $turnkey_text .= $text;
    endfor ?>
    <img src="#" data-src="<?php echo $template_directory ?>/img/turnkey-img.jpg" alt="" class="turnkey-sect__img lazy">
  </div>
  <div class="turnkey-sect__tabs-cnt" id="turnkey-tabs-text-block"> <?php
    echo $turnkey_text ?>
  </div>
</section> <?php
  unset( $btn );
  unset( $turnkey_text );
  unset( $text );
  unset( $current_tabs_tabindex );
  unset( $current_aria_selected );
  unset( $current_aria_hidden );
  unset( $current_text_id );
  unset( $current_tabs_id ) ?>