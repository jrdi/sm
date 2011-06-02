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
          if(qVal['question']['answered?']) { // answers_count -> answered
            replied = 'Esta pregunta ya ha sido respondida, pero puedes responder igualmente" class="command-item reply replied'
          } else {
            replied = 'Responder" class="command-item reply '
          }
          $.each(qVal["question"].tags, function(tKey, tVal) {
            Tags.push('<li class="tag"><!-- a title="Seguir el tema ' + tVal["name"] + '" class="tag-follow" href="/' + tVal["to_param"] + '"><span>+</span></a --><a title="Ir al tema ' + tVal["name"] + '" class="tag-link" href="/tags/' + tVal["to_param"] + '">#' + tVal["name"] + '</a></li>')
          });
          tags = Tags.join('');
          $.resetTags();
          Questions.push('<li class="question"><!-- a title="Favorito" class="command-item star" href="/"><span>☆</span></a --><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + qVal["question"].to_param + '#new_answer">' + qVal["question"].answers_count + '</a><a title="' + replied + '" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + qVal["question"].title + '" href="/questions/' + qVal["question"].to_param + '">' + qVal["question"].title + '</a></h2><p class="question-description">' + qVal["question"].description + '</p><div class="question-meta"><ul class="tags">' + tags + '</ul><p>Por <a href="/">' + qVal["question"]["user"].name + '</a> hace <abbr title="' + qVal["question"].created_at + '">' + time_ago_in_words(qVal["question"].created_at) + '</abbr></p></div></li>');
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
          if(qVal['question']['answered?']) { // answers_count -> answered
            replied = 'Esta pregunta ya ha sido respondida, pero puedes responder igualmente" class="command-item reply replied'
          } else {
            replied = 'Responder" class="command-item reply '
          }
          $.each(qVal["question"].tags, function(tKey, tVal) {
            Tags.push('<li class="tag"><!-- a title="Seguir el tema ' + tVal["name"] + '" class="tag-follow" href="/tags/' + tVal["to_param"] + '"><span>+</span></a --><a title="Ir al tema ' + tVal["name"] + '" class="tag-link" href="/tags/' + tVal["to_param"] + '">#' + tVal["name"] + '</a></li>')
          });
          tags = Tags.join('');
          Questions.push('<li class="question"><!-- a title="Favorito" class="command-item star" href="/"><span>☆</span></a --><div class="commands"><div class="replies clearfix"><a title="Ir a las respuestas" class="comments" href="/questions/' + qVal["question"].to_param + '#new_answer">' + qVal["question"].answers_count + '</a><a title="Responder" class="command-item reply ' + replied + '" href="/"><span>Responder</span></a></div></div><h2 class="question-title"><a title="Enlace permanente a ' + qVal["question"].title + '" href="/questions/' + qVal["question"].to_param + '">' + qVal["question"].title + '</a></h2><p class="question-description">' + qVal["question"].description + '</p><div class="question-meta"><ul class="tags">' + tags + '</ul><p>Por <a href="/">' + qVal["question"]["user"].name + '</a> hace <abbr title="' + qVal["question"].created_at + '">' + time_ago_in_words(qVal["question"].created_at) + '</abbr></p></div></li>');
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
  $('#field_description, #field_tags').delay(1000).slideUp();
  $('#question_title').focus(function() {
    $('label[for="question_title"]').css("color", "rgba(157, 136, 81, 1)");
    $("#new_question").addClass("focus");
    $('#field_description, #field_tags').slideDown();
  }).blur(function() {
    $('label[for="question_title"]').css("color", "rgba(204, 185, 134, 1)");
  });

  $('#question_description').focus(function() {
    $('label[for="question_description"]').css("color", "rgba(157, 136, 81, 1)");
  }).blur(function() {
    $('label[for="question_description"]').css("color", "rgba(204, 185, 134, 1)");
  });

  $('#question_tags').focus(function() {
    $('label[for="question_tags"]').css("color", "rgba(157, 136, 81, 1)");
  }).blur(function() {
    $('label[for="question_tags"]').css("color", "rgba(204, 185, 134, 1)");
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
      $('#field_description, #field_tags').slideUp();
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