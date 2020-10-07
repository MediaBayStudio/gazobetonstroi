<?php
 /* Настройка контактов в панели настройки->общее */
// Функции вывода нужных полей
  function options_inp_html ( $id ) {
    $html_start = "<input type='text' name='" . $id . "' value='";
    $html_end = "'>";

    // if ( $id === 'contacts_address' ) {
    //   $html_start = "<textarea name='" . $id . "' cols='40' rows='4' value='";
    //   $html_end = "'></textarea>";
    // }

    echo $html_start . esc_attr( get_option( $id ) ) . $html_end;
  }

  add_action( 'admin_init', function() {
    $options = [
      'tel_1'     =>  'Телефон 1',
      'tel_2'     =>  'Телефон 2',
      'tel_3'     =>  'Телефон 3',
      'address' =>  'Адрес',
      'email'   =>  'E-mail',
      'insta'   =>  'Instagram'
    ];

    foreach ($options as $id => $name) {
      $my_id = 'contacts_' . $id;

      add_settings_field( $id, $name, 'options_inp_html', 'general', 'default', $my_id );
      register_setting( 'general', $my_id );
    }
  } );

