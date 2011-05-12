// init variables
isNewQuestionFocus = false;
Questions = [];
Tags = []

$(document).ready(function() {
  // init functions
  $.loadQuestions = function() {
    $.ajax({
      type: "GET",
      url: "home.json",
      data: {
        page: timeline.currentPage,
        question_pages: timeline.lastPage,
        scoped_questions: timeline.scope
      },
      success: function(data) {
        timeline.lastPage = data[1];
        $.each(data[0], function(qKey, qVal) {
          if(qVal["question"].answers_count > 0) { // answers_count -> answered
            replied = "replied"
          } else {
            replied = ""
          }
          $.each(qVal["question"].tags, function(tKey, tVal) {
            Tags.push('<li class="tag"><!-- a title="Seguir el tema ' + tVal["name"] + '" class="tag-follow" href="/' + tVal["id"] + '"><span>+</span></a --><a title="Ir al tema ' + tVal["name"] + '" class="tag-link" href="/' + tVal["id"] + '">#' + tVal["name"] + '</a></li>')
          });
          tags = Tags.join('');
          $.resetTags();
          Questions.push('<li class="question"><!-- a title="Favorito" class="command-item star" href="/"><span>☆</span></a --><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + qVal["question"].id + '">' + qVal["question"].answers_count + '</a><a title="Responder" class="command-item reply ' + replied + '" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + qVal["question"].title + '" href="/questions/' + qVal["question"].id + '">' + qVal["question"].title + '</a></h2><p class="question-description">' + qVal["question"].description + '</p><div class="question-meta"><ul class="tags">' + tags + '</ul><p>Por <a href="/">' + qVal["question"]["user"].name + '</a> ' + qVal["question"].created_at + '</p></div></li>');
        });
        $('#questions-list').html(Questions.join(''));
        $.resetQuestions();
        if (timeline.currentPage === timeline.lastPage) {
          isLastPage = true;
        }
      }
    });
  };

  $.loadMoreQuestions = function() {
    $.ajax({
      type: "GET",
      url: "home.json",
      data: {
        page: timeline.currentPage+1,
        question_pages: timeline.lastPage,
        scoped_questions: timeline.scope
      },
      success: function(data) {
        timeline.lastPage = data[1];
        $.each(data[0], function(qKey, qVal) {
          if(qVal["question"].answers_count > 0) { // answers_count -> answered
            replied = "replied"
          } else {
            replied = ""
          }
          $.each(qVal["question"].tags, function(tKey, tVal) {
            Tags.push('<li class="tag"><!-- a title="Seguir el tema ' + tVal["name"] + '" class="tag-follow" href="/' + tVal["id"] + '"><span>+</span></a --><a title="Ir al tema ' + tVal["name"] + '" class="tag-link" href="/' + tVal["id"] + '">#' + tVal["name"] + '</a></li>')
          });
          tags = Tags.join('');
          Questions.push('<li class="question"><!-- a title="Favorito" class="command-item star" href="/"><span>☆</span></a --><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + qVal["question"].id + '">' + qVal["question"].answers_count + '</a><a title="Responder" class="command-item reply ' + replied + '" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + qVal["question"].title + '" href="/questions/' + qVal["question"].id + '">' + qVal["question"].title + '</a></h2><p class="question-description">' + qVal["question"].description + '</p><div class="question-meta"><ul class="tags">' + tags + '</ul><p>Por <a href="/">' + qVal["question"]["user"].name + '</a> ' + qVal["question"].created_at + '</p></div></li>');
        });
        $('#questions-list').append(Questions.join(''));
        $.resetQuestions();
        if (timeline.currentPage+1 >= timeline.lastPage) {
          isLastPage = true;
          if (timeline.currentPage+1 > timeline.lastPage) {
            alert("Has llegado al final, campeon!");
          }
        }
        timeline.currentPage++;
      }
    });
  };

  // fire functions
  $('#question_description, #question_tags').hide();
  $('#question_title').focus(function() {
    $("#new_question").addClass("focus");
    $('#question_description, #question_tags').show();
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
      $('#question_description, #question_tags').hide();
    }
  });

  $('.questions-header-menu-item').live("click", function(e) {
    e.preventDefault();
    clickedItem = $(this);
    selectedItem = $("#questions-header-menu").find(".selected a");

    if (clickedItem != selectedItem){
      $(selectedItem).parent().removeClass('selected');
      $(clickedItem).parent().addClass('selected');
      $.resetParams();
      timeline.scope = clickedItem.attr('id');
    }
    $.loadQuestions();
  });

  $('.load-more').live("click", function() {
    $.getParams();
    if(!isLastPage) {
      $.loadMoreQuestions();
    } else {
      alert("Has llegado al final, campeon!")
    }
  });

  $('.new-question').live("click", function() {
    if($(this).hasClass("disabled")){
      $("#question_title").focus();
      return false;
    }
  });
});