<?php
$sect_title = $section['sect_title'];
$tabs = $section['tabs'];
$tabs_id = $section['tabs_id'];
$text_id = $section['text_id'];
$sect_radio_group_id = $section['radio_id'];

$details_bg_path = $template_directory . '/img/details-bg.';

$data_src = 'url(' . $details_bg_path . '576.jpg)';
$data_media = '(min-width:576.98px){url(' . $details_bg_path . '768.jpg)}(min-width:767.98px){url(' . $details_bg_path . '1024.jpg)}(min-width:1023.98px){url(' . $details_bg_path . '1440.jpg)}(min-width:1439.98px){url(' . $details_bg_path . '1920.jpg)}';

$tabs_buttons = '';
$details_text_block = '';

?>

<section class="details-sect sect lazy" data-src="<?php echo $data_src ?>" data-media="<?php echo $data_media ?>">
  <h2 class="details-sect__title sect-title"><?php echo $sect_title ?></h2>

  <div class="details details-sect__details">

  <div role="tablist" aria-label="<?php echo $sect_title ?>" class="details__btns" id="details-btns"> <?php
    for ( $i = 0, $len = count( $tabs ); $i < $len; $i++ )  {
      $current_tabs_tabindex = $i === 0 ? '0' : '-1';
      $current_aria_selected = $i === 0 ? 'true' : 'false';
      $current_aria_hidden = $i === 0 ? 'false' : 'true';
      $current_class = $i === 0 ? ' is-active' : '';
      $current_text_id = $text_id . '-' . $i;
      $current_tabs_id = $tabs_id . '-' . $i;

      $btn = '<button type="button" role="tab" aria-selected="'.$current_aria_selected.'" aria-controls="'.$current_text_id.'" id="'.$current_tabs_id.'" tabindex="'.$current_tabs_tabindex.'" class="details__btn'.$current_class.'"><span class="details__btn-text">'.$tabs[$i]['btn'].'</span></button>';

      $tabs_buttons .= $btn;

      $text = '<div id="'.$current_text_id.'" role="tabpanel" tabindex="0" aria-labelledby="'.$current_tabs_id.'" aria-hidden="'.$current_aria_hidden.'" class="details__text'.$current_class.'"><h3 class="details__text-title">'.$tabs[$i]['title'].'</h3><p class="details__text-descr">'.$tabs[$i]['descr'].'</p></div>';

      $details_text_block .= $text;

    }
    echo $tabs_buttons ?>
  </div>
  <div class="details__text-block" id="details-text"><?php
    echo $details_text_block ?>
  </div>
</div>
</section> <?php
  unset( $btn );
  unset( $text );
  unset( $current_tabs_tabindex );
  unset( $current_aria_selected );
  unset( $current_aria_hidden );
  unset( $current_text_id );
  unset( $current_tabs_id ) ?>