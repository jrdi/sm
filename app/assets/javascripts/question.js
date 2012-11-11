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
      $(".alert").html("Primero necesitas escribir una respuesta!").show().delay(5000).fadeOut();
    }
  });
});