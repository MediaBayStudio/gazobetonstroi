<?php
// Добавляем кнопку для импорта в админ панель
add_action( 'admin_bar_menu', function() {
  global $wp_admin_bar;
  $wp_admin_bar->add_menu( [
    'id'    => 'import-btn',
    'title' => __('Импорт товаров'),
    'href'  => '',
    'meta'  => [
      'onclick' => 'showImportPopup()' // функция инициализирована в js/components/main/_utils.js и объявлена в js/components/main/_importCatalog.js
    ]
  ] );
}, 100 );