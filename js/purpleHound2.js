$(document).ready(function() {
  // Swiper 초기화
  const swiper = new Swiper(".slider .inner", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: false,
    centeredSlides: false,
    speed: 800,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // Section3 관련 상태 변수
  let slideInterval;
  let isInSection3 = false;
  let isScrollEventActive = false;

  // 스크롤 애니메이션 함수
  function scrollToItemBox($item) {
    const container = $('.sec3 .sec-bottom .left');
    const currentIndex = $item.index() + 1;
    
    if (currentIndex % 3 === 1) {
      const offset = $item.position().top + container.scrollTop() - container.position().top;
      container.animate({ scrollTop: offset }, 500);
    }
  }

  function scrollToImgBox($item) {
    const container = $('.sec3 .sec-bottom .right');
    const offset = $item.position().top + container.scrollTop() - container.position().top;
    container.animate({ scrollTop: offset }, 500);
  }

  // GIF 관련 함수
  function resetGif(index) {
    const $activeGif = $('.sec3 .sec-bottom .right img[data-index="' + index + '"]');
    const $newActiveGif = $activeGif.clone(true);
    $activeGif.replaceWith($newActiveGif);
    return $newActiveGif;
  }

  // 아이템 활성화 함수
  function activateItem($item) {
    $item.addClass('active').siblings('.item-box').removeClass('active');
    scrollToItemBox($item);
    
    const index = $item.find('.index').length ? $item.find('.index').data('index') : $item.find('.txt-box').data('index');
    const $newGif = resetGif(index);
    scrollToImgBox($newGif);

    // 자동 슬라이드 시간 설정
    const $img = $('.sec3 .sec-bottom .right img[data-index="' + index + '"]');
    const duration = $img.data('duration') || 5000; // data-duration이 없으면 5000ms로 기본값 설정
    resetSlideInterval(duration);
  }

  // 자동 슬라이드 함수
  function autoSlide() {
    const $currentActive = $('.sec3 .sec-bottom .left .item-box.active');
    let $nextItem = $currentActive.next('.item-box');
    $nextItem = $nextItem.length === 0 ? 
      $('.sec3 .sec-bottom .left .item-box').first() : 
      $nextItem;
    activateItem($nextItem);
  }

  // setInterval 초기화 함수
  function resetSlideInterval(duration) {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = undefined;
    }
    slideInterval = setInterval(autoSlide, duration);
  }

  // 이벤트 바인딩 함수
  function bindItemClickEvents() {
    $('.sec3 .sec-bottom .left .item-box .index, .sec3 .sec-bottom .left .item-box .txt-box').on('click', function() {
        activateItem($(this).closest('.item-box'));
      });
  }

  function unbindItemClickEvents() {
    $('.sec3 .sec-bottom .left .item-box .index, .sec3 .sec-bottom .left .item-box .txt-box').off('click');
  }

  // Section3 진입/이탈 체크 함수
  function checkSection3() {
    const section3 = $('.sec3');
    const scrollTop = $(window).scrollTop();
    const section3Top = section3.offset().top;
    const isInView = scrollTop >= section3Top - 200 && scrollTop < section3Top + section3.height() / 2;
    
    if (isInView) {
      if (!isScrollEventActive) {
        isScrollEventActive = true;
        const activeIndex = $('.sec3 .sec-bottom .left .item-box.active').find('.index').data('index');
        resetGif(activeIndex);
        bindItemClickEvents();
      }
      
      if (!isInSection3) {
        isInSection3 = true;
        slideInterval = setInterval(autoSlide, 5000); // 기본 5000ms로 시작
      }
    } else {
      if (isScrollEventActive) {
        isScrollEventActive = false;
        unbindItemClickEvents();
      }
      
      if (isInSection3) {
        isInSection3 = false;
        clearInterval(slideInterval);
        slideInterval = undefined;
      }
    }
  }

  // 초기화 및 이벤트 바인딩
  checkSection3();
  $(window).scroll(checkSection3);
});
