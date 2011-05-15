$(document).ready(function() {
  Answers = [];

  $.loadAnswers = function() {
    $.ajax({
      type: "GET",
      dataType: 'json',
      success: function(data) {
        $.each(data["question"]["answers"], function(aKey, aVal) {
          Answers.push(aVal);
        });
      }
    });
  };
  
  votes_count = function(a,b){
    if(a.votes_count < b.votes_count) {
      return 1;
    } else if(a.votes_count == b.votes_count) {
      return a.created_at > b.created_at ? 1 : -1;  
    } else {
      return -1;
    }
  };  

  created_at = function(a,b){
    return a.created_at < b.created_at ? 1 : -1;  
  };

  $.loadAnswers();

  // fire functions
  $('.answers-header-menu-item').live("click", function(e) {
    e.preventDefault();
    clickedItem = $(this);
    selectedItem = $("#answers-header-menu").find(".selected a");

    if (clickedItem != selectedItem){
      $(selectedItem).parent().removeClass('selected');
      $(clickedItem).parent().addClass('selected');
      order = clickedItem.attr('id');
      if(order === "votes_count") {
        Answers.sort(votes_count);
      } else if(order === "created_at") {
        Answers.sort(created_at);
      }

      $("#answers-list").html("");
      $.each(Answers, function (i) {
        $("#answers-list").append('<li class="answer"><div class="commands"><div class="votes"><a href="/" class="command-item up" title="Voto positivo"><span>+</span></a><a href="/" class="command-item down" title="Voto negativo"><span>-</span></a></div></div><p class="answer-description">' + Answers[i].content + '</p><div class="answer-meta"><p>Por <a href="/">' + Answers[i].user.name + '</a> hace <abbr title="' + Answers[i].created_at + '">' + time_ago_in_words(Answers[i].created_at) + '</abbr> <a href="' + "cambiar" + '">editar</a> <a href="/questions/21-21/answers/6" data-confirm="Estás seguro?" data-method="delete" rel="nofollow">eliminar</a></p></div></li>');
      });
    }
  });


  $('#question .reply').live("click", function() {
    $("#answer_content").focus();
    return false;
  });

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