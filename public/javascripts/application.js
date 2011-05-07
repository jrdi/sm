$(document).ready(function() {
  page = {
    currentPage: 1,
    lastPage: "",
    scope: ""
  }
  Questions = [];

  $.urlParam = function(name){
    results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) { return 0; }
    return results[1] || 0;
  }

  $.getParams = function() {
    if($.urlParam('page') != 0) {
      page.currentPage = parseInt($.urlParam('page'));
    }

    if($.urlParam('questions_pages') != 0) {
      page.lastPage = $.urlParam('questions_pages');
    }

    if($.urlParam('scoped_questions') != 0) {
      page.scope = $.urlParam('scoped_questions');
    }
  }

  $.resetParams = function() {
    page.currentPage = 1;
    page.lastPage = "";
    page.scope = "";
  }

  $.resetQuestions = function() {
    Questions = [];
  }

  $.loadQuestions = function() {
    $.ajax({
      type: "GET",
      url: "home.json",
      data: {
        page: page.currentPage,
        questions_pages: page.lastPage,
        scoped_questions: page.scope
      },
      success: function(data) {
        page.lastPage = data[1];
        $.each(data[0], function(key, value) {
          Questions.push('<li class="question"><a title="Favorito" class="command-item star" href="/"><span>☆</span></a><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + value["question"].id + '">' + value["question"].answers_count + '</a><a title="Responder" class="command-item reply" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + value["question"].title + '" href="/questions/' + value["question"].id + '">' + value["question"].title + '</a></h2><p class="question-description">' + value["question"].description + '</p><div class="question-meta"><ul class="tags"><li class="tag"><a title="Seguir el tema Cocina" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Cocina" class="tag-link" href="/">Cocina</a></li><li class="tag"><a title="Seguir el tema Limpieza" class="tag-follow tag-followed" href="/"><span>+</span></a><a title="Ir al tema Limpieza" class="tag-link" href="/">Limpieza</a></li><li class="tag"><a title="Seguir el tema Dinero" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Dinero" class="tag-link" href="/">Dinero</a></li></ul><p>Por <a href="/">' + value["question"]["user"].name + '</a> ' + value["question"].created_at + '</p></div></li>');
        });
        $('#questions-list').html(Questions.join(''));
        $.resetQuestions();
      }
    });
  };

  $.loadMoreQuestions = function() {
    $.ajax({
      type: "GET",
      url: "home.json",
      data: {
        page: page.currentPage+1,
        questions_pages: page.lastPage,
        scoped_questions: page.scope
      },
      success: function(data) {
        page.lastPage = data[1];
        $.each(data[0], function(key, value) {
          Questions.push('<li class="question"><a title="Favorito" class="command-item star" href="/"><span>☆</span></a><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + value["question"].id + '">' + value["question"].answers_count + '</a><a title="Responder" class="command-item reply" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + value["question"].title + '" href="/questions/' + value["question"].id + '">' + value["question"].title + '</a></h2><p class="question-description">' + value["question"].description + '</p><div class="question-meta"><ul class="tags"><li class="tag"><a title="Seguir el tema Cocina" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Cocina" class="tag-link" href="/">Cocina</a></li><li class="tag"><a title="Seguir el tema Limpieza" class="tag-follow tag-followed" href="/"><span>+</span></a><a title="Ir al tema Limpieza" class="tag-link" href="/">Limpieza</a></li><li class="tag"><a title="Seguir el tema Dinero" class="tag-follow" href="/"><span>+</span></a><a title="Ir al tema Dinero" class="tag-link" href="/">Dinero</a></li></ul><p>Por <a href="/">' + value["question"]["user"].name + '</a> ' + value["question"].created_at + '</p></div></li>');
        });
      }
    });
  };

  $.getParams();

  $.loadMoreQuestions();

  $('#new_question textarea').blur(function() {
    description = $(this).val();
    if(description) {
      $(this).addClass("focus");
    } else {
      $(this).removeClass("focus");
    }
  });

  $('.load-more').live("click", function() {
    if(page.currentPage+1 <= page.lastPage) {
      $('#questions-list').append(Questions.join(''));
      $.resetQuestions();
      page.currentPage++;
      if(page.currentPage+1 === page.lastPage) {
        $.loadMoreQuestions();
      }
    } else {
      alert("Has llegado al final, campeon!")
    }
  });

  $('.questions-header-menu-item').live("click", function(e) {
    e.preventDefault();
    $.resetParams();
    $.resetQuestions();
    page.scope = $(this).attr('id');
    $.loadQuestions();
    $.loadMoreQuestions();
  });
});