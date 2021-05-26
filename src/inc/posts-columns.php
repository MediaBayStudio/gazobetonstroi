<?php

function manage_columns( $columns ) {
  $num = 1; // после какой по счету колонки вставлять новые

  $new_columns = [
    'title' => 'Название',
    'thumbnail' => 'Миниатюра',
    'props' => 'Характеристики',
    'modified' => 'Дата изменения',
    'date' => 'Дата публикации'
  ];

  return array_slice($columns, 0, $num) + $new_columns + array_slice($columns, $num);
}

function namage_custom_column( $colname, $post_id ) {
  $house_fields = get_field( 'house_fields', $post_id );
  $post_type = get_post_type( $post_id );

  switch ( $colname ) {
    case 'thumbnail':
      echo '<img src="' . get_the_post_thumbnail_url( $post_id ) . '" style="object-fit:cover;width:75px;height:75px">';
      break;
    case 'title':
      echo '<p>' . get_the_title( $post_id ) . '</p>';
      break;
    case 'modified':
      echo '<p>Изменено<br>' . get_the_modified_date( 'd.m.Y, G:i' ) . '</p>';
      break;
    case 'props':
      if ( $post_type === 'single' ) {
        echo '<p>Нет</p>';
        break;
      }
      $terms = get_the_terms( $post_id, 'house_properties' );
      foreach ( $terms as $term ) {
        $term_parent = $term->parent;
        if ( $term_parent ) {
          $parent = get_term( $term_parent );
          echo '<p><b>' . $parent->name . ': </b>';
        }

        if ( strpos( $term->name, 'м2' ) !== false ) {
          $area = $house_fields['area'];
          echo '' . $area . ' м2 (' . $term->name . ')';
        } else {
          echo $term->name;
        }
        echo '</p>';
      }
      break;
  }
}

function namage_sortable_columns( $sortable_columns ) {
  $sortable_columns['modified'] = ['modified_modified', false];
  return $sortable_columns;
}

// Создание новых колонок
add_filter( 'manage_projects_posts_columns', 'manage_columns', 4 );
add_filter( 'manage_cases_posts_columns', 'manage_columns', 4 );

// Заполнение колонок нужными данными
add_action( 'manage_projects_posts_custom_column', 'namage_custom_column', 5, 2);
add_action( 'manage_cases_posts_custom_column', 'namage_custom_column', 5, 2);

// добавляем возможность сортировать колонку
add_filter( 'manage_edit-projects_sortable_columns', 'namage_sortable_columns' );
add_filter( 'manage_edit-cases_sortable_columns', 'namage_sortable_columns' );