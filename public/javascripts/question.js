$(document).ready(function() {
  // fire functions
  $('#question .reply').live("click", function() {
    $("#answer_content").focus();
    return false;
  });

  $('.command-item').live("click", function(e) {
    e.preventDefault();
    if($(this).parent().hasClass('votes')) {
      $(this).addClass('voted');
    }
  });
});