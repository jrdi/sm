$(document).ready(function() {
  $('.answers-header-menu-item').live("click", function(e) {
    e.preventDefault();
    clickedItem = $(this);
    selectedItem = $(this).parent().parent().find(".selected a");

    if (clickedItem != selectedItem){
      $(selectedItem).parent().removeClass('selected');
      $(clickedItem).parent().addClass('selected');
    }
  });

  $('#question .reply').live("click", function() {
    $("#answer_content").focus();
    return false;
  });
});