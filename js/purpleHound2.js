import { actionCategory, networkAttack, aptAttack, vulnAttack, financeAttack, guiStepDetails } from '../data/purpleHoundData.js';

$(document).ready(function() {
  // ===== 1. 초기화
  // 1-1. Animation On Scroll 라이브러리 
  AOS.init();
  // 1-2. 언어 초기화
  let isKorean;
  $(window).on('load', function () {
    isKorean = ($('header .menu-wrap .menu.lang, header .menuBtn ul li.lang').text() !== 'Ko');
    $('p, span, label, b, a, h3, h1, th, td, li').each(function () {
      const langAttr = isKorean ? 'ko' : 'en';
      $(this).html($(this).attr(langAttr));
    });

    if (isKorean) {
      $('.ko').show();
      $('.en').hide();
    } else {
      $('.ko').hide();
      $('.en').show();
    }
  });
  // 1-3. 언어 변환 클릭 이벤트 처리
  $('header .menu-wrap .menu.lang, header .menuBtn ul li.lang').click(function () {
    const activeIndex = $('.tab-btn.active').data('index');
    const findInfo = guiStepDetails.find(item => item.step == activeIndex);
  
    if ($(this).text() === 'En') {
      isKorean = true;
      $('.sec3 .sec-bottom .info .txt-box .title').text(findInfo.title_ko);
      $('.sec3 .sec-bottom .info .txt-box .sub').text(findInfo.description_ko);
      $('tr th').text($(this).attr('ko'));
  
      // 툴팁 언어변환
      $('.sec3 .sec-bottom .tab-btn-wrap .tab-btn').each(function () {
        const koTitle = $(this).attr('ko');
        $(this).attr('data-bs-title', koTitle);
        const tooltipInstance = bootstrap.Tooltip.getInstance(this);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
        new bootstrap.Tooltip(this);
      });
    } else {
      isKorean = false;
      $('.sec3 .sec-bottom .info .txt-box .title').text(findInfo.title_en);
      $('.sec3 .sec-bottom .info .txt-box .sub').text(findInfo.description_en);
      $('tr th').text($(this).attr('en'));
  
      // 툴팁 언어 변환
      $('.sec3 .sec-bottom .tab-btn-wrap .tab-btn').each(function () {
        const enTitle = $(this).attr('en');
        $(this).attr('data-bs-title', enTitle);
        const tooltipInstance = bootstrap.Tooltip.getInstance(this);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
        new bootstrap.Tooltip(this);
      });
    }
  });

  // ===== 2. Swiper 초기화
  var swiper = new Swiper(".mySwiper.swiper-1", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    speed: 800,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: 'bullets'
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

  const checkScroll = () => {
    const sec2 = document.querySelector(".sec2");
    const sec2Rect = sec2.getBoundingClientRect();
    const sec2InView =
      sec2Rect.top < window.innerHeight && sec2Rect.bottom > 0;

    if (sec2InView) {
      // 2-1. .sec2가 viewport 내에 있을 경우 autoplay 시작
      if (!swiper.autoplay.running) {
        swiper.autoplay.start();
      }
    } else {
      // 2-2. .sec2가 viewport 밖에 있으면 autoplay 멈춤
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
      }
    }
  } //checkScroll

  window.addEventListener("scroll", checkScroll);
  checkScroll();
  
  // ===== 3. Sec3
  let alreadyEntered = false;
  let autoMoveTimeout;

  // 3-1. 클릭 이벤트에 따르는 img 활성화 및 비활성화
  const activateStepGui = $currentItem => {
    $currentItem.addClass('active').siblings('.tab-btn').removeClass('active');
    
    // 부트스트랩 tooltip 비활성화
    const tooltipInstance = bootstrap.Tooltip.getInstance($currentItem[0]);
    if (tooltipInstance) {
      tooltipInstance.hide();
    }
    
    // 활성화 단계에 따른 UI 처리
    const activeIndex = $currentItem.data('index');
    const $title = $('.sec3 .sec-bottom .info .txt-box .title');
    const selectedItem = guiStepDetails.find(item => item.step === parseInt(activeIndex));
    
    if (selectedItem) {
      $title.html(isKorean ? selectedItem.title_ko : selectedItem.title_en);
      const $sub = $('.sec3 .sec-bottom .info .txt-box .sub');
      $sub.text(isKorean ? selectedItem.description_ko : selectedItem.description_en);
    }

    // gif 실행을 위한 경로 재설정
    $('.sec3 .sec-bottom .info .img-box img').each(function () {
      const imgIndex = $(this).data('index');
      if (parseInt(imgIndex) === parseInt(activeIndex)) {
        $(this).show();
        const copySrc = $(this).attr('src');
        $(this).attr('src', ''); 
        $(this).attr('src', copySrc);
      } else {
        $(this).hide();
      }
    });

    const durationTime = $('.tab-btn.active').data('duration');
    const $currentActiveStep = $('.sec3 .sec-bottom .tab-btn-wrap .tab-btn.active');
    let $nextItem = $currentActiveStep.next('.tab-btn');
    $nextItem = $nextItem.length === 0 ? $('.sec3 .sec-bottom .tab-btn-wrap .tab-btn').first() : $nextItem;
    
    if (autoMoveTimeout) {
      clearTimeout(autoMoveTimeout);
    }

    autoMoveTimeout = setTimeout(function() {
      activateStepGui($nextItem);
    }, durationTime + 1000);
  } //activateStepGui

  $(window).on('scroll', function() {
    const scrollTop = $(window).scrollTop();
    const windowHeight = $(window).height();
    const $sec3 = $('.sec3');
    const sec3Offset = $sec3.offset();
    const isInSec3 = (scrollTop + windowHeight) >= (sec3Offset.top + 90) && scrollTop < (sec3Offset.top + $sec3.height());

    if (isInSec3 && !alreadyEntered) {
      alreadyEntered = true;
      activateStepGui($('.sec3 .sec-bottom .tab-btn-wrap .tab-btn.active'));
    } else if (!isInSec3 && alreadyEntered) {
      alreadyEntered = false;

      if (autoMoveTimeout) {
        clearTimeout(autoMoveTimeout);
      }
    }
  });

  $('.sec3 .sec-bottom .tab-btn-wrap .tab-btn').on('click', function() {
    if (autoMoveTimeout) {
      clearTimeout(autoMoveTimeout);
    }
    activateStepGui($(this));
  });

  // ===== 4. sec4 : 카테고리별 Action 정보
  // 4-1. 원형 시각화 라인 그리기
  const drawPointsOnCircle = numPoints => {
    const iconClasses = [
      'fas fa-network-wired',     // 네트워크 아이콘
      'fas fa-building',          // APT 아이콘
      'fas fa-microchip',         // IPC 아이콘
      'fas fa-coins',             // 금융 아이콘
    ];

    const $circleWrap = $('.sec4 .sec-bottom .wrap-box .circle-wrap');
    const $circle = $('.sec4 .sec-bottom .wrap-box .circle-wrap .circle');
    $circleWrap.find('.point, .tooltip').remove();
    $circle.find('.tab-btn').remove();
    
    if($(window).width() > 1300){
      $circleWrap.css({
        width: '30%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      });  

      const size = $circleWrap.width() - 50
      $circle.css({
        width: size,
        height: size,
        boxSizing: 'border-box',
        borderRadius: '50%',
        border: '40px solid #F1F1F1',
        position: 'relative'
      });    
  
      let radius = size / 2;
      const centerX = $circle.position().left + radius;
      const centerY = $circle.position().top + radius;
      radius = radius - 20;
      // 4-1-1. 포인트 생성 및 배치
      for (let i = 0; i < numPoints; i++) {
        const angle = (2 * Math.PI / (numPoints - 1)) * i;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // 4-1-2. 포인트 생성
        const $point = $(
          `<div class="point" data-index="${i}" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="${actionCategory[i][isKorean ? 'title_ko' : 'title_en']}" ko="${actionCategory[i].title_ko}" en="${actionCategory[i].title_en}" >
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
          left: i === 0 ? '50%' : (x - 25) + 'px',
          top: i === 0 ? (y - 50) + 'px' : (y - 25) + 'px',
          transform: i === 0 ? 'translateX(-50%)' : 'none',
          transition: 'all 0.5s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        });

        // 4-1-3. circle-wrap에 포인트 추가
        $circleWrap.append($point);

        // 4-1-4. 포인트 mouseenter 이벤트 핸들러 추가
        new bootstrap.Tooltip($point[0]);
        $point.on('mouseenter', function() {
          const tooltipText = isKorean ? $(this).attr('ko') : $(this).attr('en');
          $(this).attr('data-bs-title', tooltipText);
          const tooltip = bootstrap.Tooltip.getInstance(this);
          tooltip.setContent({ '.tooltip-inner': tooltipText });
        });
      }

      // 4-1-6. 포인트 클릭 시, 좌표 수정 및 table 업데이트
      $('.point').on('click', function() {
        const clickedIndex = $(this).data('index');
        const points = $('.point');
        
        $('.point .icon').removeClass('active');
        $(this).find('.icon').addClass('active');
        
        points.each(function(i) {
          const newIndex = (i - clickedIndex + numPoints) % numPoints;
          const angle = (2 * Math.PI / (numPoints - 1)) * newIndex;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          
          $(this).css({
            width: i === clickedIndex ? '100px' : '50px',
            height: i === clickedIndex ? '100px' : '50px',
            left: i === clickedIndex ? '50%' : (x - 25) + 'px',
            top: i === clickedIndex ? (y - 50) + 'px' : (y - 25) + 'px',
            transform: i === clickedIndex ? 'translateX(-50%)' : 'none'
          });
        });
    
        activeCategoryInfo(clickedIndex);
      });
    } else {
      $circleWrap.css({
        width: '50px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      });
      
      $circle.css({
        width: '100%',
        height: '100%',
        borderRadius: '0',
        border: 'none',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'end',
        boxSizing: 'border-box',
      });      

      for (let i = 0; i < numPoints; i++) {
        // .circle-wrap .circle 요소 내부에 탭 버튼 생성
        const $tabBtn = $(
          `<button class="tab-btn ${i === 0 ? 'active' : ''}" data-index="${i}"
             data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="${actionCategory[i][isKorean ? 'title_ko' : 'title_en']}" ko="${actionCategory[i].title_ko}" en="${actionCategory[i].title_en}">
            <i class="${iconClasses[i]} icon"></i>
          </button>`
        );

        // 탭버튼 추가
        $circle.append($tabBtn);

        // 4-1-4. 포인트 mouseenter 이벤트 핸들러 추가
        new bootstrap.Tooltip($tabBtn[0]);
        $tabBtn.on('mouseenter', function() {
          const tooltipText = isKorean ? $(this).attr('ko') : $(this).attr('en');
          $(this).attr('data-bs-title', tooltipText);
          const tooltip = bootstrap.Tooltip.getInstance(this);
          tooltip.setContent({ '.tooltip-inner': tooltipText });
        });
      }

      // 4-1-6. 포인트 클릭 시, 좌표 수정 및 table 업데이트
      $('.sec4 .sec-bottom .wrap-box .circle-wrap .circle .tab-btn').on('click', function() {
        const clickedIndex = $(this).data('index');
        
        $(this).addClass('active').siblings('.sec4 .sec-bottom .wrap-box .circle-wrap .circle .tab-btn').removeClass('active');
        activeCategoryInfo(clickedIndex);
      });
    }
  } //drawPointsOnCircle
  drawPointsOnCircle(actionCategory.length);
  
  // 4-2. Click 이벤트에 따른 카테고리 정보 활성화
  const activeCategoryInfo = (index) => {
    const data = actionCategory[index];
    const attackType = index;
    let attackData;
  
    // 4-2-1. attackType에 따라 해당하는 데이터 매칭
    switch (attackType) {
      case 0:
        attackData = networkAttack;
        break;
      case 1:
        attackData = aptAttack;
        break;
      case 2:
        attackData = vulnAttack;
        break;
      case 3:
        attackData = financeAttack;
        break;
      default:
        attackData = [];
    }
  
    const $tableWrap = $(".sec4 .sec-bottom .table-wrap");
    const $title = $tableWrap.find(".title .category");
    const $table = $tableWrap.find("table");
    const $accordion = $tableWrap.find("#accordionFlushExample");
    const isWideScreen = $(window).width() > 550;
  
    // 공통 업데이트
    const updateContent = () => {
      $title.attr('ko', data.title_ko)
      $title.attr('en', data.title_en)
      $title.text(data[isKorean ? 'title_ko' : 'title_en']);
  
      if (isWideScreen) {
        // 4-2-2. 매칭된 데이터를 사용한 table 값 채우기 + 아코디언 비활성화
        $accordion.hide();
        $table.show().empty();
  
        const headerRow = `
          <tr>
            <th ko="순위" en="Rank">${isKorean ? '순위' : 'Rank'}</th>
            <th ko="공격 유형" en="Attack Type">${isKorean ? '공격 유형' : 'Attack Type'}</th>
            <th ko="설명" en="Description">${isKorean ? '설명' : 'Description'}</th>
          </tr>
        `;
        const dataRows = attackData.map((item) => `
          <tr>
            <td>${item.id}</td>
            <td ko="${item.name_ko}" en="${item.name_en}">${isKorean ? item.name_ko : item.name_en}</td>
            <td ko="${item.description_ko}" en="${item.description_en}">${isKorean ? item.description_ko : item.description_en}</td>
          </tr>
        `).join("");
  
        $table.html(headerRow + dataRows);
      } else {
        // 4-2-3. 매칭된 데이터를 사용한 아코디언 값 채우기 + table 비활성화
        $table.hide();
        $accordion.show().empty();
  
        const dataAccordionRows = attackData.map((item, idx) => `
          <div class="accordion-item">
            <h2 class="accordion-header" id="flush-heading-${item.id}">
              <button class="accordion-button ${idx === 0 ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse-${item.id}" aria-expanded="${idx === 0}" aria-controls="flush-collapse-${item.id}" ko="${item.name_ko} en="${item.name_en}"> #${item.id}. ${isKorean ? item.name_ko : item.name_en}
              </button>
            </h2>
            <div id="flush-collapse-${item.id}" class="accordion-collapse collapse ${idx === 0 ? "show" : ""}" aria-labelledby="flush-heading-${item.id}" data-bs-parent="#accordionFlushExample">
              <div class="accordion-body" ko="${item.description_ko}" en="${item.description_en}">${isKorean ? item.description_ko : item.description_en}</div>
            </div>
          </div>`
        ).join("");
  
        $accordion.html(dataAccordionRows);
      }
    };
  
    // 4-2-3. 갱신 전 fadeOut 처리
    $tableWrap.fadeOut(300, () => {
      updateContent();
      $tableWrap.fadeIn(300); // 데이터 갱신 후 fadeIn
    });
  } //activeCategoryInfo
  
  // Window resize 이벤트 연결
  $(window).on("resize", function () {
    // requestAnimationFrame: 브라우저 내장함수로 부드러운 프레임 애니메이션 지원
    requestAnimationFrame(() => {
      drawPointsOnCircle(actionCategory.length);
      activeCategoryInfo(0);
    });
  });
  
  activeCategoryInfo(0); // 기본값 설정

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
  } //closeModal
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
  }
  inputDomain();
  $('#email-domain').on('change', inputDomain);
  $('#custom-email-domain').on('input', function() {
    $('#email-domain').val('');
  });  

  // 5-4. 요청 버튼 클릭 이벤트
  $('#submit').click(function () {
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

    emailjs
    .send('service_55emqp6', 'template_73b8uwm', templateParams, 'tdb7tpSvPwnlfmihQ')
    .then(response => {
      console.log(response);
      if(response.status === 200){
        alert('요청 완료');
      
        emailjs.send('service_9al2zlq', 'template_qp6tcdg', {
          ...templateParams,
          service: 'PurpleHound'
        }, 'tdb7tpSvPwnlfmihQ')
      }
    })
    .catch(err => {
      console.error('EmailJS error:', err);
    })
    .finally(() => {
      closeModal();
    });
  });
});