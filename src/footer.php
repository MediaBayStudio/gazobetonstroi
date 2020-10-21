<?php
  global 
    $site_url,
    $template_directory ?>
<footer class="ftr container">
  <div class="ftr__top">
    <img src="#" data-src="<?php echo $template_directory ?>/img/logo-img.svg" alt="Логотип Газобетонстрой" class="ftr__logo-img lazy">
    <img src="#" data-src="<?php echo $template_directory ?>/img/logo.svg" alt="Логотип Газобетонстрой" class="ftr__logo-text lazy">
    <span class="ftr__copy">
      2008-<?php echo date('Y') ?> &copy; Группа компаний <br>
      <q>СипМонтаж</q>
    </span>
  </div> <?php 
  wp_nav_menu( [
    'theme_location'  => 'header_menu',
    'container'       => 'nav',
    'container_class' => 'ftr__nav',
    'menu_class'      => 'ftr__nav-list',
    'items_wrap'      => '<ul class="%2$s">%3$s</ul>'
  ] ) ?>
  <div class="ftr__bottom">
    <a href="policy.pdf" rel="noopener noreferrer nofollow" target="_blank" class="ftr__policy text_underline" title="Посмотреть политику конфиденциальности">Политика конфиденциальности</a>
    <div class="ftr__dev">
    Дизайн и разработка – <a href="https://media-bay.ru" target="_blank" class="ftr__dev-link" title="Перейти на сайт разработчика">media bay</a>
    </div>
  </div>
</footer>
<div id="fake-scrollbar"></div> <?php
require 'template-parts/thanks-popup.php';
require 'template-parts/zoom-popup.php';
require 'template-parts/gallery-popup.php';
require 'template-parts/overlay.php';
if ( is_super_admin() || is_admin_bar_showing() ) {
  require 'template-parts/import-popup.php';
}
wp_footer() ?>
  </body>
</html>