// some of TOC js code is from hugo-theme-even
const smoothScroll = function (el, to, duration) {
  if (duration < 0) {
      return;
  }
  var difference = to - $(window).scrollTop();
  var perTick = difference / duration * 10;
  this.scrollToTimerCache = setTimeout(function() {
      if (!isNaN(parseInt(perTick, 10))) {
          window.scrollTo(0, $(window).scrollTop() + perTick);
          smoothScroll(el, to, duration - 10);
      }
  }.bind(this), 10);
}
const Simpale = {}
Simpale._refactorToc = function (toc) {
  // when headings do not start with `h1`
  const oldTocList = toc.children[0]
  let newTocList = oldTocList
  let temp
  while (newTocList.children.length === 1 && (temp = newTocList.children[0].children[0]).tagName === 'UL') newTocList = temp

  if (newTocList !== oldTocList) toc.replaceChild(newTocList, oldTocList)
}

Simpale._linkToc = function () {
  const links = document.querySelectorAll('#TableOfContents a:first-child')
  for (let i = 0; i < links.length; i++) links[i].className += ' toc-link'

  for (let num = 1; num <= 6; num++) {
    const headers = document.querySelectorAll('.post-content>h' + num)
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]
      header.innerHTML = `<a href="#${header.id}" class="headerlink"></a>${header.innerHTML}`
    }
  }
}

Simpale._initToc = function () {
  const SPACING = 20
  const $toc = $('.post-toc')
  const $footer = $('.post-footer')

  if ($toc.length) {
    const minScrollTop = $toc.offset().top - SPACING
    const maxScrollTop = $footer.offset().top - $toc.height() - SPACING

    const tocState = {
      start: {
        'position': 'absolute',
        'top': minScrollTop
      },
      process: {
        'position': 'fixed',
        'top': SPACING
      },
      end: {
        'position': 'absolute',
        'top': maxScrollTop
      }
    }

    $(window).scroll(function () {
      const scrollTop = $(window).scrollTop()

      if (scrollTop < minScrollTop) {
        $toc.css(tocState.start)
      } else if (scrollTop > maxScrollTop) {
        $toc.css(tocState.end)
      } else {
        $toc.css(tocState.process)
      }
    })
  }

  const HEADERFIX = 30
  const $toclink = $('.toc-link')
  const $headerlink = $('.headerlink')
  const $tocLinkLis = $('.post-toc-content li')

  const headerlinkTop = $.map($headerlink, function (link) {
    return $(link).offset().top
  })

  const headerLinksOffsetForSearch = $.map(headerlinkTop, function (offset) {
    return offset - HEADERFIX
  })

  const searchActiveTocIndex = function (array, target) {
    for (let i = 0; i < array.length - 1; i++) {
      if (target > array[i] && target <= array[i + 1]) return i
    }
    if (target > array[array.length - 1]) return array.length - 1
    return -1
  }

  $(window).scroll(function () {
    const scrollTop = $(window).scrollTop()
    const activeTocIndex = searchActiveTocIndex(headerLinksOffsetForSearch, scrollTop)

    $($toclink).removeClass('active')
    $($tocLinkLis).removeClass('has-active')

    if (activeTocIndex !== -1) {
      $($toclink[activeTocIndex]).addClass('active')
      let ancestor = $toclink[activeTocIndex].parentNode
      while (ancestor.tagName !== 'NAV') {
        $(ancestor).addClass('has-active')
        ancestor = ancestor.parentNode.parentNode
      }
    }
  })
  // toc smooth scroll
  $('.toc-link').on('click', function(e) {
    e.preventDefault();
    smoothScroll($(window), $($(e.currentTarget).attr('href')).offset().top, 200);
  });
}
Simpale.toc = function () {
  const tocContainer = document.getElementById('post-toc')
  if (tocContainer !== null) {
    const toc = document.getElementById('TableOfContents')
    if (toc === null) {
      // toc = true, but there are no headings
      tocContainer.parentNode.removeChild(tocContainer)
    } else {
      this._refactorToc(toc)
      this._linkToc()
      this._initToc()
    }
  }
}
Simpale.toTop = function () {
  const rocketContainer = document.getElementById('rocket')
  if (rocketContainer !== null) {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 200) {
          $("#rocket").addClass("show");
      } else {
          $("#rocket").removeClass("show");
      }
    });
    $('#rocket').on('click', function(e) {
      e.preventDefault();
      smoothScroll($(window), 0, 200);
    });
  }
}
Simpale.toTop()
Simpale.toc()
