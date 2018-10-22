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
Simpale.toTop = function () {
  const rocketContainer = document.getElementById('rocket')
  if (rocketContainer !== null) {
    window.addEventListener('scroll', function () {
      if (document.documentElement.scrollTop > 200) {
          document.querySelector("#rocket").classList.add("show");
      } else {
          document.querySelector("#rocket").classList.remove("show");
      }
    });
    document.querySelector('#rocket').addEventListener('click', function(e) {
      e.preventDefault();
      smoothScroll($(window), 0, 200);
    });
  }
}
Simpale.toTop()
