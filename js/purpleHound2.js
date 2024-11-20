import { phAssetsData, actionCategory, networkAttack, aptAttack, ipcAttack, financeAttack, telecomAttack } from '../data/purpleHoundData.js';

$(document).ready(function() {
  // ===== 1. Animation On Scroll 라이브러리 초기화
  AOS.init();

  // ===== 2. Sec2 : swiper 사용 설정
  new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30, 
    loop: false,
    centeredSlides: true,
    speed: 800,
    effect: "slide",
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets'
    },
  });

  // ===== 3. Sec3
  let slideInterval;
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
  }; //resetGif
  

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
    resetSlideInterval(duration);
  } //activateStepGui

  // 3-4. 자동 단계 이동
  const autoMoveStep = () => {
    const $currentActive = $('.sec3 .sec-bottom .left .item-box.active');
    let $nextItem = $currentActive.next('.item-box');
    $nextItem = $nextItem.length === 0 ? $('.sec3 .sec-bottom .left .item-box').first() : $nextItem;
    activateStepGui($nextItem);
  } //autoMoveStep

  // 3-5. interval 반복 함수 초기화
  const resetSlideInterval = duration => {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = undefined;
    }
    slideInterval = setInterval(autoMoveStep, duration);
  } //resetSlideInterval

  // 3-6. Section3 진입/이탈 체크
  const checkSection3 = () => {
    const $sec3 = $('.sec3');
    const $sec3Top = $sec3.offset().top;
    const scrollTop = $(window).scrollTop();
    const isInSec3 = scrollTop >= $sec3Top - 200 && scrollTop < $sec3Top + $sec3.height() / 2;

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
        slideInterval = setInterval(autoMoveStep, 5000);
      }
    } else {
      if (isScrollEventActive) {
        isScrollEventActive = false;
        $('.sec3 .sec-bottom .left .item-box .index, .sec3 .sec-bottom .left .item-box .txt-box').off('click');
      }
      
      if (isInSection3) {
        isInSection3 = false;
        clearInterval(slideInterval);
        slideInterval = undefined;
      }
    }
  }

  // 3-7. Section3 영역 진입 확인을 위한 초기 실행 및 스크롤 이벤트 리스너 등록
  checkSection3();
  $(window).scroll(checkSection3);
  

  // ===== 4. sec4 : countUp 및 카테고리별 Action 정보
  const formatCount = num => {
    return num.toLocaleString();
  } //formatCount

  // 4-1. countUp 애니메이션
  let isCountUpAnimated = false;

  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop();
    const sec4Top = $('.sec4 .sec-top');
    const sec4Offset = sec4Top.offset().top;
    const windowHeight = $(window).height();
    
    // 4-1-1. 요소가 화면에 들어왔는지 확인
    const isVisible = scrollTop > (sec4Offset - windowHeight + 70) && scrollTop < (sec4Offset + sec4Top.height());

    // 4-1-2. 화면에 보이고 아직 애니메이션이 실행되지 않았을 경우 실행
    if (isVisible && !isCountUpAnimated) {
      isCountUpAnimated = true;
      
      $('.sec4 .sec-bottom .asset-box .box .cnt[data-key]').each(function() {
        const $this = $(this);
        const key = $this.data('key');
        const targetValue = phAssetsData[key];
        const duration = 1000;
        
        $({ count: 0 }).animate({ count: targetValue }, {
          duration: duration,
          step: function() {
            const roundedValue = Math.round(this.count / 100) * 100;
            $this.text(formatCount(roundedValue));
          },
          complete: function() {
            const finalValue = Math.round(targetValue / 100) * 100;
            $this.text(formatCount(finalValue));
          }
        });
      });
    }
  });

  // 4-2. 원형 시각화 라인 그리기
  const drawPointsOnCircle = numPoints => {
    const $circleWrap = $('.sec4 .sec-bottom .container .circle-wrap');
    const $circle = $('.sec4 .sec-bottom .container .circle-wrap .circle');
    const size = $circleWrap.width();
    
    $circle.css({
      width: size,
      height: size
    });

    const radius = size / 2;
    const centerX = $circle.position().left + radius;
    const centerY = $circle.position().top + radius;
    const colorList = ['red', 'orange', 'yellow', 'green', 'blue']

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
      const $point = $('<div class="point" data-index="' + i + '"></div>').css({
        position: 'absolute',
        width: '20px',
        height: '20px', 
        backgroundColor: colorList[i],
        boxSizing: 'border-box',
        borderRadius: '50%',
        cursor: 'pointer',
        left: (x - 10) + 'px',
        top: (y - 10) + 'px',
        transition: 'all 0.5s ease'
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
      $('.sec4 .sec-bottom .container .circle-wrap').append($point);
      $('.sec4 .sec-bottom .container .circle-wrap').append($tooltip);
    }

    // 5-2-6. 포인트 클릭 시, 좌표 수정 및 table 업데이트
    $('.point').on('click', function() {
      const clickedIndex = $(this).data('index');
      const points = $('.point');
      
      points.each(function(i) {
        const newIndex = (i - clickedIndex + numPoints) % numPoints;
        const angle = (2 * Math.PI / numPoints) * newIndex;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        $(this).css({
          left: (x - 10) + 'px',
          top: (y - 10) + 'px'
        });
      });

      activeInfoTable(clickedIndex)
    });
  } //drawPointsOnCircle
  drawPointsOnCircle(actionCategory.length);

  // 4-3. Click 이벤트에 따른 카테고리 정보 활성화
  const activeInfoTable = index => {
    const data = actionCategory[index];
    const attackType = data[0];
    let attackData;

    // 5-3-1. attackType에 따라 해당하는 데이터 매칭
    switch(attackType) {
      case '네트워크 공격':
        attackData = networkAttack;
        break;
      case 'APT 공격':
        attackData = aptAttack;
        break;
      case 'IPC 공격':
        attackData = ipcAttack;
        break;
      case '금융사 특화 공격':
        attackData = financeAttack;
        break;
      case '통신사 특화 공격':
        attackData = telecomAttack;
        break;
      default:
        attackData = [];
    }
    const $title = $('.sec4 .sec-bottom .table-wrap .title .category');
    const $sub = $('.sec4 .sec-bottom .table-wrap .sub');
    const $table = $('.sec4 .sec-bottom .table-wrap table');

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
  }
  activeInfoTable(0) // 기본값 설정
});