$(document).ready(function () {
	// language
	// Set default language value if not present in local storage
	if (!localStorage.getItem('lang')) {
		localStorage.setItem('lang', 'Ko');
		console.log(localStorage.getItem('lang'));
	}

  // 1. Header SideBar styling based on Scroll
  // 1-1. Get each section height value
  const sec1 = $('.sec1').offset().top;
  const sec2 = $('.sec2').offset().top;
  const sec3 = $('.sec3').offset().top;

  // 1-2. Styling based on the window's position
  $(window).scroll(function () {
    let sct = $(window).scrollTop();
    let ww = $(window).width();
    console.log(ww)
    console.log(sct);
    // 1-2-1. Header
    if (sct < sec1) {
      $('header .menu-wrap .menu').css({ color: '#fff' });
    } else if (sct >= sec1 && sct < sec2) {
      $('header .menu-wrap .menu').css({ color: '#000' });
    } else if (sct >= sec2 && sct < sec3) {
      $('header .menu-wrap .menu').css({ color: 'rgba(0,0,0,0.8)' });
      $('header .menu-wrap .menu:nth-child(-n+2)').show();
    } else if (sct >= sec3) {
      $('header').addClass('active');
      $('header .menu-wrap .menu').css({ color: '#000' });
      if(ww > 980){
        $('header .menu-wrap .menu:nth-child(-n+2)').hide();
      }
    };

    // 1-2-2. SideBar
    // === Toggle SideBar 
    if (sct < sec1 * 0.7) {
      $('.sideBar').removeClass('active');
    } else {
      $('.sideBar').addClass('active');
    };
    // === Toggle active class
    if (sct >= sec1 * 0.9 && sct < sec2 * 0.9) {
      $('.sideBar p').removeClass('active');
      $('.sideBar.active p:nth-child(2)').addClass('active');
    } else if (sct >= sec2 * 0.9 && sct < sec3 * 0.9) {
      $('.sideBar p').removeClass('active');
      $('.sideBar.active p:nth-child(3)').addClass('active');
    } else if (sct >= sec3 * 0.9) {
      $('.sideBar p').removeClass('active');
      $('.sideBar.active p:nth-child(4)').addClass('active');
    };

    // 1-2-3. section2 animate effect
    if (sct >= sec2 * 0.75) {
      $('.sec2 .sec-bottom .service:nth-child(1)').addClass('active');
    };
    if (sct >= sec2) {
      $('.sec2 .sec-bottom .service:nth-child(2)').addClass('active');
    };
    if (sct >= sec2 * 1.25) {
      $('.sec2 .sec-bottom .service:nth-child(3)').addClass('active');
    };
    if (sct >= sec2 * 1.5) {
      $('.sec2 .sec-bottom .service:nth-child(4)').addClass('active');
    };
  });

  // 1-3. move to the corresponding area
  $('.sideBar p').click(function () {
    let idx = $(this).attr('index');
    if (idx === '0') {
        $('html, body').animate({
            scrollTop: 0
        }, 1000);
        // location.reload();
    } else if (idx === '1') {
        $('html, body').animate({
            scrollTop: sec1
        }, 1000);
    } else if (idx === '2') {
        $('html, body').animate({
            scrollTop: sec2
        }, 1000);
    } else if (idx === '3') {
        $('html, body').animate({
            scrollTop: sec3
        }, 1000);
    }
});

  // 2. banner text typing effect
  const content = "Are You Safe From Hacking?";
  const text = document.querySelector(".banner .swiper .swiper-wrapper .swiper-slide:first-child .title");
  let i = 0;
  function typing() {
    if (i < content.length) {
      let txt = content.charAt(i);
      text.innerHTML += txt;
      i++;
    }
  }
  setInterval(typing, 100);

  // 3. banner swiper
  var swiper = new Swiper(".banner .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // 4. what we do swiper
  $('.sec1 .sec-bottom .mySwiper').on('mouseover', function(){
    swiper.autoplay.stop();
  });
  $('.sec1 .sec-bottom .mySwiper').on('mouseout', function(){
    swiper.autoplay.start();
  });
  var swiper = new Swiper(".sec1 .sec-bottom .mySwiper", {
    slidesPerView: 1,
    spaceBetween: 5,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      850: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1300: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      1800 : {
        slidesPerView : 4,
        spaceBetween : 50
      }
    },
  });

  // 5. section3 breadcrumbs
  $('.sec3 .sec-bottom .box-left').click(function () {
    location.href = 'AboutUs.html?tab=1';
  });
  $('.sec3 .sec-bottom .box-middle .box-top').click(function () {
    location.href = 'AboutUs.html?tab=2';
  });
  $('.sec3 .sec-bottom .box-middle .box-bottom .bottom-left a').click(function () {
    location.href = 'AboutUs.html?tab=3';
  });

});