$(document).ready(function () {
  // reload
  history.scrollRestoration = "manual"
  $('header .logo').click(function(){
    location.href = 'https://www.78researchlab.com/';
  });

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

  // ===== email
  $('#submit').click(function () {
    if (!$('#name').val() || !$('#email').val() || !$('#belongTo').val() || !$('#position').val()) {
      alert('Check Again')
    } else {
      var templateParams = {
        //각 요소는 emailJS에서 설정한 템플릿과 동일한 명으로 작성
        name: $('#name').val(),
        email: $('#email').val(),
        belongTo: $('#belongTo').val(),
        position: $('#position').val()
      };

      // emailjs.send('service_id', 'template_id', 보낼내용이 담긴 객체, 'API Public Key')
      emailjs.send('service_vi1cifh', 'template_lvw4mvh', templateParams, 'tdb7tpSvPwnlfmihQ')
        .then(function () {
          let message = (localStorage.getItem('lang') === 'Ko') ? '요청이 완료되었습니다. 이메일을 확인해보세요.' : 'Your request is complete. Check your email.';
          alert(message)
          window.location.reload();
        }, function (error) {
          console.log(error);
          let message = (localStorage.getItem('lang') === 'Ko') ? '정상적인 요청이 이루어지지 않았습니다. 다시 시도해주세요.' : 'A legitimate request was not made. please try again.';
          alert(message)
        });
    }
  });
});