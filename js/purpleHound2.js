$(document).ready(function() {
  // 1. Swiper 초기화 및 설정
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

  // 2. 스크롤 애니메이션 함수
  // 2-1. 왼쪽 텍스트 영역 스크롤
  function scrollToItemBox($item) {
    let container = $('.sec3 .sec-bottom .left');
    let currentIndex = $item.index() + 1;
    
    if (currentIndex % 3 === 1) {
      let offset = $item.position().top + container.scrollTop() - container.position().top;
      container.animate({ scrollTop: offset }, 500);
    }
  }
  // 2-2. 오른쪽 이미지 영역 스크롤 
  function scrollToImgBox($item) {
    let container = $('.sec3 .sec-bottom .right');
    let offset = $item.position().top + container.scrollTop() - container.position().top;
    container.animate({ scrollTop: offset }, 500);
  }

  // 3. 아이템 활성화 및 GIF 재생 함수
  function activateItem($item) {
    // 3-1. 클릭한 아이템 활성화
    $item.addClass('active').siblings('.item-box').removeClass('active');
    scrollToItemBox($item);
    
    // 3-2. 해당 아이템의 인덱스 가져오기
    let index = $item.find('.index').length ? 
      $item.find('.index').data('index') : 
      $item.find('.txt-box').data('index');
    
    // 3-3. GIF 교체 및 재생
    let $targetGif = $('.sec3 .sec-bottom .right img[data-index="' + index + '"]');
    let $newGif = $targetGif.clone(true);
    $targetGif.replaceWith($newGif);
    scrollToImgBox($newGif);
  }

  // 4. 자동 슬라이드 기능
  function autoSlide() {
    let $currentActive = $('.sec3 .sec-bottom .left .item-box.active');
    let $nextItem = $currentActive.next('.item-box');
    $nextItem = $nextItem.length === 0 ? 
      $('.sec3 .sec-bottom .left .item-box').first() : 
      $nextItem;
    activateItem($nextItem);
  }

  // 5. section3 영역에 진입하면
  let slideInterval = undefined;
  let isInSection3 = false;
  let isScrollEventActive = false;
  
  function checkSection3() {
    const section3 = $('.sec3');
    const scrollTop = $(window).scrollTop();
    const section3Top = section3.offset().top;
    const section3Bottom = section3Top + section3.height();
    
    // Add Scroll Event 조건 체크
    if (scrollTop >= section3Top - 200 && scrollTop < section3Top + section3.height() / 2) {
      if (!isScrollEventActive) {
        isScrollEventActive = true;
        $('.sec3 .sec-bottom .left .item-box .index, .sec3 .sec-bottom .left .item-box .txt-box').on('click', function() {
          activateItem($(this).closest('.item-box'));
        });
      }
    } else {
      if (isScrollEventActive) {
        isScrollEventActive = false;
        $('.sec3 .sec-bottom .left .item-box .index, .sec3 .sec-bottom .left .item-box .txt-box').off('click');
      }
    }
    
    // 자동 슬라이드 조건 체크
    if (scrollTop >= section3Top && scrollTop < section3Bottom) {
      if (!isInSection3) {
        isInSection3 = true;
        slideInterval = setInterval(autoSlide, 5000);
      }
    } else {
      if (isInSection3) {
        isInSection3 = false;
        clearInterval(slideInterval);
        slideInterval = undefined;
      }
    }
  }

  // 초기 로드 시 체크
  checkSection3();
})