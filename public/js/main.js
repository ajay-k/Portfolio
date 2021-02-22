$( document ).ready(function() {
  console.log( "ready!" );

  var $fade =  $(".box"); //Calling the class in HTML

$(window).scroll(function () { //Using the scroll global variable
    $fade.each(function () {

        fadeMiddle = $(this).offset().top + (0.4 *$(this).height());
        windowBottom = $(window).scrollTop() + $(window).height();

        if (fadeMiddle < windowBottom) {
          $(this).addClass("animate__animated animate__pulse animate__infinite animate__slow");
        }
    });
});

/* On Load: Trigger Scroll Once*/
$(window).scroll();

});