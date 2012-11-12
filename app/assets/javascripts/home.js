isAskFocus = false;

collapseAsk = function() {
  $('.question_desc_field-js, .question_tags_field-js, .ask_footer-js').slideUp();

  setTimeout( function(){
    $('.ask_content').addClass('collapsed');
  }, 400);
}

expandAsk = function() {
  $('.ask_content-js').removeClass('collapsed');
  $('.question_desc_field-js, .question_tags_field-js, .ask_footer-js').slideDown();
}

$(document).ready(function() {
  $('body').on('mouseenter', '.ask-js, .new_question-js',  function(){
    isAskFocus = true;
  }).on('mouseleave', '.ask-js, .new_question-js', function() {
    isAskFocus = false;
  });

  if(url('#') === "new_question") {
    $('.question_title-js').focus();
  } else {
    setTimeout( function(){
      if(!isAskFocus) {
        collapseAsk();
      }
    }, 2000);
  }

  $('body').on('mouseup', ':not(.ask-js, .new_question-js)', function(){
    title = $('.question_title-js').val();
    desc = $('.question_desc-js').val();
    tags = $('.question_tags-js').val();

    if(!isAskFocus && !title && !desc && !tags) {
      collapseAsk();
    }
  });

  $('.question_title-js').focus(function() {
    $(this).parent().addClass("focus");
    expandAsk();
  }).blur(function() {
    $(this).parent().removeClass("focus");
  });

  $('.desc-js').focus(function() {
    $(this).parent().addClass("focus");
  }).blur(function() {
    $(this).parent().removeClass("focus");
  });

  $('.question_tags-js').focus(function() {
    $(this).parent().addClass("focus");
  }).blur(function() {
    $(this).parent().removeClass("focus");
  });

  $(".ask_footer-js").on("click", ".publish_question-js", function(e){
    title = $(".question_title-js").val();

    if(!title) {
      e.preventDefault();
      $(".alert").html("Primero necesitas escribir una pregunta!").show().delay(5000).fadeOut();
    }
  });

  $(".questions_footer-js, .content_header-js").on("click", ".new_question-js", function(e){
    e.preventDefault();
    if ($('.ask_content-js').is('.collapsed'))
      expandAsk();
    $(".question_title-js").focus();
  });
});