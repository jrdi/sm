$(document).ready(function() {
  if(url('#') === "new_answer") {
    $('.answer_desc-js').focus();
  }

  $(".question-js").on("click", ".reply-js", function(e){
    e.preventDefault();
    $(".answer_desc-js").focus();
  });

  $(".answers_footer-js").on("click", ".new_answer-js", function(e){
    title = $(".answer_desc-js").val();

    if(!title) {
      e.preventDefault();
      window.scrollTo(0, 125);
      $('.alerts-js').append("<div class=\"alert error error-js\">Primero necesitas escribir una respuesta!</div>");
      $('.error-js').delay(5000).fadeOut();
      setTimeout( function(){
        $('.error-js').remove();
        $(".answer_desc-js").focus();
      }, 5400);
    }
  });
});