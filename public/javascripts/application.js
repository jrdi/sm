$(document).ready(function() {
  page = {
    currentPage: 1,
    lastPage: ""
  }
  scope=""
  moreItems = [];

  $.urlParam = function(name){
    results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) { return 0; }
    return results[1] || 0;
  }

  if($.urlParam('page') != 0) {
    page.currentPage = $.urlParam('page');
  }

  if($.urlParam('questions_pages') != 0) {
    page.lastPage = $.urlParam('questions_pages');
  }

  if($.urlParam('scoped_questions') != 0) {
    scope = $.urlParam('scoped_questions');
  }

  $.getQuestions = function() {
    $.ajax({
      type: "GET",
      url: "home.json",
      data: {
        page: page.currentPage+1,
        questions_pages: page.lastPage,
        scoped_questions: scope
      },
      success: function(data) {
        if(page.currentPage === data[1]) {
          $('.load-more').addClass("disabled");
        } else {
          $.each(data[0], function(key, value) {
            moreItems.push('<li class="question"><a title="Fav" class="command-item star" href="/"><span>☆</span></a><div class="commands"><div class="replies clearfix"><a title="Ve a las respuestas" class="comments" href="/questions/' + value["question"].id + '">' + value["question"].answers_count + '</a><a title="Responder" class="command-item reply" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + value["question"].title + '" href="/questions/' + value["question"].id + '">' + value["question"].title + '</a></h2><p class="question-description">' + value["question"].description + '</p><div class="question-meta"><ul class="tags"><li class="tag"><a title="Sigue el tema Cocina" class="tag-follow" href="/"><span>+</span></a><a title="Ve al tema Cocina" class="tag-link" href="/">Cocina</a></li><li class="tag"><a title="Sigue el tema Limpieza" class="tag-follow tag-followed" href="/"><span>+</span></a><a title="Ve al tema Limpieza" class="tag-link" href="/">Limpieza</a></li><li class="tag"><a title="Sigue el tema Dinero" class="tag-follow" href="/"><span>+</span></a><a title="Ve al tema Dinero" class="tag-link" href="/">Dinero</a></li></ul><p>Por <a href="/">' + value["question"]["user"].name + '</a> ' + value["question"].created_at + '</p></div></li>');
          });
        }
      }
    });
  };

  $.getQuestions();

  $('.load-more').live("click", function() {
    page.currentPage++;
    $('#questions-list').append(moreItems.join(''));
    $.getQuestions();
  });
});