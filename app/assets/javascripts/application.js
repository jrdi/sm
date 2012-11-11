//= require js-url.min
//= require modernizr
//= require jquery
//= require jquery_ujs
//= require jquery.pjax
//= require_tree .

$(document).ready(function() {
  if($(".alert").text() != "") {
    $(".alert").show().delay(5000).fadeOut();
  }

  if($(".notice").text() != "" ) {
    $(".notice").show().delay(5000).fadeOut();
  }

  $('.questions_header-js, .answers_header-js').on("click", ".tab-js", function(e){
    clickedItem = $(this);
    selectedItem = $(this).parent().parent().find(".selected");

    if (!$(this).is(".selected")){
      $(selectedItem).removeClass('selected');
      $(clickedItem).addClass('selected');
    }
  });
});