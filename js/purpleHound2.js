$(document).ready(function() {
  // Swiper 초기화
  const swiper = new Swiper(".mySwiper", {
    // 기본 설정
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    
    // 자동 재생
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    
    // 페이지네이션
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    
    // 네비게이션 화살표
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // 반응형 설정
    breakpoints: {
      // 모바일
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // 태블릿
      768: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // 데스크탑
      1024: {
        slidesPerView: 1,
        spaceBetween: 30
      }
    }
  });
});