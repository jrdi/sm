//= require modernizr
//= require jquery
//= require jquery_ujs
//= require js-url.min
//= require jquery.qtip.min
//= require spin.min
//= require_tree .

$(document).ready(function() {
  // spinner
  $.fn.spin = function(opts) {
    this.each(function() {
      var $this = $(this),
          data = $this.data();

      if (data.spinner) {
        data.spinner.stop();
        delete data.spinner;
      }
      if (opts !== false) {
        data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
      }
    });
    return this;
  };

  // alerts
  if($(".alert").text() != "") {
    $(".alert").show().delay(5000).fadeOut();
  }

  if($(".notice").text() != "" ) {
    $(".notice").show().delay(5000).fadeOut();
  }

  // dropdowns
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
      effect: function() {
        $('.dropdown_link-js').addClass('selected');
        $(this).show().css('opacity', '0').animate({ opacity: 1, "top": "-=5px" }, { duration: 200 });
      }
    },
    hide: {
      event: 'unfocus click',
      effect: function() {
        $(this).animate({ opacity: 0, "top": "+=5px" }, { duration: 200 });
        $('.dropdown_link-js').removeClass('selected');
      }
    },
    style: {
      classes: 'ui-tooltip-dropdown',
      tip: { width: 18, height: 10, corner: 'top right',  mimic: 'center', offset: 5 }
    }
  });

  $('.content_header-js').on("click", ".tab-js", function(e){
    clickedItem = $(this);
    selectedItem = $(this).closest('.menu').find(".selected");

    if (!$(this).is(".selected")){
      $(selectedItem).removeClass('selected');
      $(clickedItem).addClass('selected');
    }
  });

  $('.questions_header-js').on("click", ".tab-js", function(e){
    $('.questions-js').html('').spin();
  });

  $('.answers_header-js').on("click", ".tab-js", function(e){
    $('.answers-js').html('').spin();
  });
});