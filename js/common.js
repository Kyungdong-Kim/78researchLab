$(document).ready(function () {
  // language
  let lang = localStorage.getItem('lang');

  // Set default language value if not present in local storage
	if (!localStorage.getItem('lang')) {
		localStorage.setItem('lang', 'Ko');
	}
	$(window).on('load', function () {
		if (localStorage.getItem('lang') === 'Ko') {
			$('p, span, label, b, a, h3, h1, th, td, li').each(function () {
				$(this).html($(this).attr('ko'));
			});
			$('header .menu-wrap .menu.lang').html('En');
      $('header .menuBtn ul li.lang').html('En');
      // redSpider
      $('.sec2 .processBox .ko').show();
      $('.sec2 .processBox .en').hide();
      // purpleHound
      $('.sec1 .sec-bottom .ko').show();
      $('.sec1 .sec-bottom .en').hide();
      $('.sec2 .processBox .ko').show();
      $('.sec2 .processBox .en').hide();
      $('.sec4 .sec-bottom .btnInfo').html($('.sec4 .sec-bottom .buttonBox input[type="radio"]:checked').attr('ko'));
      $('.sec4 .sec-bottom .imgBox .img#img1 .ko').show();
      $('.sec4 .sec-bottom .imgBox .img#img1 .en').hide();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .ko').show();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .en').hide();
      // aboutUs
      $('.tabs .tab .core-value .value .card .valueName').show();
		} else {
			$('p, span, label, b, a, h3, h1, th, td, li').each(function () {
				$(this).html($(this).attr('en'));
			});
			$('header .menu-wrap .menu.lang').html('Ko');
      $('header .menuBtn ul li.lang').html('Ko');
      // redSpider
      $('.sec2 .processBox .ko').hide();
      $('.sec2 .processBox .en').show();
      // purpleHound
      $('.sec1 .sec-bottom .ko').hide();
      $('.sec1 .sec-bottom .en').show();
      $('.sec2 .processBox .ko').hide();
      $('.sec2 .processBox .en').show();
      $('.sec4 .sec-bottom .btnInfo').html($('.sec4 .sec-bottom .buttonBox input[type="radio"]:checked').attr('en'));
      $('.sec4 .sec-bottom .imgBox .img#img1 .ko').hide();
      $('.sec4 .sec-bottom .imgBox .img#img1 .en').show();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .ko').hide();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .en').show();
      // aboutUs
      $('.tabs .tab .core-value .value .card .valueName').hide();
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
      $('.sec1 .sec-bottom .ko').hide();
      $('.sec1 .sec-bottom .en').show();
      $('.sec2 .processBox .ko').hide();
      $('.sec2 .processBox .en').show();
      $('.sec4 .sec-bottom .btnInfo').html($('.sec4 .sec-bottom .buttonBox input[type="radio"]:checked').attr('en'));
      $('.sec4 .sec-bottom .imgBox .img#img1 .ko').hide();
      $('.sec4 .sec-bottom .imgBox .img#img1 .en').show();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .ko').hide();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .en').show();
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
      $('.sec1 .sec-bottom .ko').show();
      $('.sec1 .sec-bottom .en').hide();
      $('.sec2 .processBox .ko').show();
      $('.sec2 .processBox .en').hide();
      $('.sec4 .sec-bottom .btnInfo').html($('.sec4 .sec-bottom .buttonBox input[type="radio"]:checked').attr('ko'));
      $('.sec4 .sec-bottom .imgBox .img#img1 .ko').show();
      $('.sec4 .sec-bottom .imgBox .img#img1 .en').hide();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .ko').show();
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1 .imgBox .en').hide();
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