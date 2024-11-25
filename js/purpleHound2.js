import { actionCategory, networkAttack, aptAttack, vulnAttack, financeAttack, telecomAttack } from '../data/purpleHoundData.js';

$(document).ready(function() {
  // ===== 1. Animation On Scroll 라이브러리 초기화
  AOS.init();

  // ===== 2. Sec2 : swiper 사용 설정
  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 800,
    effect: "slide",
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
  });
  
  const checkScroll = () => {
    const sec2 = document.querySelector('.sec2');
    const sec2Rect = sec2.getBoundingClientRect();
    const sec2Top = sec2Rect.top + window.scrollY;
    const sec2Bottom = sec2Top + sec2Rect.height;
    
    const windowBottom = window.scrollY + window.innerHeight;
    const threshold = windowBottom - window.innerHeight / 2;
  
    // 조건에 맞으면 autoplay 활성화
    if (sec2Top <= threshold) {
      if (!swiper.autoplay.running) {
        swiper.autoplay.start();
        console.log('시작')
      }
    } else {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        console.log('멈춤')
      }
    }
  };
  
  window.addEventListener('scroll', checkScroll);
  checkScroll();
  

  // ===== 3. Sec3
  let currentTimeoutId;
  let isInSection3 = false;
  let isScrollEventActive = false;

  // 3-1. 활성화된 GUI 단계 확인을 위한 영역 스크롤
  const scrollItemBox = $item => {
    const container = $('.sec3 .sec-bottom .left');
    const currentIndex = $item.index() + 1;
    // 3개 항목씩 이동
    if (currentIndex % 3 === 1) {
      const offset = $item.position().top + container.scrollTop() - container.position().top;
      container.animate({ scrollTop: offset }, 500);
    }
  } //scrollItemBox
  const scrollImgBox = $item => {
    const container = $('.sec3 .sec-bottom .right');
    const offset = $item.position().top + container.scrollTop() - container.position().top;
    container.animate({ scrollTop: offset }, 500);
  } //scrollImgBox

  // 3-2. GIF 초기화 : GIF 재생 시작 시점을 처음으로 되돌리기 위해 src 속성 재설정
  const resetGif = index => {
    const $activeGif = $('.sec3 .sec-bottom .right img[data-index="' + index + '"]');
    const src = $activeGif.attr('src');
    $activeGif.attr('src', ''); 
    $activeGif.attr('src', src);
    return $activeGif;
  } //resetGif

  // 3-3. 선택된 단계의 UI GIF 활성화
  const activateStepGui = $item => {
    $item.addClass('active').siblings('.item-box').removeClass('active');
    scrollItemBox($item);
    
    const index = $item.find('.index').length ? $item.find('.index').data('index') : $item.find('.txt-box').data('index');
    const $newGif = resetGif(index);
    scrollImgBox($newGif);

    // GIF 파일 길이에 따른 자동 단계 이동 시간 설정
    const $img = $('.sec3 .sec-bottom .right img[data-index="' + index + '"]');
    const duration = $img.data('duration') || 5000;
    moveStepWithTimeout(duration);
  } //activateStepGui

  // 3-4. 자동 단계 이동
  const autoMoveStep = () => {
    const $currentActive = $('.sec3 .sec-bottom .left .item-box.active');
    let $nextItem = $currentActive.next('.item-box');
    $nextItem = $nextItem.length === 0 ? $('.sec3 .sec-bottom .left .item-box').first() : $nextItem;
    activateStepGui($nextItem);
  } //autoMoveStep

  // 3-5. 각 단계마다 지연 시간 후 자동 이동
  const moveStepWithTimeout = duration => {
    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
    }
    currentTimeoutId = setTimeout(autoMoveStep, duration + 1000);
  } //moveStepWithTimeout

  // 3-6. Section3 진입/이탈 체크
  const checkSection3 = () => {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const $sec3 = $('.sec3');
    const sec3Offset = $sec3.offset();
    const isInSec3 = (scrollTop + windowHeight) >= (sec3Offset.top + 90);

    // 1. section3 영역이라면 activeIndex에 해당하는 GIF를 재실행해
    if (isInSec3) {
      // 2. 스크롤 이벤트가 비활성화 상태일 때
      if (!isScrollEventActive) {
        isScrollEventActive = true;
        const activeIndex = $('.sec3 .sec-bottom .left .item-box.active').find('.index').data('index');
        resetGif(activeIndex);
        $('.sec3 .sec-bottom .left .item-box .index, .sec3 .sec-bottom .left .item-box .txt-box').on('click', function () {
          activateStepGui($(this).closest('.item-box'));
        });
      }
      
      if (!isInSection3) {
        isInSection3 = true;
        const $firstItem = $('.sec3 .sec-bottom .left .item-box').first();
        activateStepGui($firstItem);
      }
    } else {
      if (isScrollEventActive) {
        isScrollEventActive = false;
        $('.sec3 .sec-bottom .left .item-box .index, .sec3 .sec-bottom .left .item-box .txt-box').off('click');
      }
      
      if (isInSection3) {
        isInSection3 = false;
        clearTimeout(currentTimeoutId);
      }
    }
  } //checkSection3

  // 3-7. Section3 영역 진입 확인을 위한 초기 실행 및 스크롤 이벤트 리스너 등록
  checkSection3();
  $(window).scroll(checkSection3);


  // ===== 4. sec4 : countUp 및 카테고리별 Action 정보
  const formatCount = num => {
    return num.toLocaleString();
  } //formatCount

  // let isCountUpAnimated = false;
  // 4-1. countUp 애니메이션
  // const startCountUpAnimation = () => {
  //   $('.sec4 .sec-bottom .asset-box .box .cnt[data-key]').each(function() {
  //     const $this = $(this);
  //     const key = $this.data('key');
  //     const targetValue = phAssetsData[key];
  //     const duration = 1000;
      
  //     $({ count: 0 }).animate({ count: targetValue }, {
  //       duration: duration,
  //       step: function() {
  //         const roundedValue = Math.round(this.count / 100) * 100;
  //         $this.text(formatCount(roundedValue));
  //       },
  //       complete: function() {
  //         const finalValue = Math.round(targetValue / 100) * 100;
  //         $this.text(formatCount(finalValue));
  //       }
  //     });
  //   });
  // } //startCountUpAnimation
  
  // const checkVisibility = () => {
  //   const scrollTop = $(window).scrollTop();
  //   const windowHeight = $(window).height();
  //   const $sec4 = $('.sec4');
  //   const sec4Offset = $sec4.offset();
    
  //   return (scrollTop + windowHeight) >= (sec4Offset.top + 90);
  // } //checkVisibility
  
  // $(window).scroll(function() {
  //   const isVisible = checkVisibility();
  
  //   if (isVisible && !isCountUpAnimated) {
  //     isCountUpAnimated = true;
  //     startCountUpAnimation();
  //   } else if (!isVisible && isCountUpAnimated) {
  //     isCountUpAnimated = false;
  
  //     $('.sec4 .sec-bottom .asset-box .box .cnt[data-key]').each(function() {
  //       $(this).text(formatCount(0));
  //     });
  //   }
  // });

  // if (checkVisibility() && !isCountUpAnimated) {
  //   isCountUpAnimated = true;
  //   startCountUpAnimation();
  // } //기본값 설정

  // 4-2. 원형 시각화 라인 그리기
  const drawPointsOnCircle = numPoints => {
    const $circleWrap = $('.sec4 .sec-bottom .container .circle-wrap');
    const $circle = $('.sec4 .sec-bottom .container .circle-wrap .circle');
    const size = Math.min($circleWrap.width(), $circleWrap.height()) - 50;
    $circle.css({
      width: size,
      height: size
    });
    $circleWrap.find('.point, .tooltip').remove();

    let radius = size / 2;
    const centerX = $circle.position().left + radius;
    const centerY = $circle.position().top + radius;
    radius = radius - 20;
    const iconClasses = [
      'fas fa-network-wired',     // 네트워크 아이콘
      'fas fa-building',          // APT 아이콘
      'fas fa-microchip',         // IPC 아이콘
      'fas fa-coins',             // 금융 아이콘
      'fas fa-mobile-alt'         // 통신 아이콘
  ];
    // 5-2-1. 포인트 생성 및 배치
    for (let i = 0; i < numPoints; i++) {
      const angle = (2 * Math.PI / numPoints) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      // 5-2-2. 툴팁 생성
      const $tooltip = $('<div class="tooltip"></div>').css({
        position: 'absolute',
        backgroundColor: '#333',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '4px',
        fontSize: '12px',
        display: 'none',
        zIndex: 100
      }).text(actionCategory[i][0]);

      // 5-2-3. 포인트 생성
      const $point = $(
        `<div class="point" data-index="${i}">
          <i class="${iconClasses[i]} icon ${i === 0 ? 'active' : ''}"></i>
        </div>`
      ).css({
        position: 'absolute',
        width: i === 0 ? '100px' : '50px',
        height: i === 0 ? '100px' : '50px',
        backgroundColor: '#9f94b3',
        boxSizing: 'border-box',
        borderRadius: '50%',
        cursor: 'pointer',
        left: i === 0 ? (x - 45) + 'px' : (x - 25) + 'px',
        top: i === 0 ? (y - 45) + 'px' : (y - 25) + 'px',
        transition: 'all 0.5s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      });

      // 5-2-4. 포인트 hover 이벤트 핸들러 추가
      $point.hover(
        function(e) {
          $tooltip.css({
            left: e.pageX + 10 + 'px',
            top: e.pageY - 20 + 'px',
            display: 'block'
          });
        },
        function() {
          $tooltip.css('display', 'none');
        }
      );
      // 5-2-5. circle-wrap에 포인트 및 툴팁 추가
      $circleWrap.append($point);
      $circleWrap.append($tooltip);
    }

    // 5-2-6. 포인트 클릭 시, 좌표 수정 및 table 업데이트
    $('.point').on('click', function() {
      const clickedIndex = $(this).data('index');
      const points = $('.point');
      
      $('.point .icon').removeClass('active');
      $(this).find('.icon').addClass('active');
      
      points.each(function(i) {
        const newIndex = (i - clickedIndex + numPoints) % numPoints;
        const angle = (2 * Math.PI / numPoints) * newIndex;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        $(this).css({
          width: i === clickedIndex ? '100px' : '70px',
          height: i === clickedIndex ? '100px' : '70px',
          left: i === clickedIndex ? (x - 45) + 'px' : (x - 25) + 'px',
          top: i === clickedIndex ? (y - 45) + 'px' : (y - 25) + 'px'
        });
      });
  
      activeInfoTable(clickedIndex);
    });
  } //drawPointsOnCircle
  drawPointsOnCircle(actionCategory.length);
  
  $(window).on('resize', function() {
    // requestAnimationFrame: 브라우저 내장함수로 부드러운 프레임 애니메이션 지원
    requestAnimationFrame(() => {
      drawPointsOnCircle(actionCategory.length);
    });
  }); // window 사이즈가 조절될 때마다 좌표 자동화 재실행

  // 4-3. Click 이벤트에 따른 카테고리 정보 활성화
  const activeInfoTable = index => {
    const data = actionCategory[index];
    const attackType = data[0];
    let attackData;

    // 5-3-1. attackType에 따라 해당하는 데이터 매칭
    switch(attackType) {
      case '네트워크 공격 시나리오':
        attackData = networkAttack;
        break;
      case 'APT 공격 시나리오':
        attackData = aptAttack;
        break;
      case '취약점 공격 시나리오':
        attackData = vulnAttack;
        break;
      case '금융권 대상 공격 시나리오':
        attackData = financeAttack;
        break;
      case '통신 시스템 공격 시나리오':
        attackData = telecomAttack;
        break;
      default:
        attackData = [];
    }
    const $tableWrap = $('.sec4 .sec-bottom .table-wrap');
    const $title = $tableWrap.find('.title .category');
    const $sub = $tableWrap.find('.sub');
    const $table = $tableWrap.find('table');
    const $contents = $tableWrap.find('.title, .sub, table');

    // 기존 데이터 fadeOut
    $contents.fadeOut(300, function() {
      $title.text(data[0]);
      $sub.text(data[2].description);
      $table.empty();

      // 5-3-2. 매칭된 데이터를 사용한 table 값 채우기
      const headerRow = `
        <tr>
          <th>index</th>
          <th>name</th>
          <th>description</th>
        </tr>
      `;
      
      const dataRows = attackData.map((item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.description}</td>
        </tr>
      `).join('');

      $table.html(headerRow + dataRows);
      
      // 새로운 데이터 fadeIn
      $contents.fadeIn(300);
    });
  } //activeInfoTable
  activeInfoTable(0); // 기본값 설정

  // ===== 5. modal
  // 5-1. 모달 활성화/비활성화
  $('.sec4 .sales-btn').click(function(){
    $('.modal').addClass('active');
  });
  const closeModal = () => {
    $('.modal').removeClass('active');
    $('#name, #company, #phone-part1, #phone-part2, #phone-part3, #email, #custom-email-domain').each(function () {
      $(this).val('');
      $(this).closest('.input-wrap').css({ border: '1px solid rgba(0, 0, 0, 0.3)' });
    });
  
    $('#email-domain').val('');
    $('#agree').prop('checked', false)
    $('#agree label').css({ fontWeight: 'normal' });
  }; //closeModal
  $('.modal .input-wrap .closeBtn').click(closeModal);

  // 5-2. 필수 입력값 확인
  const validateRequiredFields = () => {
    let isValid = true;

    // 이름 검증
    if (!$('#name').val()) {
      $('#name').closest('.input-wrap').css({ border: '2px solid #5F4B8Ba8' });
      isValid = false;
    } else {
      $('#name').closest('.input-wrap').css({ border: '1px solid rgba(0, 0, 0, 0.3)' });
    }

    // 이메일 검증
    if (!$('#email').val() || !$('#email-domain').val()) {
      $('#email').closest('.input-wrap').css({ border: '2px solid #5F4B8Ba8' });
      isValid = false;
    } else {
      $('#email').closest('.input-wrap').css({ border: '1px solid rgba(0, 0, 0, 0.3)' });
    }

    // 회사명 검증
    if (!$('#company').val()) {
      $('#company').closest('.input-wrap').css({ border: '2px solid #5F4B8Ba8' });
      isValid = false;
    } else {
      $('#company').closest('.input-wrap').css({ border: '1px solid rgba(0, 0, 0, 0.3)' });
    }

    // 전화번호 검증
    if (!$('#phone-part1').val() || !$('#phone-part2').val() || !$('#phone-part3').val()) {
      $('#phone-part1, #phone-part2, #phone-part3').each(function () {
        $(this).closest('.input-wrap').css({ border: '2px solid #5F4B8Ba8' });
      });
      isValid = false;
    } else {
      $('#phone-part1, #phone-part2, #phone-part3').each(function () {
        $(this).closest('.input-wrap').css({ border: '1px solid rgba(0, 0, 0, 0.3)' });
      });
    }

    // 개인정보 동의 검증
    if (!$('#agree').prop('checked')) {
      alert('개인 정보 동의가 필요합니다.');
      $('#agree label').css({ fontWeight: 800 });
      isValid = false;
    } else {
      $('#agree label').css({ fontWeight: 'normal' });
    }

    return isValid;
  } //validateRequiredFields

  // 5-3. 입력값 유효성 검증
  const validateInput = () => {
    // Email 검증
    const email = `${$('#email').val()}@${$('#email-domain').val()}`;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      $('#email').closest('.input-wrap').css({ border: '2px solid #5F4B8Ba8' });
      return false;
    }

    // Phone 검증
    const phone = `${$('#phone-part1').val()}-${$('#phone-part2').val()}-${$('#phone-part3').val()}`;
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;

    if (!phoneRegex.test(phone)) {
      alert('유효한 전화번호를 입력해주세요.');
      $('#phone-part1, #phone-part2, #phone-part3').each(function () {
        $(this).closest('.input-wrap').css({ border: '2px solid #5F4B8Ba8' });
      });
      return false;
    }

    return true;
  } //validateInput

  const inputDomain = () => {
    const selectEle = $('#email-domain').val();
    const customDomainInput = $('#custom-email-domain');

    customDomainInput.val(selectEle);
  };
  inputDomain();
  // select 요소 변경 시 inputDomain 함수 호출
  $('#email-domain').on('change', inputDomain);

  // 클릭 이벤트 핸들러
  $('#submit').click(function () {
    // 필수 입력값 및 유효성 검증
    if (!validateRequiredFields() || !validateInput()) {
      return;
    }

    // EmailJS 전송 파라미터 설정
    const templateParams = {
      name: $('#name').val(),
      email: `${$('#email').val()}@${$('#email-domain').val()}`,
      phone: `${$('#phone-part1').val()}-${$('#phone-part2').val()}-${$('#phone-part3').val()}`,
      company: $('#company').val(),
    };

    // EmailJS API 호출
    emailjs
    .send('service_55emqp6', 'template_73b8uwm', templateParams, 'tdb7tpSvPwnlfmihQ')
    .then(response => {
      alert('요청이 완료되었습니다. 메일을 확인해주세요.');
      
      emailjs.send('service_9al2zlq', 'template_qp6tcdg', {
        ...templateParams,
        service: 'PurpleHound'
      }, 'tdb7tpSvPwnlfmihQ')
    })
    .catch(err => {
      console.error('EmailJS error:', err);
    })
    .finally(() => {
      closeModal();
    });
  });
});