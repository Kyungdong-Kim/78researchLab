$(document).ready(function () {
  // 언어 초기화
  let isKorean = !localStorage.getItem('lang') || localStorage.getItem('lang') === 'Ko';
  $('p, span, label, b, a, h3, h1, th, td, li, #submit, .sales-btn, option').each(function () {
    const langAttr = isKorean ? 'ko' : 'en';
    $(this).html($(this).attr(langAttr));
    
    if(isKorean){
      $('.ko').show();
      $('.en').hide();
    } else {
      $('.en').show();
      $('.ko').hide();  
    }
  });

	// change language
	$('header .menu-wrap .menu.lang, header .menuBtn ul li.lang').click(function () {
		if ($(this).text() === 'En') {
			$(this).text('Ko');
			$('p, span, label, b, a, h3, h1, th, td, li').each(function () {
				$(this).html($(this).attr('en'));
			});
      // redSpider
      $('.sec2 .processBox .ko').hide();
      $('.sec2 .processBox .en').show();
      // purpleHound
      $('.ko').hide();
      $('.en').show();
      // aboutUs
      $('.tabs .tab .core-value .value .card .valueName').hide();
			localStorage.setItem('lang', 'En');
		} else {
			$(this).text('En');
			$('p, span, label, b, a, h3, h1, th, td, li').each(function () {
				$(this).html($(this).attr('ko'));
			});
      // redSpider
      $('.sec2 .processBox .ko').show();
      $('.sec2 .processBox .en').hide();
      // purpleHound
      $('.ko').show();
      $('.en').hide();
      // aboutUs
      $('.tabs .tab .core-value .value .card .valueName').show();
			localStorage.setItem('lang', 'Ko');
		}
	});

  // alert
  $('.sec2 .sec-bottom .service .txtBox a, header .menu-wrap .menu a, header .menuBtn ul li a').click(function () {
    let href = $(this).attr("href");
    if (href === '#none') {
      let message = (localStorage.getItem('lang') === 'Ko') ? '현재 준비중인 서비스입니다.' : 'This is a service in preparation.';
      Swal.fire({
        icon: 'info',
        title: 'Notice',
        text: message,
      });
    }
  });

  // hamburger Btn
  const headerMenuBtn = () => {
    let ww = $(window).width();
    if (ww <= 980) {
      $('header .sub.menu-wrap').hide();
      $('header .menuBtn').show();
    } else {
      $('header .sub.menu-wrap').show();
      $('header .menuBtn').hide();
    }
  };
  
  $(document).ready(function () {
    headerMenuBtn();
  });
  $(window).resize(function () {
    headerMenuBtn();
  });

  $('header .menuBtn').click(function(){
    if($(this).hasClass('active')){
      $(this).removeClass('active');
    } else {
      $(this).addClass('active');
    }
  });  
});