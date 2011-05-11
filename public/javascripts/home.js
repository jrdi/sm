// init variables
isNewQuestionFocus = false;
Questions = [];

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
        $.each(data[0], function(key, value) {
          Questions.push('<li class="question"><a title="Favorito" class="command-item star" href="/"><span>☆</span></a><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + value["question"].id + '">' + value["question"].answers_count + '</a><a title="Responder" class="command-item reply" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + value["question"].title + '" href="/questions/' + value["question"].id + '">' + value["question"].title + '</a></h2><p class="question-description">' + value["question"].description + '</p><div class="question-meta"><ul class="tags"><li class="tag"><a title="Seguir el tema Cocina" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Cocina" class="tag-link" href="/">Cocina</a></li><li class="tag"><a title="Seguir el tema Limpieza" class="tag-follow tag-followed" href="/"><span>+</span></a><a title="Ir al tema Limpieza" class="tag-link" href="/">Limpieza</a></li><li class="tag"><a title="Seguir el tema Dinero" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Dinero" class="tag-link" href="/">Dinero</a></li></ul><p>Por <a href="/">' + value["question"]["user"].name + '</a> ' + value["question"].created_at + '</p></div></li>');
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
        $.each(data[0], function(key, value) {
          Questions.push('<li class="question"><a title="Favorito" class="command-item star" href="/"><span>☆</span></a><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + value["question"].id + '">' + value["question"].answers_count + '</a><a title="Responder" class="command-item reply" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + value["question"].title + '" href="/questions/' + value["question"].id + '">' + value["question"].title + '</a></h2><p class="question-description">' + value["question"].description + '</p><div class="question-meta"><ul class="tags"><li class="tag"><a title="Seguir el tema Cocina" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Cocina" class="tag-link" href="/">Cocina</a></li><li class="tag"><a title="Seguir el tema Limpieza" class="tag-follow tag-followed" href="/"><span>+</span></a><a title="Ir al tema Limpieza" class="tag-link" href="/">Limpieza</a></li><li class="tag"><a title="Seguir el tema Dinero" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Dinero" class="tag-link" href="/">Dinero</a></li></ul><p>Por <a href="/">' + value["question"]["user"].name + '</a> ' + value["question"].created_at + '</p></div></li>');
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
    $.resetParams();
    timeline.scope = $(this).attr('id');
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

  $('#questions-footer .new-question').live("click", function() {
    $("#question_title").focus();
    return false;
  });
});