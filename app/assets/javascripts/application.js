//= require modernizr
//= require jquery
//= require jquery_ujs
//= require js-url.min
//= require jquery.qtip.min
//= require_tree .

$(document).ready(function() {
  if($(".alert").text() != "") {
    $(".alert").show().delay(5000).fadeOut();
  }

  if($(".notice").text() != "" ) {
    $(".notice").show().delay(5000).fadeOut();
  }

  $('.navbar-js').on('click', '.dropdown_link-js', function(e) {
    e.preventDefault();
  });

  $('.dropdown_link-js').qtip({
    overwrite: false,
    content: {
      text: $('.navbar_dropdown')
    },
    position: {
      my: 'top right',
      at: 'bottom right',
      adjust: { x: -8, y: +5 }
    },
    show: {
      event: 'click',
      effect: function() { $(this).show().css('opacity', '0').animate({ opacity: 1, "top": "-=10px" }, { duration: 200 }); }
    },
    hide: {
      event: 'unfocus click',
      effect: function() { $(this).animate({ opacity: 0, "top": "+=10px" }, { duration: 200 }); }
    },
    style: {
      classes: 'ui-tooltip-dropdown',
      tip: { width: 18, height: 10, corner: 'top right',  mimic: 'center', offset: 5 }
    }
  });

  $('.questions_header-js, .answers_header-js').on("click", ".tab-js", function(e){
    clickedItem = $(this);
    selectedItem = $(this).closest('.menu').find(".selected");

    if (!$(this).is(".selected")){
      $(selectedItem).removeClass('selected');
      $(clickedItem).addClass('selected');
    }
  });

  $('.questions_header-js a[data-remote=true], .answers_header-js a[data-remote=true]').live('ajax:success', function(e){ window.history.pushState('', '', $(e.target).attr('href')) })
  $(window).bind('popstate', function(){ $.ajax({url:window.location, dataType:'script'}) ; return true });
});