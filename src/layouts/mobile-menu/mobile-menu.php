<aside class="menu">
  <div class="menu__cnt">
    <div class="menu__hdr">
      <a href="/" class="menu__logo" title="На главную">
        <img src="#" data-src="<?php echo $template_directory ?>/img/logo-black.svg" alt="Логотип Газобетонстрой" class="menu__logo-img lazy">
      </a> 
    </div> <?php
    # Меню используем из header
    wp_nav_menu( [
      'theme_location'  => 'header_menu',
      'container'       => 'nav',
      'container_class' => 'menu__nav',
      'menu_class'      => 'menu__nav-list',
      'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
    ] ) ?>
    <button type="button" class="btn btn_green btn_text-white">Рассчитать стоимость</button>
  </div>
</aside>