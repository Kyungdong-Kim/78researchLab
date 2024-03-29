$(document).ready(function () {
  // reload
  history.scrollRestoration = "manual"
  $('header .logo').click(function(){
    location.reload();
  });

  // window scroll event
  const sec1 = $('.sec1').offset().top;
  $(window).scroll(function(){
    let sct = $(window).scrollTop();
    if(sct >= (sec1/2)){
      $('header').addClass('active');
      $('.sec1 .bottom table tbody tr:last-child, .sec1 .bottom table tbody tr:last-child td .iconBox.circleIcon').addClass('active');
    } else {
      $('header').removeClass('active');
      $('.sec1 .bottom table tbody tr:last-child, .sec1 .bottom table tbody tr:last-child td .iconBox.circleIcon').removeClass('active');
    }
  });

  $(window).scroll(function () {
    let sct = $(window).scrollTop();
    // 1-2-1. Header
    if (sct < (sec1 - 50)) {
      $('header').removeClass('active');
    } else {
      $('header').addClass('active');
    }
  });
});