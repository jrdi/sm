// init variables
timeline = {
  currentPage: 1,
  lastPage: "",
  scope: ""
}

isLastPage = false;
isURLized = true;
Questions = [];

$(document).ready(function() {
  // init functions
  $.urlParam = function(name){
    results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!results) { return 0; }
    return results[1] || 0;
  }

  $.getParams = function() {
    if(isURLized) {
      if($.urlParam('page') != 0) {
        timeline.currentPage = parseInt($.urlParam('page'));
      }

      if($.urlParam('question_pages') != 0) {
        timeline.lastPage = $.urlParam('question_pages');
      }

      if($.urlParam('scoped_questions') != 0) {
        timeline.scope = $.urlParam('scoped_questions');
      }
    }
  }

  $.resetParams = function() {
    timeline.currentPage = 1;
    timeline.lastPage = "";
    timeline.scope = "";
    isLastPage = false;
    isURLized = false;
  }

  $.resetQuestions = function() {
    Questions = [];
  }
});