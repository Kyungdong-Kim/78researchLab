$(document).ready(function () {
  // reload
  history.scrollRestoration = "manual"
  $('header .logo').click(function(){
    location.href = 'https://www.78researchlab.com/';
  });

  // email modal
  $('.sec3 .intro-txt').click(function(){
    $('.sec4').addClass('active');
  });
  $('.sec4 .input-wrap .closeBtn').click(function(){
    $('.sec4').removeClass('active');
    $('#name').val('');
    $('#email').val('');
    !$('#belongTo').val('');
    $('#position').val('');
    $('#name, #email, #belongTo, #position').css({borderBottom : '2px solid rgba(0,0,0,0.3)'})
  });

  // ===== email
  $('#submit').click(function () {
    if (!$('#name').val() || !$('#email').val() || !$('#belongTo').val() || !$('#position').val()) {
      alert('Check Again')
      if(!$('#name').val()){
        $('#name').css({borderBottom : '2px solid #a91111a8'})
      } else {
        $('#name').css({borderBottom : '2px solid rgba(0,0,0,0.3)'})
      }
      if(!$('#email').val()){
        $('#email').css({borderBottom : '2px solid #a91111a8'})
      } else {
        $('#email').css({borderBottom : '2px solid rgba(0,0,0,0.3)'})
      }
      if(!$('#belongTo').val()){
        $('#belongTo').css({borderBottom : '2px solid #a91111a8'})
      } else {
        $('#belongTo').css({borderBottom : '2px solid rgba(0,0,0,0.3)'})
      }
      if(!$('#position').val()){
        $('#position').css({borderBottom : '2px solid #a91111a8'})
      } else {
        $('#position').css({borderBottom : '2px solid rgba(0,0,0,0.3)'})
      }
    } else {
      var templateParams = {
        //각 요소는 emailJS에서 설정한 템플릿과 동일한 명으로 작성
        name: $('#name').val(),
        email: $('#email').val(),
        belongTo: $('#belongTo').val(),
        position: $('#position').val()
      };

      // emailjs.send('service_id', 'template_id', 보낼내용이 담긴 객체, 'API Public Key')
      emailjs.send('service_vi1cifh', 'template_z7ne1j7', templateParams, 'tdb7tpSvPwnlfmihQ')
        .then(function () {
          let message = (localStorage.getItem('lang') === 'Ko') ? '요청이 완료되었습니다. 이메일을 확인해보세요.' : 'Your request is complete. Check your email.';
          alert(message)
          window.location.reload();
        }, function (error) {
          console.log(error);
          let message = (localStorage.getItem('lang') === 'Ko') ? '정상적인 요청이 이루어지지 않았습니다. 다시 시도해주세요.' : 'A legitimate request was not made. please try again.';
          alert(message)
        });
    }
  });

  // zoom patent
  $('.patent').mouseenter(function() {
    $(this).css('cursor', 'zoom-in');
  }).mouseleave(function() {
    $(this).css('cursor', 'default'); 
  }).click(function() {
    $('.sec2 article .bottom-wrap .patent-zoom').addClass('active');
  });
  $('.sec2 article .bottom-wrap .patent-zoom').click(function(){
    $(this).removeClass('active');
  });

  // scroll
  const sec1 = $('.sec1').offset().top;
  $(window).scroll(function () {
    let sct = $(window).scrollTop();
    // 1-2-1. Header
    if (sct < (sec1 - 50)) {
      $('header').removeClass('active');
    } else {
      $('header').addClass('active');
    }
  });
});