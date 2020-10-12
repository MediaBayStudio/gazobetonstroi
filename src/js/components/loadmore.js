;
(function() {
  let $newsSect = id('news-sect'),
    $loadmoreBtn = id('loadmore-btn');

  if ($newsSect && $loadmoreBtn) {
    let totalCountPosts = $newsSect.dataset.postsCount,
      numberposts = $newsSect.dataset.numberposts,
      pageUri = $newsSect.dataset.pageUri,
      postsOnPage = qa('.post', $newsSect),
      loadPosts = function(event) {
        $loadmoreBtn.classList.add('loading');
        $loadmoreBtn.blur();

        let xhr = new XMLHttpRequest(),
          data = 'action=print_posts&numberposts=' + numberposts + '&offset=' + postsOnPage.length;

        xhr.open('POST', siteUrl + '/wp-admin/admin-ajax.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);

        xhr.addEventListener('readystatechange', function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            let posts = xhr.response;
            
            $loadmoreBtn.classList.remove('loading');
            $loadmoreBtn.insertAdjacentHTML('beforebegin', posts);
            postsOnPage = qa('.post', $newsSect);

            $newsSect.style.maxHeight = $newsSect.scrollHeight + 'px';

            if (postsOnPage.length == totalCountPosts) {
              $loadmoreBtn.setAttribute('hidden', '');
            } else {
              $loadmoreBtn.focus();
            }

          }
        });
      };

    $newsSect.style.maxHeight = $newsSect.scrollHeight + 'px';
    $newsSect.removeAttribute('data-page-uri');

    $loadmoreBtn.addEventListener('click', loadPosts);

    console.log('totalCountPosts', totalCountPosts);
    console.log('numberposts', numberposts);
  }

})();