import { actionCategory, networkAttack, aptAttack, ipcAttack, financeAttack, telecomAttack } from '../data/actions_data.js';

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
    
    console.log('$(window).scrollTop() : ' + $(window).scrollTop());
    console.log('section3Top : ' + section3Top);

    if($(window).scrollTop() >= section3Top) {
      console.log('SCROLL 완료');
    }

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

  // chart 관련 함수
  // right 영역 활성화된 table 내용 채우기
  const activeTable = (category) => {
    const attackType = category[0];
    let attackData;

    // attackType에 따라 해당하는 데이터 매칭
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
    const $title = $('.sec4 .sec-bottom .right .info-box .title .category');
    const $sub = $('.sec4 .sec-bottom .right .info-box .sub');
    const $table = $('.sec4 .sec-bottom .right .info-box table');

    $title.text(category[0]);
    $sub.text(category[2].description);
    // 테이블 내용 초기화 및 헤더 생성
    $table.empty();
    const headerRow = `
      <tr>
        <th>index</th>
        <th>name</th>
        <th>description</th>
      </tr>
    `;
    
    // 데이터 행 생성
    const dataRows = attackData.map((item) => `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
      </tr>
    `).join('');

    // 테이블에 내용 삽입
    $table.html(headerRow + dataRows);
  }

  let activeCategoryIdx = 0;
  let categoryList = [];
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      columns: actionCategory,
      type: 'donut',
      colors: {
        '네트워크 공격': '#5F488C',
        'APT 공격': '#7760A6',
        'IPC 공격': '#8F78BF',
        '금융사 특화 공격': '#A790D8',
        '통신사 특화 공격': '#BFA8F2',
        // '네트워크 공격': 'red',
        // 'APT 공격': 'yellow',
        // 'IPC 공격': 'orange',
        // '금융사 특화 공격': 'green',
        // '통신사 특화 공격': 'blue',
      },
      labels: false,
      onclick: function (d) {
        // 현재 클릭된 인덱스를 기준으로 배열 재정렬
        const reorderedData = [...actionCategory];
        const rotateAmount = d.index;
        
        // 배열을 회전하여 클릭된 항목이 첫 번째로 오도록 재정렬
        for (let i = 0; i < rotateAmount; i++) {
          reorderedData.push(reorderedData.shift());
        }
        
        // actionCategory 배열 업데이트
        categoryList.length = 0;
        categoryList.push(...reorderedData);
        
        // 테이블 업데이트 및 차트 새로고침
        activeTable(actionCategory[rotateAmount]);
        activeCategoryIdx = rotateAmount;
        
        chart.load({
          columns: categoryList
        });
        chart.flush();
      },
      order: null, // 데이터 순서를 고정
    },
    tooltip: {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
        var name = d[0].name;
  
        // return (
        //   '<table class="c3-tooltip">' +
        //   '<tbody>' +
        //   '<tr class="c3-tooltip-name--' + name + '">' +
        //   '<td class="name">' +
        //   '<span style="background-color:' + color(name) + '"></span>' +
        //   name +
        //   '</td>' +
        //   '</tr>' +
        //   '</tbody>' +
        //   '</table>'
        // );
        return;
      },
    },
    donut: {
      width: 30,
      label: {
        show: false,
      },
      title: null,
    },
    legend: {
      show: false,
    },
    padding: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    },
    size: {
      height: 550,
      width: 550,
    },
    onrendered: function () {
      d3.selectAll('.c3-chart-arcs g').attr('transform', function(d,i) {
        console.log(d);
        return `rotate(27)`;
      });

      // 기본 마우스 이벤트 제거
      d3.selectAll('.c3-chart-arc path')
        .on('mouseover', null)
        .on('mouseout', null);
        
      // 강조 스타일 적용
      d3.selectAll('.c3-chart-arc path')
        .style('opacity', function (d, i) {
          return i === activeCategoryIdx ? 1 : 0.3;
        })
    },
  });
  

  // 버튼 클릭 이벤트
  $('.sec4 .tab .top button').on('click', function() {
    $(this).addClass('active').siblings('button').removeClass('active');
    const value = $(this).data('value');
    const roundedValue = Math.round(value / 100) * 100;
    $('.sec4 .tab .bottom').text('약 ' + roundedValue.toLocaleString() + '개');
  });

  // 초기값 설정
  const initialValue = $('.sec4 .tab .top button.active').data('value');
  const roundedInitialValue = Math.round(initialValue / 100) * 100;
  $('.sec4 .tab .bottom').text('약 ' + roundedInitialValue.toLocaleString() + '개');


  // =========================== section5 ===========================
  // 5-1. 숫자 애니메이션
  $('.sec5 .sec-bottom .left .box b[data-value]').each(function() {
    var $this = $(this);
    var targetValue = parseInt($this.attr('data-value')); // data-value 속성값
    var duration = 1500; // 애니메이션 시간 (밀리초 단위)
    
    // 0에서 목표값까지 증가시키는 애니메이션
    $({ count: 0 }).animate({ count: targetValue }, {
      duration: duration,
      step: function() {
        // 매 스텝마다 숫자 포맷을 적용하여 업데이트
        var roundedValue = Math.round(this.count / 100) * 100; // 100 단위로 반올림
        $this.text(formatNumber(roundedValue)); // 쉼표 구분자 적용
      },
      complete: function() {
        // 애니메이션 완료 후 최종 값 설정 (100 단위 반올림 및 쉼표 구분자 적용)
        var finalValue = Math.round(targetValue / 100) * 100;
        $this.text(formatNumber(finalValue));
      }
    });
  });
  
  // 숫자 포맷 함수 (세자리마다 쉼표 추가)
  function formatNumber(num) {
    return num.toLocaleString(); // 자바스크립트 내장 함수로 숫자를 세자리마다 쉼표 추가하여 반환
  }

  // 5-2. 포인트 클릭 이벤트
  const activeInfoTable = (index) => {
    const data = actionCategory[index];
    const attackType = data[0];
    let attackData;

    // attackType에 따라 해당하는 데이터 매칭
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
    const $title = $('.sec5 .sec-bottom .right .title .category');
    const $sub = $('.sec5 .sec-bottom .right .sub');
    const $table = $('.sec5 .sec-bottom .right table');

    $title.text(data[0]);
    $sub.text(data[2].description);
    $table.empty();

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

  $('.sec5 .sec-bottom .middle .circle .point').on('click', function() {
    $(this).addClass('active').siblings('.point').removeClass('active');

    const index = $(this).data('index');
    activeInfoTable(index);
  });




  // =========================== section6 ===========================
  function drawPointsOnCircle(numPoints) {
    const $circle = $('.sec6 .wrap .circle');
    const radius = $circle.width() / 2;
    const centerX = $circle.position().left + radius;
    const centerY = $circle.position().top + radius;

    for (let i = 0; i < numPoints; i++) {
      const angle = (2 * Math.PI / numPoints) * i;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      $('<div class="point"></div>').css({
        position: 'absolute',
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        boxSizing: 'border-box',
        borderRadius: '50%',
        left: x + 'px',
        top: y + 'px'
      }).appendTo('.sec6 .wrap');
    }
  }
  drawPointsOnCircle(actionCategory.length);
});