$(document).ready(function () {
  // 1. animate txtBox
  $(window).on('load', function () {
    $('.banner .txtBox').css({
      transform: 'translateX(0)'
    });
  });
  
// 2. tab
$(".btn li").click(function (event) {
  event.preventDefault(); 
  if($(this).index() !== 2){
    document.getElementById("tab3").style.display = "none";
  }
  var tabIndex = $(this).index() + 1;
  var url = 'AboutUs.html?tab=' + tabIndex;
  $(".btn li").removeClass("active");
  $(this).addClass("active");
  history.pushState(null, null, url);
  var tabText = $(this).text();
  $(".banner .title").text(tabText);
  $(".tab").removeClass("active");
  $("#tab" + tabIndex).addClass("active");

  // Handling contact tabs when loaded
  if (tabIndex === 3) {
    showTab3();
  }
});

// Set the active tab based on the tab index value in the URL
var urlParams = new URLSearchParams(window.location.search);
var tabIndex = urlParams.get('tab');
if (tabIndex) {
  $(".btn li").removeClass("active");
  $(".btn li:nth-child(" + tabIndex + ")").addClass("active");

  var tabText = $(".btn li:nth-child(" + tabIndex + ")").text();
  $(".banner .title").text(tabText);

  $(".tab").removeClass("active");
  $("#tab" + tabIndex).addClass("active");

  // 로드될 때 contact 탭 처리
  if (tabIndex === "3") {
    showTab3();
  }
}

// Function to be executed when contact tab is clicked
function showTab3() {
  // #tab3의 display를 block으로 변경
  document.getElementById("tab3").style.display = "block";

  // map.relayout()
  setTimeout(function(){
    map.setCenter(37.5021, 127.0245);
    map.relayout(); 
  }, 0);
}


  // 3. location
  $(".boxWrap .box .locate input[type='radio']").change(function () {
    if($('#wework').is(':checked')){
      $('#tab3 .wework').show();
      $('#tab3 .magok').hide();
    }
    if($('#magok').is(':checked')){
      $('#tab3 .wework').hide();
      $('#tab3 .magok').show();
    };
  })
});
