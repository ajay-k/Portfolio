$( document ).ready(function() {
  console.log( "ready!" );

  var $pulse =  $(".box"); //Calling the class in HTML
  var $fadeIn =  $(".card"); 
  var $readMsgFade = $(".message-read");
  var dt = new Date(); 

  var formatedTime = fomartTimeShow(dt.getHours(), dt.getMinutes())
  var time2 = formatedTime
  console.log(time2)
  $(".message-read").append(time2);
  // console.log(hour)


 

$(window).scroll(function () { //Using the scroll global variable
    $pulse.each(function () {

        pulseMiddle = $(this).offset().top + (0.4 *$(this).height());
        windowBottom = $(window).scrollTop() + $(window).height();

        if (pulseMiddle < windowBottom) {
          $(this).addClass("animate__animated animate__pulse animate__infinite animate__slow");
        }
    });

    $fadeIn.each(function () {

      fadeMiddle = $(this).offset().top + (0.4 *$(this).height());
      windowBottom = $(window).scrollTop() + $(window).height();

      if (fadeMiddle < windowBottom) {
        $(this).addClass("animate__animated animate__fadeIn animate__slow");
      }
  });

//   $readMsgFade.each(function () {

//     readMsgFadeMiddle = $(this).offset().top + (0.4 *$(this).height());
//     windowBottom = $(window).scrollTop() + $(window).height();

//     if (readMsgFadeMiddle < windowBottom) {
//       $(this).addClass("animate__animated animate__fadeIn animate__slow");
//     }
// });
});

function fomartTimeShow(h_24, minute) {
  var h = ((h_24 + 11) % 12)+1;
  return '<b>Read</b>' + '&nbsp;' + h + ':' + (minute < 10 ? '0' + minute : minute) + (h_24 < 12 ? ' AM' : ' PM');
}

/* On Load: Trigger Scroll Once*/
$(window).scroll();

});