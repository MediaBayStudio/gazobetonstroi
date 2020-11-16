;(function() {
  let article = id('article');
  if (article) {
    let links = qa('a[href^="#"]', article);

    for (var i = links.length - 1; i >= 0; i--) {
      links[i].addEventListener('click', scrollToTarget);
    }

    console.log(links);
  }
})();