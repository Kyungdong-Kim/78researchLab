$(document).ready(function () {
  // reload
  history.scrollRestoration = "manual"
  $('header .logo').click(function(){
    location.href = 'https://www.78researchlab.com/';
  });

  // window scroll event
  const sec1 = $('.sec1').offset().top;
  $(window).scroll(function(){
    let sct = $(window).scrollTop();
    if(sct >= (sec1/2)){
      $('header').addClass('active');
      $('.sec1 .bottom table tbody tr:last-child, .sec1 .bottom table tbody tr td .iconBox.doubleCircleIcon').addClass('active');
    } else {
      $('header').removeClass('active');
      $('.sec1 .bottom table tbody tr:last-child, .sec1 .bottom table tbody tr td .iconBox.doubleCircleIcon').removeClass('active');
    }
  });
});