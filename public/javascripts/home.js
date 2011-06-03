// init variables
isNewQuestionFocus = false;

$(document).ready(function() {
  // fire functions
  if (window.location.hash.substring(1) === "new_question") {
    $('#question_title').focus();
    $('label[for="question_title"]').css("color", "rgba(157, 136, 81, 1)");
    $("#new_question").addClass("focus");
  } else {
    $('#field_description, #field_tags').delay(2000).slideUp();
  }

  $('#question_title').focus(function() {
    $('label[for="question_title"]').css("color", "rgba(157, 136, 81, 1)");
    $("#new_question").addClass("focus");
    $('#field_description, #field_tags').slideDown();
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

  $('#new_question').hover(function(){ 
      isNewQuestionFocus = true; 
  }, function(){ 
      isNewQuestionFocus = false; 
  });

  $(document).mouseup(function(){
    title = $("#question_title").val();
    desc = $("#question_description").val();
    tags = $("#question_tags").val();

    if(!isNewQuestionFocus && !title && !desc && !tags) {
      $("#new_question").removeClass("focus");
      $('#field_description, #field_tags').slideUp();
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

  $('.new-question').live("click", function() {
    if($(this).hasClass("disabled")){
      $("#question_title").focus();
      return false;
    }
  });
});