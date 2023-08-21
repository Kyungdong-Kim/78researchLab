$(document).ready(function () {
  // reload
  history.scrollRestoration = "manual"
  $('header .logo').click(function(){
    location.href = 'https://www.78researchlab.com/';
  });

  // 0. changeLang
  $('header .menu-wrap .menu.lang, header .menuBtn ul li.lang').click(function(){
    let ww = $(window).width();
    if($(this).text() === 'En'){
      if(ww <= 1200){
        $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').hide();
        $('.sec1 .sec-bottom .ko.img-ko').show();
        $('.sec1 .sec-bottom .en.img-en').hide();
      } else {
        $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').show();
        $('.sec1 .sec-bottom .ko.img-ko').hide();
        $('.sec1 .sec-bottom .en.img-en').hide();
      }
    } else {
      if(ww <= 1200){
        $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').hide();
        $('.sec1 .sec-bottom .ko.img-ko').hide();
        $('.sec1 .sec-bottom .en.img-en').show();
      } else {
        $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').show();
        $('.sec1 .sec-bottom .ko.img-ko').hide();
        $('.sec1 .sec-bottom .en.img-en').hide();
      }
    }
  })

  // 1. tab
  $('.sec2 .sec-bottom .tab-btn input[type="radio"]').change(function () {
    if ($('#offensive').is(':checked')) {
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab2').removeClass('active');
      $('.sec2 .sec-bottom .tab-wrap .tab#tab1').addClass('active');
    }
    if ($('#customized').is(':checked')) {
      $('.sec2 .sec-bottom .tab-wrap .tab.active#tab1').removeClass('active');
      $('.sec2 .sec-bottom .tab-wrap .tab#tab2').addClass('active');
    }
  });

  // 2. section3 cardBax
  $('.sec3 .cardBox .card').click(function () {
    $('.sec3 .cardBox .card').removeClass('active');
    $(this).addClass('active');
  });
  // 2-1. Toggle active class every 3 seconds
  let auto = setInterval(function () {
    $('.sec3 .cardBox .card').each(function (index) {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        var nextIndex = (index + 1) % $('.sec3 .cardBox .card').length;
        $('.sec3 .cardBox .card').eq(nextIndex).addClass('active');
        return false;
      }
    });
  }, 3000);

  // 2-2. Stop Autoplay
  $('.sec3 .cardBox').mouseenter(function () {
    clearInterval(auto);
  });
  // 2-3. Start AutoPlay
  $('.sec3 .cardBox').mouseleave(function () {
    auto = setInterval(function () {
      $('.sec3 .cardBox .card').each(function (index) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
          var nextIndex = (index + 1) % $('.sec3 .cardBox .card').length;
          $('.sec3 .cardBox .card').eq(nextIndex).addClass('active');
          return false;
        }
      });
    }, 3000);
  });

  // 3. section4 GUI button
  $('.sec4 .sec-bottom .buttonBox input[type="radio"]').change(function () {
    if ($('#dashboard').is(':checked')) {
      $('.sec4 .sec-bottom .imgBox .img').removeClass('active');
      $('.sec4 .sec-bottom .buttonBox label').removeClass('active');
      $('.sec4 .sec-bottom .imgBox .img#img1').addClass('active');
      $('.sec4 .sec-bottom .buttonBox label[for="dashboard"]').addClass("active");
      if(localStorage.getItem('lang') === 'Ko'){
        $('.sec4 .sec-bottom .btnInfo').html($(this).attr('ko'))
      } else {
        $('.sec4 .sec-bottom .btnInfo').html($(this).attr('en'))
      }
    }
    if ($('#scenario').is(':checked')) {
      $('.sec4 .sec-bottom .imgBox .img').removeClass('active');
      $('.sec4 .sec-bottom .buttonBox label').removeClass('active');
      $('.sec4 .sec-bottom .imgBox .img#img2').addClass('active');
      $('.sec4 .sec-bottom .buttonBox label[for="scenario"]').addClass("active");
      if(localStorage.getItem('lang') === 'Ko'){
        $('.sec4 .sec-bottom .btnInfo').html($(this).attr('ko'))
      } else {
        $('.sec4 .sec-bottom .btnInfo').html($(this).attr('en'))
      }
    }
    if ($('#history').is(':checked')) {
      $('.sec4 .sec-bottom .imgBox .img').removeClass('active');
      $('.sec4 .sec-bottom .buttonBox label').removeClass('active');
      $('.sec4 .sec-bottom .imgBox .img#img3').addClass('active');
      $('.sec4 .sec-bottom .buttonBox label[for="history"]').addClass("active");
      if(localStorage.getItem('lang') === 'Ko'){
        $('.sec4 .sec-bottom .btnInfo').html($(this).attr('ko'))
      } else {
        $('.sec4 .sec-bottom .btnInfo').html($(this).attr('en'))
      }
    }
  });

  // table
  let ww = $(window).width();
  let lang = localStorage.getItem('lang');
  $(window).on('load', function () {
    if(ww <= 1200){
      $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').hide();
      if(lang === 'Ko'){
        $('.sec1 .sec-bottom .ko.img-ko').show();
        $('.sec1 .sec-bottom .en.img-en').hide();
      } else {
        $('.sec1 .sec-bottom .ko.img-ko').hide();
        $('.sec1 .sec-bottom .en.img-en').show();
      }
    } else {
      $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').show();
      $('.sec1 .sec-bottom img.ko, .sec1 .sec-bottom img.en').hide();
    }
  });
  $(window).resize(function(){
    if(ww <= 1200){
      $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').hide();
      if(lang === 'Ko'){
        $('.sec1 .sec-bottom .ko.img-ko').show();
        $('.sec1 .sec-bottom .en.img-en').hide();
      } else {
        $('.sec1 .sec-bottom .ko.img-ko').hide();
        $('.sec1 .sec-bottom .en.img-en').show();
      }
    } else {
      $('.sec1 .sec-bottom p, .sec1 .sec-bottom table').show();
      $('.sec1 .sec-bottom .ko.img-ko, .sec1 .sec-bottom .en.img-en').hide();
    }
  })
});