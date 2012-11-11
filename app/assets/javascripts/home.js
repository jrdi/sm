isNewQuestionFocus = false;

collapseAskContent = function() {
  $('.field_description-js, .field_tags-js, .ask_footer-js').slideUp();

  setTimeout( function(){
    $('.ask_content').addClass('collapsed');
  }, 400);
}

expandAskContent = function() {
  $('.ask_content').removeClass('collapsed');
  $('.field_description-js, .field_tags-js, .ask_footer-js').slideDown();
}

$(document).ready(function() {
  $('.ask-js').hover(function() {
    isNewQuestionFocus = true;
  }, function(){
    isNewQuestionFocus = false;
  });

  if(url('#') === "new_question") {
    $('.question_title-js').focus();
  } else {
    setTimeout( function(){
      if(!isNewQuestionFocus) {
        collapseAskContent();
      }
    }, 2000);
  }

  $('.question_title-js').focus(function() {
    $(this).parent().addClass("focus");
    expandAskContent();
  }).blur(function() {
    $(this).parent().removeClass("focus");
  });

  $('.question_desc-js').focus(function() {
    $(this).parent().addClass("focus");
  }).blur(function() {
    $(this).parent().removeClass("focus");
  });

  $('.question_tags-js').focus(function() {
    $(this).parent().addClass("focus");
  }).blur(function() {
    $(this).parent().removeClass("focus");
  });

  $(document).mouseup(function() {
    title = $('.question_title-js').val();
    desc = $('.question_desc-js').val();
    tags = $('.question_tags-js').val();

    if(!isNewQuestionFocus && !title && !desc && !tags && !$('.ask_content-js').is('.collapsed')) {
      collapseAskContent();
    }
  });

  $(".ask_footer-js").on("click", ".new_question-js", function(e){
    title = $(".question_title-js").val();

    if(!title) {
      e.preventDefault();
      $(".alert").html("Primero necesitas escribir una pregunta!").show().delay(5000).fadeOut();
    }
  });

  $(".questions_footer-js, .questions_header-js").on("click", ".new_question-js", function(e){
    e.preventDefault();
    $(".question_title-js").focus();
  });
});