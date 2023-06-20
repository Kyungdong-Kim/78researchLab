$(document).ready(function () {
	// 1. banner slide
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    autoplay : true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      861: {
        slidesPerView: 1,
        spaceBetween: 30,
      },
      1460: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1790 : {
        slidesPerView : 3,
        spaceBetween : 50
      }
    },
  });
	

	// 2. sec1 cardBax
	$('.sec1 .cardBox .card').click(function(){
		$('.sec1 .cardBox .card').removeClass('active');
		$(this).addClass('active');
	});
  // 3-1. Toggle active class every 3 seconds
  let auto = setInterval(function() {
    $('.sec1 .cardBox .card').each(function(index) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        var nextIndex = (index + 1) % $('.sec1 .cardBox .card').length;
        $('.sec1 .cardBox .card').eq(nextIndex).addClass('active');
        return false;
      }
    });
  }, 3000);
  // 3-2. Stop Autoplay
  $('.sec1 .cardBox').mouseenter(function() {
    clearInterval(auto);
  });
  // 3-3. Start Autoplay
  $('.sec1 .cardBox').mouseleave(function() {
    auto = setInterval(function() {
      $('.sec1 .cardBox .card').each(function(index) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          var nextIndex = (index + 1) % $('.sec1 .cardBox .card').length;
          $('.sec1 .cardBox .card').eq(nextIndex).addClass('active');
          return false;
        }
      });
    }, 3000);
  });
});