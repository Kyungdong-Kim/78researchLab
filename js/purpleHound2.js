$(document).ready(function() {
  slider();
})

function slider() {
  let swiper = undefined;
  let slideNum = $('.slider .swiper-slide').length //슬라이드 총 개수
  let slideInx = 0; //현재 슬라이드 index

  //디바이스 체크
  let oldWChk = window.innerWidth > 767 ? 'pc' : 'mo';
  sliderAct();

  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      let newWChk = window.innerWidth > 767 ? 'pc' : 'mo';
      if (newWChk != oldWChk) {
        oldWChk = newWChk;
        sliderAct();
      }
    }, 300);
  })

  //슬라이드 실행
  function sliderAct() {
    //슬라이드 초기화 
    if (swiper != undefined) {
      swiper.destroy();
      swiper = undefined;
    }

    //slidesPerView 옵션 설정
    let viewNum = oldWChk == 'pc' ? 4 : 2;
    //loop 옵션 체크
    let loopChk = slideNum > viewNum;

    swiper = new Swiper(".slider .inner", {
      slidesPerView: "auto",
      initialSlide: slideInx,
      loop: loopChk,
      centeredSlides: true,
      speed: 800,
      effect: "coverflow",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      navigation: {
        nextEl: '.slider .inner .btn-wrap .btn_next',
        prevEl: '.slider .inner .btn-wrap .btn_prev',
      },
      on: {
        activeIndexChange: function() {
          slideInx = this.realIndex; //현재 슬라이드 index 갱신
        }
      },
    });
  }
}