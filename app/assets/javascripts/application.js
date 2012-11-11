//= require js-url.min
//= require modernizr
//= require jquery
//= require jquery_ujs
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

  $('.questions_header-js a[data-remote=true], .answers_header-js a[data-remote=true]').live('ajax:success', function(e){ window.history.pushState('', '', $(e.target).attr('href')) })
  $(window).bind('popstate', function(){ $.ajax({url:window.location, dataType:'script'}) ; return true });
});