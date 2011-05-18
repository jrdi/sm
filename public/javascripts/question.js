// init variables
Answers = [];

$(document).ready(function() {
  // init functions
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

  // fire functions
  $.loadAnswers();

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

  $('.command-item').live("click", function(e) {
    e.preventDefault();

    answerId = $(this).parent().parent().parent().attr('id');
    vote = [];
    vote["vote[votable_id]"] = answerId.replace(/answer-/, '');

    if($(this).hasClass('up')) {
      vote["vote[value]"] = 1;
    } else if($(this).hasClass('down')) {
      vote["vote[value]"] = -1;
    }

    $.each($('#' + answerId + ' form #vote_value[value="' + vote["vote[value]"] + '"]').parent().serializeArray(), function(pKey,pValue) { vote[pValue.name] = pValue.value; });

    $.ajax({
      type: "POST",
      url: "/votes.json",
      data: {
        "vote": {
          "user_id": vote["vote[user_id]"],
          "value": vote["vote[value]"],
          "votable_type": vote["vote[votable_type]"],
          "votable_id": vote["vote[votable_id]"]
        }
      },
      success: function(data) {
        if(vote["vote[value]"] === "1") {
          $('#' + answerId + ' .up').addClass('voted');
        } else if(vote["vote[value]"] === "-1") {
          $('#' + answerId + ' .down').addClass('voted');
        }
        alert('Tu voto ha sido recibido, gracias!');
      },
      statusCode: {
        422: function() {
          alert('No hemos podido recibir tu voto, seguramente ya has votado antes, lo sentimos!');
        }
      }
    });      
  });
});