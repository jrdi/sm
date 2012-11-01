// init variables
isNewQuestionFocus = false;

$(document).ready(function() {
  // fire functions
  if((window.location.hash.substring(1) === "new_question")) {
    $('#question_title').focus();
    $('label[for="question_title"]').css("color", "rgba(157, 136, 81, 1)");
    $("#new_question").addClass("focus");
  } else if($("#question_title").is(":focus")) {
    return true;
  } else {
    setTimeout( function(){
      if(!isNewQuestionFocus) {
        $("#new_question").removeClass("focus");
        $('.field_description-js, .field_tags-js, .questions_footer-js').slideUp();
        setTimeout( function(){
          cssTransform = {
            "-webkit-border-radius" : "7px",
            "-moz-border-radius" : "7px",
            "border-radius" : "7px"
          }

          $('#field_title, #new_question fieldset').css(cssTransform);
        }, 400);
      }
    }, 2000);
  }

  $('#question_title').focus(function() {
    cssTransform = {
      "-webkit-border-radius" : "7px 7px 0 0",
      "-moz-border-radius" : "7px 7px 0 0",
      "border-radius" : "7px 7px 0 0"
    }

    $('#field_title, #new_question fieldset').css(cssTransform);
    $('label[for="question_title"]').css("color", "rgba(157, 136, 81, 1)");
    $('.field_description-js, .field_tags-js, .questions_footer-js').slideDown();
  }).blur(function() {
    $('label[for="question_title"]').css("color", "rgba(204, 185, 134, 1)");
  });    

  $('#question_description').focus(function() {
    $('label[for="question_description"]').css("color", "rgba(157, 136, 81, 1)");
  }).blur(function() {
    $('label[for="question_description"]').css("color", "rgba(204, 185, 134, 1)");
  });

  $('#question_tags').focus(function() {
    $('label[for="question_tags"]').css("color", "rgba(157, 136, 81, 1)");
  }).blur(function() {
    $('label[for="question_tags"]').css("color", "rgba(204, 185, 134, 1)");
  });

  $('#new_question, .new-question').hover(function() { 
      isNewQuestionFocus = true; 
  }, function(){ 
      isNewQuestionFocus = false; 
  });

  $(document).mouseup(function() {
    title = $("#question_title").val();
    desc = $("#question_description").val();
    tags = $("#question_tags").val();

    if(!isNewQuestionFocus && !title && !desc && !tags) {
      $("#new_question").removeClass("focus");
      $('.field_description-js, .field_tags-js, .questions_footer-js').slideUp();
      setTimeout( function(){
        cssTransform = {
          "-webkit-border-radius" : "7px",
          "-moz-border-radius" : "7px",
          "border-radius" : "7px"
        }

        $('#field_title, #new_question fieldset').css(cssTransform);
      }, 400);
    }
  });

  $('.publish-question').live("click", function(e) {
    title = $("#question_title").val();

    if(!title) {
      e.preventDefault();
      $(".alert").html("Primero necesitas escribir una pregunta!").show().delay(5000).fadeOut();
    }
  });

  $('.questions-header-menu-item').live("click", function(e) {
    e.preventDefault();
    clickedItem = $(this);
    selectedItem = $("#questions-header-menu").find(".selected a");

    if (clickedItem != selectedItem){
      $(selectedItem).parent().removeClass('selected');
      $(clickedItem).parent().addClass('selected');
    }
  });

  $('.new-question.disabled').live("click", function() {
    $("#question_title").focus();
    return false;
  });
});