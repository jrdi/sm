$(document).ready(function() {
  // fire functions
  $('#question .reply').live("click", function() {
    $("#answer_content").focus();
    return false;
  });
});