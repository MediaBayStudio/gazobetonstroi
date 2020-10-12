<?php

add_action( 'init', function() {

  register_post_type( 'projects', [
    'label'  => null,
    'labels' => [
      'name'               => 'Типовые проекты',
      'singular_name'      => 'Проект',
      'add_new'            => 'Добавить',
      'add_new_item'       => 'Добавление',
      'edit_item'          => 'Редактирование',
      'new_item'           => 'Новое ',
      'view_item'          => 'Смотреть',
      'search_items'       => 'Искать',
      'not_found'          => 'Не найдено',
      'not_found_in_trash' => 'Не найдено в корзине',
      'parent_item_colon'  => '',
      'menu_name'          => 'Типовые проекты',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => null,
    'rest_base'           => null,
    'menu_position'       => null,
    'menu_icon'           => null,
    'hierarchical'        => false,
    'supports'            => [ 'title', 'thumbnail' ],
    'taxonomies'          => [ 'house_properties' ],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true
  ] );

  register_post_type( 'cases', [
    'label'  => null,
    'labels' => [
      'name'               => 'Наши проекты',
      'singular_name'      => 'Проект',
      'add_new'            => 'Добавить',
      'add_new_item'       => 'Добавление',
      'edit_item'          => 'Редактирование',
      'new_item'           => 'Новое ',
      'view_item'          => 'Смотреть',
      'search_items'       => 'Искать',
      'not_found'          => 'Не найдено',
      'not_found_in_trash' => 'Не найдено в корзине',
      'parent_item_colon'  => '',
      'menu_name'          => 'Наши проекты',
    ],
    'description'         => '',
    'public'              => true,
    'show_in_menu'        => null,
    'show_in_rest'        => null,
    'rest_base'           => null,
    'menu_position'       => null,
    'menu_icon'           => null,
    'hierarchical'        => false,
    'supports'            => [ 'title', 'thumbnail' ],
    'taxonomies'          => [ 'house_properties' ],
    'has_archive'         => false,
    'rewrite'             => true,
    'query_var'           => true
  ] );


  register_taxonomy( 'house_properties', [ 'projects', 'cases' ], [ 
    'label'                 => '',
    'labels'                => [
      'name'              => 'Характеристики',
      'singular_name'     => 'Характеристики',
      'search_items'      => 'Искать',
      'all_items'         => 'Показать все',
      'view_item '        => 'Показать',
      'parent_item'       => 'Роидетель',
      'parent_item_colon' => 'Роидетель:',
      'edit_item'         => 'Редактирование',
      'update_item'       => 'Обновить',
      'add_new_item'      => 'Добавить новый',
      'new_item_name'     => 'Имя',
      'menu_name'         => 'Характеристики',
    ],
    'description'           => '',
    'public'                => true,
    'hierarchical'          => true,
    'rewrite'               => true,
    'capabilities'          => [],
    'meta_box_cb'           => null,
    'show_admin_column'     => false,
    'show_in_rest'          => null,
    'rest_base'             => null
  ] );


});